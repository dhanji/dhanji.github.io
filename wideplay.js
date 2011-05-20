/**
 * Wideplay.com.
 *
 * Dhanji R. Prasanna's personal website.
 */

function open(page, postBody) {
  $.ajax({
        type: 'GET',
        url: 'views/' + page + '.json',
        dataType: 'json',
        data: '',
        success: function(data) {
          // Incoming blog page.
          postBody.html(data.html);
          var h1 = $('h1', postBody).first();
          h1.before('<h2>' + h1.text() + '</h2>');
          h1.after('<time datetime="">' + data.postedOn + '</time>')
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

  var width = $(window).width();
  $('#posts').animate({
        translateX: - (width * 0.75)
      }, 800);
}
$(function() {
  var posts = $('#posts ul');
  var minimap = $('#minimap ul');

  // Load index.
  $.ajax({
    type: 'GET',
    url: 'views/index.json',
    dataType: 'json',
    data: '',
    success: function(data) {
      if (data) {
        posts.html(''); // Clean out placeholder markup.
        minimap.html('');
      }

      for (var i = 0; i < data.pages.length; i++) {
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
        minimap.append('<li class="stub" page-id="' + page.id + '"></li>')
      }
    },
    failure: function() {
      alert("Unable to contact server =(");
    }
  });

  var postBody = $('#post-body');
  $('#posts article > h2').live('click', function() {
    // Extract the page id and fetch it from the server.
    var page = $(this).parent().attr('page-id');
    open(page, postBody);
    return false;
  });

  $('#link-about').live('click', function() {
    open('about', postBody);
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
    return false;
  });

  // Minimap scrolling.
  $('.left').live('click', function() {
    var minimap = $('#minimap ul');
    minimap.animate({
      marginRight: '-40px'
    }, 800);
    return false;
  });
  $('.right').live('click', function() {
    var minimap = $('#minimap ul');
    minimap.animate({
      marginRight: 0
    }, 800);
    return false;
  });
});