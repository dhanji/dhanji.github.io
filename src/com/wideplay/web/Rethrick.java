package com.wideplay.web;

import com.google.common.base.Charsets;
import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.io.Files;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.LongSerializationPolicy;
import com.petebevin.markdown.MarkdownProcessor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.mvel2.templates.TemplateRuntime;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author dhanji@gmail.com (Dhanji R. Prasanna)
 */
@SuppressWarnings("ResultOfMethodCallIgnored")
public class Rethrick {
  public static final int SNIPPET_LENGTH = 250;
  private static final String DD_MMM_YYYY = "dd MMM yyyy";
  static final DateFormat DATE_FORMAT = new SimpleDateFormat(DD_MMM_YYYY);

  public static void main(String... args) throws IOException, ParseException {
    // Clean output dir first.
    System.out.println("Cleaning output dir...");
    File views = new File("views");
    FileUtils.deleteDirectory(views);
    views.mkdir();

    @SuppressWarnings("unchecked")
    Collection<File> files = FileUtils.listFiles(new File("pages"),
        new String[] { "markdown" }, true);

    Document blogTemplate = readTemplate();
    String rss = Files.toString(new File("rss_template.xml"), Charsets.UTF_8);

    // Preprocess blog template a little, cleanup some of the DEV options (like relinking the CSS)
    blogTemplate.select("script[src]").stream()
        .filter(scriptTag -> !scriptTag.attr("src").startsWith("src"))
        .forEach(scriptTag -> scriptTag.attr("src", "../../" + scriptTag.attr("src")));

    blogTemplate.select("link[href]").stream()
        .filter(linkTag -> !linkTag.attr("href").startsWith("http"))
        .forEach(linkTag -> linkTag.attr("href", "../../" + linkTag.attr("href")));

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
      String template = Files.toString(file, Charsets.UTF_8);

      // Outfile is...
      String fileName = file.getName();

      Page page = new Page();
      page.setId(fileName.substring(0, fileName.length() - ".markdown".length()));
      String html = markdown.markdown(template);

      // JSoup this sucka to grab metadata out of it.
      Document document = Jsoup.parse(html);

      Elements nopublish = document.select("meta[nopublish]");
      if (!nopublish.isEmpty())
        continue;

      // There should always be an h1
      Elements h1 = document.select("h1");
      Elements noindex = document.select("meta[noindex]");
      Elements published = document.select("meta[published]");
      Elements tags = document.select("meta[tag]");
      boolean shouldIndex = noindex.isEmpty();
      Preconditions.checkState(!published.isEmpty(), "%s is missing a published meta tag", fileName);
      Date publishedOn = DATE_FORMAT.parse(published.attr("published"));

      Preconditions.checkState(!h1.isEmpty(), file.getName() + " is missing a title (<h1> tag)");
      h1.remove();      // remove from document as it is rendered using JSON.
      noindex.remove(); // remove internal meta tags.

      page.setTitle(h1.first().text());
      page.setPostedOn(publishedOn);
      page.setHtml(document.select("body").html());
      for (Element tag : tags)
        page.tag(tag.attr("tag"));

      System.out.println("Writing '" + page.getTitle() + "' (" + page.getId() + ".markdown)...");

      // Save as HTML.
      blogTemplate.select("#content h2").html(page.getTitle());
      Elements time = blogTemplate.select("#content footer > time");
      time.html(DATE_FORMAT.format(page.getPostedOn()));
      time.attr("datetime", DATE_FORMAT.format(page.getPostedOn()));
      blogTemplate.select("#content .text").html(page.getHtml());
      Elements tagsElement = blogTemplate.select("#meta .tags");
      tagsElement.html("");
      page.getTags().stream()
          .forEach(t -> tagsElement.append("<li><a href=\"#\">"
              + t
              + "</a></li>"
          ));

      // Clean up.
      blogTemplate.select("body meta").remove();

      // We need to save it in its own directory as an index.html for github to serve it correctly.
      String pageDir = "p/" + page.getId();
      //noinspection ResultOfMethodCallIgnored
      new File(pageDir).mkdirs();
      writeFile(new File(pageDir + "/index.html"), blogTemplate.outerHtml());

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

    writeFile("index.html", index.generate(readTemplate()));
    System.out.println("New index written.");

    // Write RSS feed.
    Collections.sort(pages);
    Map<Object,Object> vars = Maps.newHashMap();
    vars.put("pages", pages);
    writeFile("rethrick.xml", TemplateRuntime.eval(rss, vars).toString());
    System.out.println("RSS feed written.");
  }

  private static Document readTemplate() throws IOException {
    return Jsoup.parse(Files.toString(new File("blog_template.html"), Charsets.UTF_8));
  }

  private static Page clone(Gson gson, Page page) {
    return gson.fromJson(gson.toJson(page), Page.class);
  }

  private static String snippet(Document document) {
    Elements p = document.select("p:matchesOwn(.+)");
    Preconditions.checkState(!p.isEmpty(), "Page has no content!");
    String text = p.first().text();
    if (text.length() < SNIPPET_LENGTH)
      return text;
    return text.substring(0, SNIPPET_LENGTH).trim() + "...";
  }

  private static void writeFile(String fileName, String data) throws IOException {
    File outFile = new File(fileName);
    if (!outFile.exists())
      //noinspection ResultOfMethodCallIgnored
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
