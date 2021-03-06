<meta published="28 May 2011"/>
<meta tag="programming"/>

# Comets and Meteors

I am exploring writing an app with Comet (reverse Ajax) aka 'hanging gets'. I thought I knew how
 this worked in detail, but after days of research I found my knowledge sorely lacking. There isn't
  much good information on the web either, so I thought I'd summarize what I learned here.

You can achieve server-to-client message pushing in several different ways:

  * Websockets - HTML5 standard that allows you to establish a full-duplex TCP socket with a
 high-level Javascript API. Only Chrome/Safari, Opera and Firefox seem to support this (Firefox
 4 has since disabled support for security reasons).
  * Forever Frame - An iFrame whose content length is infinite. You just keep writing script tags
 out that invoke a callback in the parent frame with the server's push data. This is commonly used with IE.
  * Hanging GET (Multipart response) - This is a wonderful hack around an occult and obscure
 behavior introduced by Netscape. It only works in Firefox and Safari/Chrome, but it is brilliant-by
  reusing the ability to send multiple images back in a single response, you can instead encode JSON
  packets chunked by message length. The browser processes each JSON packet without ever closing the
  response stream, which can live forever.
  * Hanging GET (Long polling) - A less wonderful but perhaps more effective hack,
  a long poll is very much like a regular poll except that if there is no data,
  the server holds the stream open rather than return an empty response. When there is data to
  push, it is written and the response is closed. The client immediately opens a new request to
  re-establish this backchannel. A clever scheme will hold open POSTs that the client uses to send
   data and flip between them. This is the basis for the Bayeaux protocol.
  * Other (Flash Socket, Java Pushlet, etc.) - These rely on plugins to open a duplex channel to
  the server and have their own issues with compatibility and problems working via proxies.

This confused me at first because there are two flavors of hanging GET. Long polling works
 on all browsers but is somewhat inefficient. Multipart response is very clever and more
 efficient but does not work with IE.

There are many libraries that magic all this away for you. I caution against using them until you
 really understand what they do. Most of the ones I checked out do way more than you want and
  implement everything under the sun. IMO this is unnecessary bloat on the JS side and an
  increase in stack complexity.

You can build a long polling server with very little effort using vanilla jQuery and [Jetty](http://eclipse.org/jetty),
 using its continuations API. This is remarkably scalable too, given that Jetty continuations is not
 a thread-per-request model. Making a server to use with Websockets is similarly straightforward.

My advice? Build a simple RPC abstraction on top of websockets. Test with Chrome or Firefox and
 then when you really need to support other browsers sub in the hand-over-hand long polling method
 I described above.

I'll post any code I come up with.
