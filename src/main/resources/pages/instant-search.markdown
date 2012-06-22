<meta published="22 Jun 2012"/>

# The Secret of 'Instant Search'

So we have this feature in my startup [Fluent](http://fluent.io) called *Instant Search*. The idea is that as you are typing a query, the results arrive instantaneously
for each partially formed progression of your final query term. So for example, if you typed "deep", before pressing enter
you would already have results for "deep vein thrombosis", "deep blue" and "deep sea diving" in the infinitesimal space
of time it took to type the 'p' in "deep".

<br>

Here's a video of it in action (Instant Search begins around the 1:18 mark):
<iframe width="560" height="315" src="http://www.youtube.com/embed/R_zD90mIHSU" frameborder="0" allowfullscreen></iframe>

<br>

Not only is this a neat piece of technology (if I may be permitted to say so of my own work), it is really a fantastic
way to improve your use of search. In other words, not only do you *search faster* you also *find faster*. 

In particular, I believe this puts Fluent's search capability far above say Gmail, Yahoo Mail or Hotmail, in terms of usefulness and speed. For example,
in Fluent, typing "In" would produce results for "India", "Indifferent" and "Inca", and a further keypress of "e" would narrow
down the results to only emails about "Inertia" or "Ineptitude" (lets hope there aren't too many of those in your inbox ;). 
Other webmail providers would not return these results at all, never mind returning them in tenths of a second.

Now you may think that a lot of clever engineering work went into the backends to make this a reality and that it involves some kind of highly patent-worthy secret sauce. You'd be wrong. The secret is all in the Browser.

### The Browser

OK, so I'm obviously exaggerating. We did put in an enormous amount of engineering effort to make the search and indexing
backends robust, concurrent and scalable. But the real trick of instant search lies in *latency to the browser*. I would say
this is the single most important thing that webapps get wrong when thinking about performance. Unless you're running multi-second
join queries on your database, the dominant factor in perceived latency is by far the network cost. In other words, the cost of pushing bits down the pipe from server to client generally outweighs any algorithm tweaking or CPU savings you can get (please
keep in mind that the operative word is *generally*). And that's exactly where we focused.

What makes this hellish problem to solve is that browsers come in all shapes and sizes, sit behind weird packet-inspecting firewalls and vary wildly from user to user, mobile, desktop or otherwise. In addition to this, not everyone is using the same
version of the same browser, and point releases often change functionality or performance characteristics quite significantly.

However, all this aside, the best way to reduce latency for instant responsiveness is via the use of an always-on connection.
Particularly, an HTML5 WebSocket. This may seem obvious to you, but consider that there are various tradeoffs to be made. WebSocket instantly limits you to a handful of browsers (at the time, only Safari and Chrome), and even those don't implement
it exactly alike. Minor differences in how SSL/trust occurs, etc., can affect the WebSocket upgrade request or prevent 
reconnections on-drop from working properly. For example, for a long time Safari would refuse to make a WebSocket connection
to an untrusted cert on localhost, so that made testing locally very painful. A version upgrade later, Safari allowed this but Chrome
decided not to.

Furthermore, you have to keep in mind that this channel wasn't meant solely for the Instant Search feature--a whole lot 
of other traffic had to go up and down it. New mail notifications, Read/unread status changes, archive, folders, starring,
TODO lists and other metadata, send mail confirmations, and so on. You don't want noisy lower priority traffic to crowd
out higher priority traffic.

But all said and done using WebSocket vastly reduces the latency for pushes from server to client by removing HTTP
request/response headers from the equation, and by keeping open a full-duplex bidirectional socket that is ideally suited
for short bursts of messages.

Compared to Long-Polling, it also removes the overhead of making a *renewal* request everytime the server pushes something
down. These savings don't sound like much, but when you're implementing such a latency-sensitive feature that is central
to your app, they are a godsend.

### Simplicity

I must have spent days testing the various WebSocket implementations out there. I was universally disappointed. Now, there are
some great libraries--Atmosphere, Socket.io, Webbit and so on, but these really didn't suit my purpose at all. Like any nascent technology, early libraries for WebSocket settle on making it easy to set up, focusing their efforts on that aspect of it, rather
than things like memory footprint, message-queueing, reliable delivery, fault-tolerance & backoff, concurrency, and so on. I don't
blame these libraries for not doing these things (some of them are starting to have features like this), I think as the
technology matures, use cases will drive them towards having these features. But for my purposes they were completely inadequate.

Add to this, the fact that a user can keep multiple tabs open with different
email accounts open on each one and the system starts to look a lot more complex than simply dragging in a library and hooking
up WebSocket.

So I did what any engineer does after preaching for years about the [perils of NIH](http://rethrick.com/nih)--I rolled my own.
Actually, I built all of these features on top of Jetty's excellent WebSocket extension. 

I'm sure I frustrated my colleagues on more than one occasion when our custom implementation broke or dropped the connection
randomly, or didn't backoff properly and spun the server to its knees with reconnect requests. But gradually, over time and a number of bug reports and concomitant patches, with a lot of seasoning and hardening, like good steel it began to shine.

A dropped WebSocket coming back up mid-flight, would receive all the messages it missed in the interim; failures in the network
caused by poor connectivity or firewalls, were papered over with throttled reconnects; and traffic requested in one browser
tab would correctly return to it, while general traffic (like new mail notifications) made it out to all tabs concurrently.

The early effort and frustrations totally paid off. Here is a selection of press responses to our Instant Search feature:

> Fluent's ... instant search function, which is one of the service's standout features. Fluent starts searching as soon as you type a single letter into the box; results from your email appear almost instantly and then morph as you continue to construct your search term, much like what Google does with its "Instant" search functionality. The speed and accuracy of the mail search is stupendous.

-- [Computer World](http://www.computerworld.com/s/article/9227899/Fluent_review_An_innovative_new_interface_for_Gmail)

> [Fluent's] flashiest thing is the "instant" search, which finds results as you type like Google Instant-the Web search results that appear as you type a query into Google.

-- [Technology Review](http://m.technologyreview.com/web/40612/)

> Even more impressive than all the above is Fluent's instant search. This is potentially the service's "killer" feature ...Fluent's search feature doesn't wait until you've completed a word, it's truly instantaneous ... Fluent's instant search is crazy, crazy fast. It's like Google Instant for your inbox. Which, of course, then begs the question: why isn't Google doing this? 

-- [TechCrunch](http://techcrunch.com/2012/05/31/first-impressions-on-fluent-the-startup-promising-the-future-of-email/)


### Progressive querying

The nice thing about using something like WebSocket is breaking the request/response coupling. By making the responses asynchronous, you can actually send additional keystrokes that race against (and invalidate) previous ones, and reach the client in record time. So as you refine your query with additional characters, the system actually becomes more responsive.

This kind
of progressive query build-up, helps warm the caches all the way from RAM to disk, making subsequent parts of the query much faster. The progressive build-up of the query also has other benefits: conducting an AND between two terms is much faster
than searching for either of those terms individually. Moreover, the structure of the index lends itself to further optimizations
like filtering results within results and so on. 

On top of that reducing the size of each response going down the wire has an enormous impact on search performance. One potential optimization is for the server to keep track of what results the client already knows about and simply send an id down instead of the entire snippet.

If one were so inclined one could spend a whole year tweaking things like this to improve search performance.

### Conclusion

Ultimately, building various pieces of this puzzle from scratch did pay off for us. But I picked my battles--the underlying text is tokenized and stored by Lucene. Yes, there are some customizations we did to make it perform and scale better, but essentially, Lucene is a fantastic library and does the job but only if you take the time to adapt it for your needs. We could have used any tokenizing/full-text search library, but we would not automatically have ended up with Instant Search. 

The point I'm trying to make is that building a powerful feature like Instant Search requires diligence and a careful, measured approach to the problem at hand; with a lot of backtracking, frustration and gradual evolution toward the (albeit optimistic) final goal.
And more often than not, it involves working in unsexy parts of the stack, reinventing and replacing minor cogs in a much bigger system of gears so that the engine may hum apace.

<br>

<div style="font-size: small;">Find me on <a href="http://twitter.com/dhanji">twitter</a></div>
