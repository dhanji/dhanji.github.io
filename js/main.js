
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

var noop = function() {};

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
  readingPanel.css('left', width).show()
      .animate({
        left: '304px'
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

  $('#index article h3').live('click', function() {
    var page = $(this).parent().attr('page-id');
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

// History.js jquery code taken from https://gist.github.com/854622
(function(window,undefined){

	// Prepare our Variables
	var
		History = window.History,
		$ = window.jQuery,
		document = window.document;

	// Check to see if History.js is enabled for our Browser
	if ( !History.enabled ) {
		return false;
	}

	// Wait for Document
	$(function(){
		// Prepare Variables
		var
			/* Application Specific Variables */
			contentSelector = '#content,article:first,.article:first,.post:first',
			$content = $(contentSelector).filter(':first'),
			contentNode = $content.get(0),
			$menu = $('#menu,#nav,nav:first,.nav:first').filter(':first'),
			activeClass = 'active selected current youarehere',
			activeSelector = '.active,.selected,.current,.youarehere',
			menuChildrenSelector = '> li,> ul > li',
			/* Application Generic Variables */
			$body = $(document.body),
			rootUrl = History.getRootUrl(),
			scrollOptions = {
				duration: 800,
				easing:'swing'
			};

		// Ensure Content
		if ( $content.length === 0 ) {
			$content = $body;
		}

		// Internal Helper
		$.expr[':'].internal = function(obj, index, meta, stack){
			// Prepare
			var
				$this = $(obj),
				url = $this.attr('href')||'',
				isInternalLink;

			// Check link
			isInternalLink = url.substring(0,rootUrl.length) === rootUrl || (/[^\:]/).test(url);

			// Ignore or Keep
			return isInternalLink;
		};

		// HTML Helper
		var documentHtml = function(html){
			// Prepare
			var result = String(html)
				.replace(/<\!DOCTYPE[^>]*>/i, '')
				.replace(/<(html|head|body|title|meta|script)/gi,'<div class="document-$1"')
				.replace(/<\/(html|head|body|title|meta|script)/gi,'</div')
			;

			// Return
			return result;
		};

		// Ajaxify Helper
		$.fn.ajaxify = function(){
			// Prepare
			var $this = $(this);

			// Ajaxify
			$this.find('a:internal').click(function(event){
				// Prepare
				var
					$this = $(this),
					url = $this.attr('href'),
					title = $this.attr('title')||null;

				// Continue as normal for cmd clicks etc
				if ( event.which == 2 || event.metaKey ) { return true; }

				// Ajaxify this link
				History.pushState(null,title,url);
				event.preventDefault();
				return false;
			});

			// Chain
			return $this;
		};

		// Ajaxify our Internal Links
		$body.ajaxify();

		// Hook into State Changes
		$(window).bind('statechange',function(){
			// Prepare Variables
			var
				State = History.getState(),
				url = State.url,
				relativeUrl = url.replace(rootUrl,'');

			// Set Loading
			$body.addClass('loading');

			// Start Fade Out
			// Animating to opacity to 0 still keeps the element's height intact
			// Which prevents that annoying pop bang issue when loading in new content
			$content.animate({opacity:0},800);

			// Ajax Request the Traditional Page
			$.ajax({
				url: url,
				success: function(data, textStatus, jqXHR){
					// Prepare
					var
						$data = $(documentHtml(data)),
						$dataBody = $data.find('.document-body:first'),
						$dataContent = $dataBody.find(contentSelector).filter(':first'),
						$menuChildren, contentHtml, $scripts;

					// Fetch the scripts
					$scripts = $dataContent.find('.document-script').detach();

					// Fetch the content
					contentHtml = $dataContent.html()||$data.html();
					if ( !contentHtml ) {
						document.location.href = url;
						return false;
					}

					// Update the menu
					$menuChildren = $menu.find(menuChildrenSelector);
					$menuChildren.filter(activeSelector).removeClass(activeClass);
					$menuChildren = $menuChildren.has('a[href^="'+relativeUrl+'"],a[href^="/'+relativeUrl+'"],a[href^="'+url+'"]');
					if ( $menuChildren.length === 1 ) { $menuChildren.addClass(activeClass); }

					// Update the content
					$content.stop(true,true);
					$content.html(contentHtml).ajaxify().css('opacity',100).show(); /* you could fade in here if you'd like */

					// Add the scripts
					$scripts.each(function(){
						var $script = $(this), scriptText = $script.html(), scriptNode = document.createElement('script');
						scriptNode.appendChild(document.createTextNode(scriptText));
						contentNode.appendChild(scriptNode);
					});

					// Complete the change
					if ( $body.ScrollTo||false ) { $body.ScrollTo(scrollOptions); } /* http://balupton.com/projects/jquery-scrollto */
					$body.removeClass('loading');

					// Inform Google Analytics of the change
					if ( typeof window.pageTracker !== 'undefined' ) {
						window.pageTracker._trackPageview(relativeUrl);
					}
				},
				error: function(jqXHR, textStatus, errorThrown){
					document.location.href = url;
					return false;
				}
			}); // end ajax

		}); // end onStateChange

	}); // end onDomLoad

})(window); // end closure

