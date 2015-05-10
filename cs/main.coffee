$ ->
  $('#share a.tweet,a.fb,a.gmail').on 'click', ->
    url = $(this).attr('href')
    pup = window.open(url,'','height=400, width=600,scrollable=no, menubar=no, resizable=yes')
    pup.focus() if window.focus
    return false
