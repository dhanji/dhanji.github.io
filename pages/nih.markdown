<meta published="12 Jun 2012"/>
<meta tag="programming"/>
<meta tag="essay"/>

# 'Not Invented Here' Syndrome

No doubt you've come across the "Not Invented Here" (NIH) issue at some point. (It even has a Wikipedia entry.) You start a new job, or a new project with a different team, and the first thing you see is a whole bunch of proprietary code. What web framework do you use? Oh, it's an in-house thing. JavaScript libraries? Some JQuery, but a lot of it is hand-rolled. And what database...? You get the picture.

Most good developers have a healthy aversion to seeing something like this. It smacks of a poorly managed, undisciplined project environment, and probably a disorganized workplace in general. But is that the whole story? Not necessarily—even companies with well-established development houses, with very experienced and successful engineers, often follow this system. Take Facebook's Cassandra, for example. This is a distributed database of the like of HBase, CouchDB, or MongoDB. LinkedIn's Voldemort is a similar technology. Facebook has the Thrift message-transmission format, which is not unlike Google's Protocol Buffers, which is itself not all that different in purpose and goal from Binary XML or JSON.

Why then does this NIH attitude proliferate throughout software development companies, both new and experienced, young and old? I believe there are a couple of reasons.

### An Interesting Problem

When you first start programming as an engineer, you're full of enthusiasm and verve. Everything you see is a problem to be solved, a mountain to be conquered. No matter that this mountain has been climbed hundreds of times by more seasoned (and often more sensible) climbers. Usually a young engineer finds some justification—the existing solutions are too complex, they're in the wrong programming language or platform, they're too slow or have security problems.

Generally these criticisms have some truth to them, but implicit is the assumption that the young programmer can do better, with limited time and resources, and with a more important goal in sight. The real reason, of course, is that the original goal is boring—most junior programmers don't get to code on the really "hot" stuff. They must do their time, implementing easy-but-laborious features, working their way usually from the front of the stack to the back-end, where senior stalwarts jealously guard their territories, gathered through years of careful experience.

I've fallen prey to this attitude myself, many times. Plenty of solutions worked well enough for the problem at hand. But generally, the problem itself offered very little challenge, so I invented my own challenge by trying to build a framework or an abstraction that did things maybe 10% better than the existing solution.

<i>Read the <a href="http://www.informit.com/articles/article.aspx?p=1905548">rest of this article</a> (at InformIT).</i>
