
var MOBILE_THRESHOLD_PX = 700;

var rpc = function(url, func) {
  $.ajax({
    url: 'views/' + url + '.json',
    type: 'GET',
    dataType: 'json',
    data: '',
    success: func,
    failure: function() {
      alert('Unable to contact server, =(');
    }
  });
};

var onArticleArrived = function(data) {
  $('#main h1.accent').html(data.title);
  $('#content > h1').html(data.title + '<time pubdate datetime="">' + data.postedOn + '</time>');
  $('#content > .text').html(data.html);
};

// Detect iOS browsers.
if (navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad') >= 0
    || navigator.userAgent.indexOf('Android') >= 0) {
	$('html').addClass('ios');
}

function openReadingPanel(page) {
  var readingPanel = $('#main');
  window.location.hash = page;
  rpc(page, onArticleArrived);

  $('#content > h1').html('Loading...');
  $('#content > .text').html('');
  $('#index').hide();

  var width = $(window).width();

  // Mobile browsers (handle window size event)
  var left = '304px';
  var windowWidth = parseInt($(window).width());
  if ($('html').hasClass('ios')) {
    left = 0;
    $('#main article').css({
      width: (windowWidth - 145) + 'px'
    });
    $('#main').css({
      right: 0,
      'overflow-y': 'visible',
      'overflow-x': 'visible'
    });
  }

  readingPanel.css('left', width).show()
      .animate({
        left: left
      }, function() {
        // sHow accent when done
        $('#main h1.accent').fadeIn();
      });
}

$(function() {

  var articles = $('#index > .index');
  articles.html('');
  // Fetch the index right away.
  rpc('index', function(data) {
    if (data.pages.length) {
      for (var i = 0; i < data.pages.length; i++) {
        var page = data.pages[i];
        var builder = [
          '<article class="post" page-id="', page.id,'">',
          '<h3>', page.title,' </h3>',
          '<time pubdate datetime="', page.postedOn, '">', page.postedOn,'</time>',
          '<div class="snippet">', page.html, '</div>',
          '</article>'
        ];
        articles.append(builder.join(''));
      }
    }
  });

  // Look to see if this is a direct link and open the linked page if it is.
  var path = window.location.hash;
  if (path) {
    path = path.slice(path.lastIndexOf('#') + 1);
    if (path && path != '') {
      openReadingPanel(path);
    }
  }

  $('#index article h3').live('click', function() {
    window.location.hash = $(this).parent().attr('page-id');
    return false;
  });

  $('#link-about').click(function() {
    window.location.hash = 'about';
    return false;
  });
  $('#link-projects').click(function() {
    window.location.hash = 'projects';
    return false;
  });

  // Reverse animation for back-link
  $('#link-back').click(function() {
    $('#index').show();
    var width = $(window).width();
    $('#main').animate({
      left: width
    });
    $('#main h1.accent').fadeOut('fast');
    window.location.hash = '';
    return false;
  });

  // Hover effects.
  $('#main article > h1').live('mouseenter', function() {
    $('#main article time').fadeIn();
  }).live('mouseleave', function() {
    $('#main article time').fadeOut();
  });

  var target = $('#index > h2');
  var originalText = target.text();
  $('#index > h1').live('mouseenter', function() {
    target.fadeOut('slow', function() {
      target.text('A website by Dhanji R. Prasanna').fadeIn('slow');
    })
  }).live('mouseleave', function() {
    target.fadeOut(200, function() {
      target.text(originalText).fadeIn();
    });
  });

  // Reflow content to fit in mobile browsers:
  var windowWidth = parseInt($(window).width());
  if (windowWidth < MOBILE_THRESHOLD_PX) {
    $('header').css({
      position: 'static',
      right: 0
    });
    $('#index').css({
      position: 'static',
      left: 0
    });
    $('#index .index').css({
      width: 'auto',
      height: 'auto',
      '-webkit-column-count': 0
    });
    $('#index article').css({
      width: '100%'
    });
    $('body').css('overflow-y', 'auto');
  }

  $(window).hashchange(function() {
    var page = location.hash;
    if (page.length > 0 && page.charAt(0) == '#') {
      page = page.slice(1);
    }
    if (!page || page == '') {
      $('#index').show();
      // Go home.
      $('#main').fadeOut('fast');
      $('#main h1.accent').fadeOut('fast');
    } else {
      openReadingPanel(page);
    }
  });

  // Account for Firefox's weirdly thin rendering of Helvetica Neue
  if (navigator.userAgent.indexOf('Firefox') >= 0) {
    $('body').css('font-family', 'Arial');
  }

});
