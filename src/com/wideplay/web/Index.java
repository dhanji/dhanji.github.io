package com.wideplay.web;

import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Represents the home index of all pages on the site.
 * We may need to break this up so it doesn't become enormous.
 *
 * @author dhanji@gmail.com (Dhanji R. Prasanna)
 */
public class Index {
  private final List<Page> pages = new ArrayList<>();

  public List<Page> getPages() {
    return pages;
  }

  public String generate(Document template) {
    template.select("#content h2,.text").remove();
    StringBuilder html = new StringBuilder();

    for (Page page : pages) {
      String relativeLink = "/p/" + page.getId();

      html.append("<h2>").append(toAnchorLink(relativeLink, page.getTitle())).append("</h2>");
      html.append("<div class=").append('"').append("meta").append('"').append('>');
      html.append("<ul class=").append('"').append("tags").append('"').append('>');
      page.getTags().stream()
          .forEach(t -> html.append("<li>")
              .append(toAnchorLink("#", t))
              .append("</li>"));
      html.append("</ul></div>");

      // Write snippet.
      String snippet = page.getHtml() + ' ' + toAnchorLink(relativeLink, "read more &rarr;");
      html.append("<div class=").append('"').append("text").append('"').append('>')
          .append(snippet)
          .append("</div>");
    }

    template.select("#content").append(html.toString());

    // Remove and re-add footer so it goes to the bottom.
    template.select("#content")
        .append(template.select("#content > footer").remove().outerHtml());
    Elements time = template.select("#content > footer time");
    String timestamp = Rethrick.DATE_FORMAT.format(new Date());
    time.html(timestamp);
    time.attr("datetime", timestamp);

    // Clean up.
    template.select("body meta").remove();

    return template.outerHtml();
  }

  private static String toAnchorLink(String href, String text) {
    return "<a href=\"" + href + "\"" + ">" + text + "</a>";
  }
}
