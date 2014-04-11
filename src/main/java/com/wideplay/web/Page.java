package com.wideplay.web;

import com.google.gson.Gson;

import java.util.Date;

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

  public String getId() {
    return id;
  }

  public void name(String fileName) {
    this.id = fileName.substring(0, fileName.length() - ".markdown".length());
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

  public Page clone(Gson gson) {
    return gson.fromJson(gson.toJson(this), Page.class);
  }
}
