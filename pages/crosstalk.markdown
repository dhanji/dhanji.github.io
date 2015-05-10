<meta published="08 Jun 2011"/>
<meta tag="programming"/>
<meta tag="products"/>

# Crosstalk: A Chat App

Not long ago there was a crazy rush of startups building group chat applications. Names like Beluga,
 Convore, Banter.ly, Group.me, Brizzly and others spring to mind. Other, more mature products like
 37signals' Campfire and web-based IRC clients are also part of this suite.

The space is crowded, and recently bubble-like in its growth. I think there are a multitude of reasons
for this:

  * Status updates have become the currency of social interaction thanks to Twitter and Facebook
  * There is a real need for group communication that these products do not provide
  * It is fairly easy to write a group chat app, and the point of distincion is all about UI

As an experiment to test these three theories, [The Man in Blue](http://themaninblue.com) and I took a week to see if we could
build such a group-chat application. We came up with Crosstalk after four days.

<a href="http://rethrick.com/images/xtalk-home.png">
  <img src="http://rethrick.com/images/xtalk-home.png" style="width:400px; display: block; margin: 0 auto; border: 1px solid #777; padding: 2px;">
</a>

<br>
<a href="http://rethrick.com/images/xtalk-room.png">
  <img src="http://rethrick.com/images/xtalk-room.png" style="width:400px; display: block; margin: 0 auto; border: 1px solid #777; padding: 2px;">
</a>



We have no particular intention of making this a startup or a running service (for reasons obvious
from above), so in light of that I am announcing the release of the code as open source to do with
as you will:

[http://github.com/dhanji/crosstalk](http://github.com/dhanji/crosstalk)

### Events

To give ourselves a specific goal, we focused on realtime chat for events, and customized it for
 the excellent [Webstock](http://webstock.co.nz) conference in New Zealand. We hoped it would prove useful for session
 attendees to share instant reactions, links and photos.

  It proved to have mixed results, some sessions
 were good and others weak. We didn't promote the app at all beyond a tweet, so this may have been
  the cause. Also 4-days of coding are bound to leave one with a few bugs.

### Technology

The server was written on Google Appengine/Java, and powered by [Sitebricks](http://sitebricks.org). We used
the Appengine Channel API for Comet support (Message Push to the browser) and the client was written
 in jQuery with a focus on HTML5 features.

I am proud to say we managed to get nearly every feature we wanted done, though not all worked to
 satisfaction for various reasons, including some quirks of Appengine. Here's an overview:

  * You sign in with a Twitter account over OAuth
  * Adding *terms* to a room triggers a periodic fetch of tweets matching that term from the public timeline
  * Attachments such as images can be dragged and dropped into the browser window
  * Images, Video URLs, and even Amazon product links are expanded/snippeted inline using [embed.ly](http://embed.ly)
  * The right margin features an activity histogram for the life of the chatroom

The disclaimer is that it's still very raw, but you should be able to build and deploy it on any
Appengine account using:

    mvn package
    appcfg.sh update src/main/webapp

<div style="font-size: small;">You will need <a href="http://maven.apache.org">Maven 2.2.1</a> and the
<a href="http://code.google.com/appengine/downloads.html">Appengine Java SDK</a></div>


Tweet me your thoughts.
