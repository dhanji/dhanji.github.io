/**
 * Wideplay.com.
 *
 * Dhanji R. Prasanna's personal website.
 */

$(function() {
  var posts = $('#posts ul');

  // Load index.
  $.ajax({
    type: 'GET',
    url: 'index.json',
    dataType: 'json',
    data: '',
    success: function(data) {
      for (var i; i < data.pages; i++) {
        var page = data.pages[i];
        var builder = [
          '<li><article page-id="',
          page.id,
          '"><h2>',
          page.title,
          '</h2>',
          '<p>',
          page.html, /* snippet */
          '</p>',
          '<time pubdate datetime="">',
          page.postedOn,
          '</time></article></li>'
        ];
        posts.append(builder.join(''));
      }
    },
    failure: function() {
      alert("Unable to contact server =(");
    }
  });

  $('#posts article > h2').live('click', function() {
    // Extract the page id and fetch it from the server.
    var page = $(this).parent().attr('page-id');
    $.ajax({
      type: 'GET',
      url: page + '.json',
      dataType: 'json',
      data: '',
      success: function(data) {
        // Incoming blog page.

      },
      failure: function() {
        alert("Unable to contact server =(");
      }
    });

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
  $('.left').live('click', function() {
    var minimap = $('#minimap ul');
    minimap.animate({
      marginRight: '-40px'
    }, 800);
  });
  $('.right').live('click', function() {
    var minimap = $('#minimap ul');
    minimap.animate({
      marginRight: 0
    }, 800);
  });
});