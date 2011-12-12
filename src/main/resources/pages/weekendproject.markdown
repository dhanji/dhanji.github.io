<meta noindex/>

# Exploring the mythical weekend project

Recently, I decided to give up one of my weekends and see if I could build an entire working product
from scratch. If you're like me, you have a lot of ideas rattling around in your head
and far too little time to realize any of them. Some seem like world-beaters, others are interesting
asides that would probably delight a niche audience. Regardless, I can't shake the feeling that the
world (and certainly, I) would be better off with these ideas material in reality, and perhaps more
 importantly--out of my head.

I'll give away the ending: I succeeded. It took me roughly 16 hours to plan, build and 
launch my idea to the world. And then, there was anti-climax. 

But before we get into that, let me retrace my steps over a gruelling, frustrating
and wholly satisfying two days.

# The Idea

The easiest part of the whole process was the idea. Not only do I have far too many of those available,
but at any given time I am also sitting on a pile of partially-built prototypes. They number in
the 20s at current and were variously built at airports, hotel-lobbies and conference venues and any 
other time that I imagine the rest of the population spends at the beach and on other healthy activities.

If you hack on open source or your own startup ideas you know exactly what I'm talking about. Many of
these projects will never see the light of day, but there is a primal, irrepressible need at the
 cellular level to try.

I picked the one that I've been thinking about most recently, and opened my code editor. As a lark,
I decided to put this up on twitter:

<blockquote class="twitter-tweet"><p>
Attempting "weekend coding project" Goal: working app in 2 days. Will I succeed? Will I fail miserably?
 Watch this spot for hourly updates!</p>@dhanji
</blockquote>

# The Journey

There was quite a spirited response, plenty of encouragement, curiousity and snark for good measure:

<blockquote class="twitter-tweet"><p>
@dhanji It'll kinda work but then you'll never finish it really is what usually happens.</p>
@dosinga
</blockquote>

<blockquote class="twitter-tweet"><p>
@dhanji hashtag please</p>
@j03w
</blockquote>

<blockquote class="twitter-tweet"><p>
@dhanji Wats the app? Wat technologies u using?</p>
@AalasiAadmi
</blockquote>

<blockquote class="twitter-tweet"><p>
Reading Steven Colebourne's Scala-hate while waiting for this heroku push to complete #weekendproject</p>
@dhanji
</blockquote>

I had not planned to put anything on twitter, and I certainly had not planned on anyone following me
through two days of blathering on about obscure compile bugs, PEBKAC errors and most often, simple RTFM whining.
This was an unexpected boost to my productivity and cheer. It turned into a game: if I ran into something
frustrating I cursed and swore on twitter while my friends cheered me up or brought me back down to earth.

<blockquote class="twitter-tweet"><p>
Feeling a lot slower than I normally do with this setup. Waiting for that boulder to cross the crest
 of the hill #weekendproject</p>
@dhanji
</blockquote>

<blockquote class="twitter-tweet"><p>
@dhanji perhaps it's all the tweeting slowing you down :D</p>
--private--
</blockquote>

If I achieved something, I could immediately shout it from the rooftops and be greeted by a wash of
enthusiastic replies. This kept me engaged and determined to see the project through. As easy as it sounds,
keeping your focus for 2 straight days is extremely difficult and tiring. If you
don't believe me, keep a count of the number of times you are distracted during a normal workday. At an
office people come around to you for coffee, to chat about their weekend plans, paperwork they need
done and so on. At home, there are plenty of other distractions like room-mates, children,
chores and what have you. Even when let completely alone we are relentlessly distracted by all those
 blogs to read, Youtube clips to watch, and facebook and twitter updates to keep up on.

 Setting all this aside and concentrating on a single task for even a day is an incredibly intense
 activity. However, I think the brain is naturally suited to processing a variety of inputs over time and being
 given the freedom to wander, periodically. Processing on one task exclusively is thus, brutally exhausting.

So these microscopic breaks to tweet my progress and their reciprocal cheerleading were invaluable.
Engineers from Heroku and MongoLab even discovered what I was upto, and chimed in to offer their support.

<blockquote class="twitter-tweet"><p>
@dhanji Glad you'll be checking us out. Definitely email us at support@mongolab.com if anything comes up.
</p>@mongolab
</blockquote>

<blockquote class="twitter-tweet"><p>
@dhanji DM me if you need a hand with anything Heroku-related.</p>@obfuscurity
</blockquote>

This took hardly any effort on their part, but when I was sometimes frustrated and ready to discard Heroku
for EC2 or Mongo for PostgreSQL, I thought twice--and I'm sure I would have been less willing to stick it
out without their encouragement.

### Testing

When you're under the gun, the first thing that gets tossed out are tests. In a small, inconsequential
project like this, it's not really a problem. In fact, not writing tests _really_ reduces your drag 
coefficient when you're trying to fly through a set of tasks as I was. (Often, this makes for
 a dangerous drug as many engineers take it to mean that the tests themselves are either not 
 necessary or not important enough to write during proverbial _crunch time_.)

I did stumble once or twice however, and here tests were very useful. And this wasn't in their
traditional role of protecting well-honed code against regressions from newer, rawer additions,
 no--rather it was in the form of TDD (Test-Driven Development).

TDD is actually a wonderful tool for probing the behavior of an API or library. You get to script
very specific, what-if scenarios that would otherwise remain in the realm of idle speculation.
Specifically, I was not very familiar with the details of MongoDB's Java Driver, and was trivially
 able to validate my (apparently faulty) assumptions with a few simple tests. 

After struggling with its puzzling behavior late on Saturday night, I gave up, frustration at full tilt.
Coming back the next morning however, a methodical, reasoned approach, tight along the rails of TDD
worked beautifully. And I had solved in minutes what had thwarted me for hours, just the night before.

But by no means am I advocating TDD as a religious practice--I wrote a grand total of four tests in my
project, and I stopped writing them as soon as I had decent visibility into my component of interest. As
soon as I was confident of its behavior, I moved on. And I didn't need the tests again.

### The Conclusion

So here it is, in all its glory: http://pastebo.herokuapp.com




Of course I wasn't expecting Google or Facebook to beat down my door on Monday morning, stock certificates
in hand, but I wasn't sure what I WAS expecting either. People seemed to genuinely enjoy using it.

LESSONS:



@dhanji
I have about 4 major features left and it's 9pm. Will be able to finish by tomorrow night? Suspense!

@dhanji
2 more major features left. Plus one incredibly annoying mongo bug (can't get it to update objects
 in place). Good night! 

@dhanji
Hello folks--Day #2, woke up after a bit of a sleep-in. Now I want this finished so I can get on
 with my life! #weekendproject

@dhanji
Writing my own session management code as I always do, but getting tripped up looking at my own
 code from 5 months ago! #weekendproject

@dhanji
I'm trying to put my app up on the web using Heroku, but that is proving difficult as Heroku is
 intermittently down. #weekendproject

### 

<br>

<div style="font-size: small;">Find me on <a href="http://twitter.com/dhanji">twitter</a></div>
