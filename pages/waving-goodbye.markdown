<meta published="06 Jun 2011"/>
<meta tag="personal"/>
<meta tag="wave"/>

# Waving Goodbye

In the past month or two, fully 8 of my colleagues from the [Google Wave](http://wave.google.com) project have resigned from
 the company. This is no strange coincidence given that annual bonuses for 2010 were paid out at the
 end of Q1 2011. However, it does give one pause to think about so many people from the same project
 (including myself) counting down the bonus clock.

For my part I really enjoyed my time at Google--it is the best job I've ever had, by a long way.
Everything you hear about is true: the friendly atmosphere, the freedom to pursue innovative ideas
and projects, capricious indulgence of engineers, and the noble sense of purpose
to change the world for the better with nary a thought given to profits or costs.

So why did we all quit? My colleagues have stated [their](http://blog.pamelafox.org/2011/02/goodbye-google-hello-world.html)
 [own](http://blog.douweosinga.com/2011/05/leaving-google-part-2.html)
 [reasons](http://jutopia.tirsen.com/2011/04/29/leaving_google.html), so I won't speak for them.
But for me it was very simple: I just didn't enjoy going in to work anymore. Many would question why
one would leave a high-paying job with all the comforts and freedoms that come at a place like Google.
Some people possess the ability to truck on through and find their
place in the system, maybe even take some joy in the everyday grind. I admire this ability but it is completely alien
to me.

### Productivity

Looking back, I did achieve a lot at Google--on Wave I helped design the search and indexing pipeline which was the
single best-scaling component in the entire system, supporting over 3 million users at one point.
The search team lead and I spent hours sitting together, hammering out details of intricate concurrency code,
recovery algorithms and solutions to tricky memory-pressure issues.

I also wrote the entire front end for Realtime Search, worked on Wave's Embedding APIs and
spent long hours and sleepless nights with each backend team helping improve their server's performance
during the harshest weeks of Wave's user load.

Outside Wave, Bob Lee, Jesse Wilson and I maintained Guice--a library at the heart of nearly every single
Java server at Google. I worked with various teams from AdWords, Gmail, Apps, and many others helping
 them sort out Guice and even general Java problems, particularly in dealing with performance
and concurrency. And did countless code reviews. I also represented Google on 3 different
 expert groups and was a member of the internal leadership council on all matters relating to Java.

Yet, I never once felt productive. I always felt like I was behind, and chasing the tail of some
ephemeral milepost of where I ought to be.

### Recognition

The nature of a large company like Google is such that they reward consistent, focused performance
 in one area. This sounds good on the surface, but if you're a hacker at heart like me, it's
 really the death knell for your career. It means that staking out a territory and defending it is
 far more important than *doing what it takes* to get a project to its goal. It means that working
 on Search, APIs, UI, performance, scalability and getting each one of those pieces across the line
 by any means necessary is actually bad for your career.

Engineers who simply staked out one component in the codebase, and rejected patches so they could
 maintain complete control over design and implementation details had much greater rewards. (I was
 one among many who felt this way, and had colleagues who deserved more recognition than
 me who received less, lest you think I am belly-aching =)

This is a general problem at Google--where territorialism is incentivized, but it was particularly bad
on the Wave project. I say this without bitterness--it is merely an observation in hindsight. A saving
 grace for me was that my colleagues across the various Google offices did give me a lot of
 personal recognition for my work on Guice and Java. But not everyone is so lucky.

### Speed

Here is something you've may have heard but never quite believed before: Google's vaunted scalable software infrastructure
 is obsolete. Don't get me wrong, their hardware and datacenters are the best in
the world, and as far as I know, nobody is close to matching it. But the software stack on top of it
is 10 years old, aging and designed for building search engines and crawlers. And it is well and truly obsolete.

[Protocol Buffers](http://code.google.com/p/protobuf/), [BigTable](http://labs.google.com/papers/bigtable.html)
 and [MapReduce](http://labs.google.com/papers/mapreduce.html) are ancient, creaking dinosaurs
 compared to [MessagePack](http://msgpack.org), JSON,
and [Hadoop](http://hadoop.apache.org/). And new projects like [GWT](http://code.google.com/webtoolkit/),
 [Closure](http://code.google.com/closure/) and [MegaStore](http://www.cidrdb.org/cidr2011/Papers/CIDR11_Paper32.pdf)
  are sluggish, overengineered Leviathans compared to
fast, elegant tools like [jQuery](http://jquery.org) and [mongoDB](http://mongodb.org). Designed by
 engineers in a vacuum, rather than by developers who have need of tools.

In the short time I've been outside Google I've created entire apps in Java in the space of a single
 workday. (Yes, you can program as [quickly in Java](http://sitebricks.org) as in Ruby or Python, if you understand your tools well.)
I've gotten prototypes off the ground, shown it to people, or deployed them with hardly any barriers.

### The Future

The feeling now is liberating and joyous. Working by yourself or in a small team is fantastic in so many ways,
that I simply can't describe it properly.  If you're a hacker, Google is not the ideal place
for you.

That said, I've learned so much from working there, and I like to believe that I bridge the gap between
hacker and engineer quite well. I enjoy the mathematical puzzles that Googlers love, I believe in
the value of a programmer versed in Computer Science as well as Software Engineering, ardently. I do
believe that Google is the best company in several generations and has transformed the way we
think, live and work for the better. And I have no cynical reservations about their motto "Don't Be Evil".
They aren't, and if you think you can find another company who has done as much for the world and been
as conscientious while keeping its promises to shareholders, then the more fool you.

For my part, the future is a bright day, free of the encumberances of bureaucracy and scale. The sun
is shining and I'm getting ready to start hacking.


<br>

<div style="font-size: small;">Find me on <a href="http://twitter.com/dhanji">twitter</a></div>
