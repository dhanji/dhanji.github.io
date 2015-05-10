package com.wideplay.web;

import com.google.common.base.Strings;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * Blog post or webpage fragment, represented as JSON.
 *
 * @author dhanji@gmail.com (Dhanji R. Prasanna)
 */
public class Page implements Comparable<Page>, Cloneable {
  private String id;   // page id, used in URL fragments
  private String title;
  private String html; // (as html) after markdown
  private Date postedOn;
  private final Set<String> tags = new LinkedHashSet<>();

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getHtml() {
    return html;
  }

  public void setHtml(String html) {
    this.html = html;
  }

  public Date getPostedOn() {
    return postedOn;
  }

  public void setPostedOn(Date postedOn) {
    this.postedOn = postedOn;
  }

  public int compareTo(Page o) {
    return o.postedOn.compareTo(this.postedOn);
  }

  public Set<String> getTags() {
    return tags;
  }

  public void tag(String tag) {
    if (!tag.trim().isEmpty())
      tags.add(tag);
  }
}
