
var rpc = function(url, func) {
  $.ajax({
    url: 'views/' + url + '.json',
    type: 'POST',
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

var noop = function() {};

// Detect iOS browsers.
if (navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad') >= 0) {
	$('html').addClass('ios');
}

function openReadingPanel(page) {
  var readingPanel = $('#main');
  rpc(page, onArticleArrived);

  var width = $(window).width();
  readingPanel.css('left', width).show()
      .animate({
        left: '304px'
      }, function() {
        // sHow accent when done
        $('#main h1.accent').fadeIn();
      });
}

$(function() {
  $('#index article h3').live('click', function() {
    var page = $('#content').attr('page-id');
    openReadingPanel(page);
  });

  $('#link-about').click(function() {
    openReadingPanel('about');
  });
  $('#link-projects').click(function() {
    openReadingPanel('projects');
  });

  // Reverse animation for back-link
  $('#link-back').live('click', function() {
    var width = $(window).width();
    $('#main').animate({
      left: width
    });
    $('#main h1.accent').fadeOut('fast');
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
});