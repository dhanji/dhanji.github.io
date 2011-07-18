package com.wideplay.web;

import com.google.common.base.Charsets;
import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.LongSerializationPolicy;
import com.petebevin.markdown.MarkdownProcessor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.mvel2.templates.TemplateRuntime;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author dhanji@gmail.com (Dhanji R. Prasanna)
 */
public class Wideplay {
  public static final int SNIPPET_LENGTH = 150;
  private static final String DD_MMM_YYYY = "dd MMM yyyy";
  private static final DateFormat DATE_FORMAT = new SimpleDateFormat(DD_MMM_YYYY);

  public static void main(String... args) throws IOException {
    // Clean output dir first.
    System.out.println("Cleaning output dir...");
    File views = new File("views");
    FileUtils.deleteDirectory(views);
    views.mkdir();

    @SuppressWarnings("unchecked")
    Collection<File> files = FileUtils.listFiles(new File("src/main/resources"),
        new String[] { "markdown" }, true);

    Document blogTemplate = Jsoup.parse(IOUtils.toString(new FileReader("blog_template.html")));
    String rss = IOUtils.toString(new FileReader("rss_template.xml"));

    // Preprocess blog template a little, cleanup some of the DEV options (like relinking the CSS)
    blogTemplate.select("head > link[href=main.css]").attr("href", "/main.css");

    // Mark them down.
    MarkdownProcessor markdown = new MarkdownProcessor();
    Gson gson = new GsonBuilder()
        .setLongSerializationPolicy(LongSerializationPolicy.STRING)
        .setDateFormat(DD_MMM_YYYY)
        .disableHtmlEscaping()
        .create();

    Index index = new Index();
    List<Page> pages = Lists.newArrayListWithExpectedSize(files.size());
    for (File file : files) {
      FileReader input = new FileReader(file);
      String template = IOUtils.toString(input);
      IOUtils.closeQuietly(input);

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

      // Also save in crawlable/IE form.
      blogTemplate.select("#main h1").html(page.getTitle()
          + " <time pubdate datetime=\"\">"
          + DATE_FORMAT.format(page.getPostedOn())
          + "</time>");
      blogTemplate.select("#main .text").html(page.getHtml());

      // We need to save it in its own directory as an index.html for github to serve it correctly.
      new File(page.getId()).mkdirs();
      writeFile(new File(page.getId() + "/index.html"), blogTemplate.outerHtml());

      // Do not add to index if there is a meta noindex tag.
      if (shouldIndex) {
        pages.add(clone(gson, page));

        // Construct a snippet and store into the index.
        // Destructively update the page coz we've already saved it.
        page.setHtml(snippet(document));
        index.getPages().add(page);
      }
    }
    System.out.println(files.size() + " files written.");

    // Write an index now.
    Collections.sort(index.getPages());
    writeFile("index.json", gson.toJson(index));
    System.out.println("New index written.");

    // Write RSS feed.
    Collections.sort(pages);
    Map<Object,Object> vars = Maps.newHashMap();
    vars.put("pages", pages);
    writeFile("rethrick.xml", TemplateRuntime.eval(rss, vars).toString());
    System.out.println("RSS feed written.");
  }

  private static Page clone(Gson gson, Page page) {
    return gson.fromJson(gson.toJson(page), Page.class);
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
    writeFile(outFile, data);
  }

  private static void writeFile(File outFile, String data) throws IOException {
    FileOutputStream outputStream = new FileOutputStream(outFile);
    outputStream.getChannel().truncate(0L);
    OutputStreamWriter writer = new OutputStreamWriter(outputStream, Charsets.UTF_8);
    IOUtils.write(data, writer);
    writer.flush();
    IOUtils.closeQuietly(writer);
    IOUtils.closeQuietly(outputStream);
  }
}
