$ ->
  $('#share a.tweet,a.fb,a.gmail').on 'click', ->
    pup = window.open($(this).attr('href'),'','height=400, width=600,scrollable=no, menubar=no, resizable=yes')
    pup.focus() if window.focus
    return false
