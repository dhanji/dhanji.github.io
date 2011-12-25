<meta nopublish/>

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

### The Idea

The easiest part of the whole process was the idea. Not only do I have far too many of those available,
but at any given time I am also sitting on a pile of partially-built prototypes. They number in
the 20s at current and were variously built at airports, hotel-lobbies, conference venues and any 
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

### The Journey

There was quite a spirited response, plenty of encouragement, curiosity and snark for good measure:

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

I had not planned to put anything on twitter, and I certainly had not planned on anyone following me
through two days of blathering on about obscure compile bugs, [PEBKAC](http://en.wikipedia.org/wiki/User_error)
 errors and mostly, simple [RTFM](http://en.wikipedia.org/wiki/Rtfm) whining.
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
 blogs to read, Youtube clips to watch, and facebook and twitter updates to keep up with.

 Setting all this aside and concentrating on a single task for even a day is an incredibly intense
 activity. However, I think the brain is better suited to processing a variety of inputs over time and being
 given the freedom to wander, periodically. Processing on one task exclusively is thus brutally exhausting.

So these microscopic breaks to tweet my progress and their reciprocal cheerleading were invaluable.
Engineers from [Heroku](http://heroku.com) and [MongoLab](https://mongolab.com) even discovered what I 
was upto, and chimed in to offer their support.

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
project like this, it isn't really a problem. In fact, skipping tests _really_ reduces your drag 
coefficient when you're trying to fly through a set of tasks as I was. (This makes for a rather
 dangerous drug as many engineers take it to mean that tests themselves are either not 
 necessary or not important enough to write during proverbial _crunch time_.)

I did stumble once or twice however, and here tests were very useful. And this wasn't in their
traditional role of protecting well-honed code against regressions from newer, rawer additions,
 no--rather it was in the form of TDD (Test-Driven Development).

TDD is actually a wonderful tool for probing the behavior of an API or library. You get to script
very specific, what-if scenarios that would otherwise remain in the realm of idle speculation.
Specifically, I was not very familiar with the details of MongoDB's Java Driver, and was trivially
 able to validate my (apparently faulty) assumptions with a few simple tests. 

After struggling with puzzling behavior late on Saturday night, I gave up, frustration at full tilt.
Coming back the next morning however, a methodical, reasoned approach, tight along the rails of TDD
worked beautifully. And I had solved in minutes what had thwarted me for hours, just the night before.

But by no means am I advocating TDD as a religious practice--I wrote a grand total of four tests,
 and I stopped writing them as soon as I had decent visibility into my component of interest.

### Lessons

So here it is, in all its glory: http://pastebo.herokuapp.com

It's a pasteboard--drag pictures on to it from the desktop and share it via URL. A fairly simple concept,
but one that was a lot harder to realize than you might think.
Of course I wasn't expecting Google or Facebook to beat down my door on Monday morning, stock certificates
in hand, but I wasn't sure what I WAS expecting either. People seemed to genuinely enjoy using it. I was
pretty much done with it--after 16 hours I neither wanted to see the code again, nor think about its
future. So, what could I take away from this?

On reflecting a bit, I realized a great many things. They fell broadly into two categories:

1. What I would have done differently
2. What I would repeat because they worked so well

In the latter camp were things like Heroku, mongoDB and my approach to testing. In the former camp however,
I classified the following:

1. No login restriction (and no twitter sign in)
2. Allow anyone to paste pictures on any board
3. Get rid of commenting--it was hardly used
4. Focus more on picture resizing and rotation

Do you notice what's interesting about this list? All the items are product features--had I a do-over, they are things
I would have _changed_ about the product in the first place. Whereas my assumptions had been validated
nicely in technical matters--choice of platform, storage solution, and so on. In hindsight, this is fairly
obvious: my expertise is in engineering, so I am much more likely to make good decisions about
engineering matters. However, I had no prior experience building a pasteboard, so I was wrong on many of
my product assumptions.

This was the single most important take-away from my project. Your expertise is almost never in the
product that you're building (even if that is an engineering tool), and you only gain that expertise
with a real world test of your assumptions. Just 50 people on twitter giving me feedback was more valuable
than all the deep meditation and prototyping I have done about this idea over the past several months.

### Conclusion

My weekend project will never go beyond this little experiment. Nor do I need it to--I have seen it out in front
 of real users, learned some valuable lessons, and more importantly, gotten it out of my system. I had ups and downs and found
 a good process for working through problems both technical and motivational. In a sense, this was a micro-startup 
experience, fast-forwarded and compressed into a single weekend. It validated several of my assumptions
about the product, and exploded many more. I am thus armed with far better tools for future projects. 

I encourage you to try this too--your ideas always look and sound better in your own mind than in material reality.
 One's own [reality distortion field](http://en.wikipedia.org/wiki/Reality_distortion_field) is stronger than anything
  else. Once an idea takes form in the real world, however,
 your perspective will be very different. Often you will find that an idea is not really as impressive as you hoped,
 or particularly distinctive.

But in the process you may discover things that truly are.

<br>

<div style="font-size: small;">Find me on <a href="http://twitter.com/dhanji">twitter</a></div>
