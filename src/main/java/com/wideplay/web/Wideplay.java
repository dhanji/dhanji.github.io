package com.wideplay.web;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.LongSerializationPolicy;
import com.petebevin.markdown.MarkdownProcessor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.Collection;
import java.util.Date;

/**
 * @author dhanji@gmail.com (Dhanji R. Prasanna)
 */
public class Wideplay {

  public static final int SNIPPET_LENGTH = 150;

  public static void main(String... args) throws IOException {
    // Clean output dir first.
    System.out.println("Cleaning output dir...");
    File views = new File("views");
    FileUtils.deleteDirectory(views);
    views.mkdir();

    @SuppressWarnings("unchecked")
    Collection<File> files = FileUtils.listFiles(new File("src/main/resources"),
        new String[] { "markdown" }, true);

    // Mark them down.
    MarkdownProcessor markdown = new MarkdownProcessor();
    Gson gson = new GsonBuilder()
        .setLongSerializationPolicy(LongSerializationPolicy.STRING)
        .setDateFormat("dd MMM yyyy")
        .disableHtmlEscaping()
        .create();

    Index index = new Index();
    for (File file : files) {
      String template = IOUtils.toString(new FileReader(file));

      // Outfile is...
      String fileName = file.getName();

      Page page = new Page();
      page.setId(fileName.substring(0, fileName.length() - ".markdown".length()));
      String html = markdown.markdown(template);

      // JSoup this sucka to grab metadata out of it.
      Document document = Jsoup.parse(html);

      // There should always be an h1
      Elements h1 = document.select("h1");
      Elements noindex = document.select("meta[noindex]");
      boolean shouldIndex = noindex.isEmpty();
      Preconditions.checkState(!h1.isEmpty(), file.getName() + " is missing a title (<h1> tag)");
      h1.remove();  // remove from document as it is rendered using JSON.
      noindex.remove(); // remove internal meta tags.

      page.setTitle(h1.first().text());
      page.setPostedOn(new Date(file.lastModified()));
      page.setHtml(document.select("body").html());

      // Convert to JSON and save.
      System.out.println("Writing '" + page.getTitle() + "' (" + page.getId() + ".markdown)...");
      writeFile(page.getId() + ".json", gson.toJson(page));

      // Do not add to index if there is a meta noindex tag.
      if (shouldIndex) {
        // Construct a snippet and store into the index.
        // Destructively update the page coz we've already saved it.
        page.setHtml(snippet(document));
        index.getPages().add(page);
      }
    }
    System.out.println(files.size() + " files written.");

    // Write an index now.
    writeFile("index.json", gson.toJson(index));
    System.out.println("New index written.");
  }

  private static String snippet(Document document) {
    Elements p = document.select("p");
    Preconditions.checkState(!p.isEmpty(), "Page has no content!");
    String text = p.first().text();
    if (text.length() < SNIPPET_LENGTH)
      return text;
    return text.substring(0, SNIPPET_LENGTH).trim() + "...";
  }

  private static void writeFile(String fileName, String data) throws IOException {
    File outFile = new File("views/" + fileName);
    if (!outFile.exists())
      outFile.createNewFile();
    FileOutputStream outputStream = new FileOutputStream(outFile);
    outputStream.getChannel().truncate(0L);
    IOUtils.write(data, outputStream);
    IOUtils.closeQuietly(outputStream);
  }
}
