$ ->
  $('#share a.tweet,a.fb,a.gmail').on 'click', ->
    self = $(this)
    url = self.attr('href')

    base_url = 'http%3A%2F%2Frethrick.com&'
    if url.indexOf('facebook.com') > -1
      url = url.replace("#{base_url}&", "http%3A%2F%2Frethrick.com#{window.location.pathname}")
    else
      url = url.replace(base_url, "http%3A%2F%2Frethrick.com#{window.location.pathname}")

    pup = window.open(url,'','height=400, width=600,scrollable=no, menubar=no, resizable=yes')
    pup.focus() if window.focus
    return false
