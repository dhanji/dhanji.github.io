/**
 * Wideplay.com.
 *
 * Dhanji R. Prasanna's personal website.
 */

$(function() {
  $('#posts article h2').live('click', function() {

    // Remove the minimap.
    $('#minimap, .menu-control').fadeOut();

    // push the bump and curve away.
    $('#curve').animate({
      top: '35%',
      right: '-10%'
    }, 800);
    $('#bump').animate({
      top: '97%',
      right: '-40%',
      rotate: '5deg'
    }, 800, function() {
      $('#post').fadeIn('slow');
    });
    $('#posts').animate({
      translateX: '-98%'
    }, 800);
  });

  // Reverse the previous transition.
  $('#back-link').live('click', function() {

    // Remove the minimap.
    $('#post').fadeOut('fast');

    // push the bump and curve away.
    $('#curve').animate({
      top: '45%',
      right: '-8%'
    }, 800);
    $('#bump').animate({
      top: '82%',
      left: '6%',
      rotate: '-15deg'
    }, 800, function() {
      $('#minimap, .menu-control').fadeIn('slow');
    });
    $('#posts').animate({
      translateX: '0'
    }, 800);
  });

  // Minimap scrolling.
  $('.left').click(function() {
    var minimap = $('#minimap ul');
    minimap.animate({
      marginRight: '-40px'
    }, 800);
  });
  $('.right').click(function() {
    var minimap = $('#minimap ul');
    minimap.animate({
      marginRight: 0
    }, 800);
  });
});