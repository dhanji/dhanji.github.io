package com.wideplay.web;

import com.google.common.collect.Lists;

import java.util.List;

/**
 * Represents the home index of all pages on the site.
 * We may need to break this up so it doesn't become enormous.
 *
 * @author dhanji@gmail.com (Dhanji R. Prasanna)
 */
public class Index {
  private final List<Page> pages = Lists.newArrayList();

  public List<Page> getPages() {
    return pages;
  }
}
