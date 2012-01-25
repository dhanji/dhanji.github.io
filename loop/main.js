/**
 * loop-lang.org home page. By Dhanji R. Prasanna.
 */
$(function() {
  $('ul.topics > li a').click(function () {
    var block = $(this).parent().find('pre');
    if (!block.is(':visible')) {
      block.css({
        display: 'block'
      });
    } else {
      block.css({
        display: 'none'
      });
    }

  return false;
  });
});
