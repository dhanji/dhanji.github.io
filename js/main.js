var hist = window.History;

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
if (navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad') >= 0) {
	$('html').addClass('ios');
}

function openReadingPanel(page) {
  var readingPanel = $('#main');
  rpc(page, onArticleArrived);

  $('#content > h1').html('Loading...');
  $('#content > .text').html('');

  var width = $(window).width();

  // Mobile browsers (handle window size event)
  var left = '304px';
  var windowWidth = parseInt($(window).width());
  if (windowWidth < MOBILE_THRESHOLD_PX) {
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
    var page = $(this).parent().attr('page-id');
    hist.pushState({ id: page }, $(this).text(), '#' + page);
    openReadingPanel(page);
    return false;
  });

  $('#link-about').click(function() {
    var page = 'about';
    hist.pushState({ id: page }, 'About me', '#' + page);
    openReadingPanel(page);
    return false;
  });
  $('#link-projects').click(function() {
    var page = 'projects';
    hist.pushState({ id: page }, 'My Projects', '#' + page);
    openReadingPanel(page);
    return false;
  });

  // Reverse animation for back-link
  $('#link-back').click(function() {
    var width = $(window).width();
    $('#main').animate({
      left: width
    });
    $('#main h1.accent').fadeOut('fast');
    hist.back();
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
});

(function(window){
  var hist = window.History;

  $(window).bind('statechange', function(){
    var state = hist.getState();
    // your code ...
    if (!state.title || state.title == '') {
      // Go home.
      $('#main').fadeOut('fast');
      $('#main h1.accent').fadeOut('fast');
    } else {
      openReadingPanel(state.data.id);
    }
  });

})(window);