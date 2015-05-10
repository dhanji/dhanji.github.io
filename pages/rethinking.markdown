<meta published="11 Sep 2012"/>
<meta tag="programming"/>
<meta tag="interface"/>

# Rethinking Google Wave

Ok this will be my last post about Wave and all things related. I've wanted to get this off my chest
for awhile, so here goes. Hopefully, reading it is as interesting to you as writing it was cathartic for me.

## Part 1: A Seedling Doubt

I remember a chilly Spring evening at Sweeney's rooftop bar in Sydney. This was at the height of Wave.
The growth numbers were incredible, signups were happening faster than we could spin up capacity, and
invites were filling up eBay auctions at a rate of knots.

We sat around the table in silence, nursing our beers. Finally, one of my colleagues broke the silence
with a sheepish grin, "Maybe there is something to this Wave thing after all."

I was thinking the same thing. We had spent many such evenings railing against bad UI decisions,
architectural choices and general process problems. We were in a pressure-cooker with unrealistic,
mythic, startup-style deadlines, so it was natural to vent. But I had always felt this was more than
venting, that behind each desperate argument was the pain of deep frustration. One that was born of an
equally deep passion to see this thing we had dedicated the past year to, succeed.

But now there was a doubt in our minds. Numbers don't lie--or do they?

### Technology vs. Product

To be sure not everyone felt this way. Only a handful of us gathered to drink after work, and an even smaller
number vented such frustrations.

Some weeks later, I read a blog post that was being circulated around the team. Most press we got in
those days was of the adulatory, sycophantic and over-hyped variety. Some of it was negative, but this
was usually driven by some agenda; like the [creator of Lotus Notes](http://en.wikipedia.org/wiki/Ray_Ozzie) declaring in an epic fit of irony that "Wave was [too complex](http://tech.slashdot.org/story/09/06/09/198205/ray-ozzie-calls-google-wave-anti-web)", so I learned
to tune most of it out.

This article was different however (try as I might, I can't locate it), its essential thrust was
about how the official description of Wave read like a laundry list of technology features, but said nothing about the
product itself. It went on to talk about a Facebook press release, which by comparison, was a succinct and clear 
statement of what a user could do with Events.

This really hit home for me. It phrased in simple words what I had been feeling all along and 
tied together the threads of all those frustrations into a coherent problem statement.

### Skunkworks

Of course we now know that the numbers were not to last. After the initial tsunami of tire-kickers came
and went, there was a barren wreck left. But it was also more than this: Wave really appealed to some people,
it certainly appealed to me, but why that was no one could really say. Perhaps it was the geek in me that
liked the idea of individual keystrokes flying about the earth, browser-to-browser, in fractions of a second.
Or that there was finally a simple way to capture all kinds of media in a simple, shared record (any Pinterest
fans out there?). Or even the idea of a really snazzy web app, a long overdue follow up to Gmail's
breakthrough effort years before.

Whatever it was, the project had its own momentum and that was not going to change. I even started a [skunkworks
project](http://code.google.com/p/google-wave-splash/) to try to fix some of the problems with the slow, unwieldy GWT client. At this time,
I still thought that things were salvageable if we only got the user interface to be simple and fast. I
roped in four colleagues including Wave's UX designer when no one was looking. When we demoed opening a 420-message
conversation in under 300ms to the rest of the team (in IE6 no less!), we actually got some converts. The GWT client
team started a skunkworks in counter-response to speed up their own UI. They did a great job (to be
fair, I had also contributed to the slowness of the old GWT client).

By the time we pushed this through Google's careful release process however, it was time to draw
the curtain down. The executive team was not interested in a second wind.

## Part 2: Rethinking things

But in hindsight, Im not sure that making a faster or simpler client would have bought us all that much. The problems
ran deeper, as that blogger had so succinctly identified. There was a looming question about the product itself. 

In that vein, I began thinking about what Wave might look like if it were run again as a startup in earnest. That is,
one without legions of engineers and product designers, and without the Leviathan Google launchpad to spring from.

What wave was good for in the end was working on a topic with a group. Generally the model worked best as follows:

  * A single "presenter" of a topic puts out a thesis in the first post
  * N responders comment or make minor edits to the post for marginal improvements
  * Each topic has an ephemeral lifespan not unlike a forum thread

What use case fits this really well? There are probably a number that come to mind, but my pick
would be mailing lists; for example, a Google Group used by an open source project. The current
state of the art here is severely lacking:

  * It is stuck in the email era of interactivity
  * Spam is an enormous problem (jQuery [left Google Groups](http://forum.jquery.com/topic/moving-away-from-google-groups-to-forums))
  * Poor support for rich media, extensions, and so on.

When I originally thought this up, I started by limiting logins to Twitter accounts (now I might choose something more developer friendly). This has a number of benefits, the main one being that you eliminate spam almost instantly. 
Also Twitter users overlap well with our target audience--active open source contributors and users. These
people are generally avid early adopters and strong evangelists for products they like.

Using something like Twitter for logins also has little advantages like better proliferation of avatars and
an easy-access, viral bullhorn for announcements. 

### Minimum Viable Product

In this spirit I made a few mockups (click to expand):


<a href="http://rethrick.com/images/wave/main.png">
  <img src="http://rethrick.com/images/wave/main.png" style="width:500px; display: block; margin: 0 auto; border: 1px solid #777; padding: 2px;">
</a>


This is a simple list of discussion threads belonging to a group, in this case for the [Sitebricks project](http://sitebricks.org). It is nice and clean, and it presents most of the information you need. Newer discussions rise to the top, and older ones fall away into an archive. The app deliberately
shows a limited number as I think the signal-to-noise ratio of mailing lists has a dramatic falloff.

The detailed view of a single discussion is also modernized but presents the main topic clearly.


<a href="http://rethrick.com/images/wave/thread.png">
  <img src="http://rethrick.com/images/wave/thread.png" style="width:500px; display: block; margin: 0 auto; border: 1px solid #777; padding: 2px;">
</a>


Here we have concurrently-editable rich text (that famous Wave OT technology) that forms the base of the discussion. While I think there is value in anyone being able to annotate the text of the first post, I didn't particularly like Wave's freeform tree-reply model.
Replies ran off-topic and out of hand quickly. Follow up replies and comments instead occur in a simple linear flow:


<a href="http://rethrick.com/images/wave/reply.png">
  <img src="http://rethrick.com/images/wave/reply.png" style="width:500px; display: block; margin: 0 auto; border: 1px solid #777; padding: 2px;">
</a>


Another thing I felt strongly about was the need for a topic _before_ you start writing a post. 


<a href="http://rethrick.com/images/wave/post.png">
  <img src="http://rethrick.com/images/wave/post.png" style="width:500px; display: block; margin: 0 auto; border: 1px solid #777; padding: 2px;">
</a>


This makes people stop and think about what exactly they want to say, and the best way in which to summarize it rather than dumping a bunch of thoughts in a post and then sticking a subject on them as an afterthought.

Next, a simple analog of Twitter's asymmetric follow model makes it easy to express interest in a single thread, an entire group, or a person _across_ groups:


<a href="http://rethrick.com/images/wave/following.png">
  <img src="http://rethrick.com/images/wave/following.png" style="width:500px; display: block; margin: 0 auto; border: 1px solid #777; padding: 2px;">
</a>


This is not dissimilar to "watched" threads in traditional forum apps. However, the toggle button being quick and responsive, lets you jump in and out of interest in a topic nicely. Replies to public threads come back at you via @mentions on Twitter, or if you've elected, as an email notification; but all the engagement happens on the site.

You can even implement ACLs using this scheme. Doing inventive things like restricting edit or comment access to your social graph on Twitter. One can imagine expert groups being run this way quite effectively.

There are a number of similar engagement techniques, for example, a dynamic counter showing who's active on this group _right now._


<a href="http://rethrick.com/images/wave/stats.png">
  <img src="http://rethrick.com/images/wave/stats.png" style="width:200px; display: block; margin: 0 auto; border: 1px solid #777; padding: 2px;">
</a>


The grid of avatars approach works too, especially if it were dynamically updated to show presence.

### Conclusion

Getting one or two high-profile open source projects to use the app would be a fantastic way to get grass-roots usage going. Related projects would soon follow giving you coveted viral growth (e.g. jQuery + plugins). And there'd be a ton of daily, real-world usage to measure and learn from. These kinds of users are quite vocal and will tell you exactly where you need to improve, and will bring with them a devoted user community.

Furthermore, I'd follow Github's wonderful example of giving away all public groups for free and charging a modest sum for private discussions as a source of revenue.


<a href="http://rethrick.com/images/wave/private.png">
  <img src="http://rethrick.com/images/wave/private.png" style="width:500px; display: block; margin: 0 auto; border: 1px solid #777; padding: 2px;">
</a>


Finally, there is a lot of scope beyond this. The set of Mailing List users (although this set is very large--Google Groups itself accounts for millions of users) is only a starting point, but a good starting point at that. If successful, working your way to the next great use case ought to be natural and smooth. You can imagine everything from planning an event, to working on group assignments, to live-blogging the next iProduct happening on this platform.

Wave attempted to be a great many things, but it attempted them all at once. If it started instead with just one and mastered it thoroughly, perhaps in time it would have earned all the rest.
