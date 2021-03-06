<meta published="29 May 2015"/>
<meta tag="essay"/>
<meta tag="programming"/>

# On "Will this solve my problem?" thinking

Here's something one hears quite often: _Use database technology X because it is perfectly suited to your problem._
A variant of this is, _avoid technology Y because it is *ill- suited* to your problem._

Now both these statements can be valid, but in my experience they rarely are. Instead they often represent what I think of as a "Will this solve my problem?" mentality. Someone will say [MongoDB](https://www.mongodb.org) or [PostgreSQL](http://www.postgresql.org) or [Riak](http://basho.com) or _DB du jour_ is the best tool for the job, usually followed by some folksy platitude about how perfectly it suits a problem domain. My issue with this approach is that it ignores two realities of operational engineering: _performance and knowledge_.

It may very well be that MongoDB is perfect for your schema: you store everything as key-value blobs and rarely perform joins. Or it may be that you need to do joins all the time to pull in, for example, user avatars in a comment thread, for which a SQL schema design is more suitable. Neither of these is a great reason to to choose one database technology over the other, in my opinion.

Now, this sounds absurdly counter-intuitive, but hear me out. My reason is that the database API should play virtually no part in the operational concerns of your application. And the latter should be your main worry, in general (there are exceptions, of course).

When I was picking a database for my first startup [Fluent](http://techcrunch.com/2012/05/31/first-impressions-on-fluent-the-startup-promising-the-future-of-email/ "Fluent Email"), I wanted to use a key-value approach. This made for absurdly fast iteration of the schema during development, and even afterwards when we wanted to make major feature changes they could be done with a simple, background job that asynchronously updated any objects already in store. Mongo is the natural choice following "Will it solve my problem?" thinking. So I benchmarked MongoDB vs PostgreSQL. I found that Mongo blew PostgreSQL out of the water when used out-of-the-box (note that this information is some years out of date). I should naturally have been thrilled and picked it right away. But a nagging concern stuck with me: how is this even possible?

Given the same hardware, the same data ergonomics and usage conditions, there ought to be very little variation between the write performance of databases. After all, they move the platters roughly in the same way if they're fed incoming blobs in the same way. Granting that neither of the authors were completely inept this makes no sense at all. Of course, we now know why this is: Mongo's defaults provided for very little durability (they expected multiple replicas to be in operation as a redundancy), essentially writing to disk asynchronously. Aphyr's excellent research has [since demonstrated](https://aphyr.com/posts/284-call-me-maybe-mongodb "Call me Maybe: MongoDB") other problems too. Once I reset everything to match PostgreSQL's guarantees (as much as was possible, anyway), the performance of the two drew level.

_Again, please note that this experience happened many years ago and I only recount it here for illustrative purposes._

Fine, if they're equal, and Mongo's API is better to work with, then why not go with it anyway? That brings me to the second concern: knowledge. I know how PostgreSQL stores and retrieves data--rows are sequentially placed in discrete units called _pages_ which are written and loaded, individually. The pages are arranged in a BTree-like directory structure. Similarly, I know that a blob field type stores only a pointer in the record and the actual blob in a separate location. Conversely, a byte array stores it inline. This means when scanning down a table, storing large, cacheable objects as blobs has a significant performance advantage--and vice-versa for smaller, discrete objects that need to be retrieved immediately. I knew none of these things about Mongo. At the time there was not a great deal of tertiary documentation so I could not verify it all that easily either. I chose PostgreSQL.

Now, let me make _absolutely clear_ that this is not a panning of MongoDB. The excellent [Firebase](http://firebase.com) (recently acquired by Google to bolster its Cloud Platform) has long relied on it and to great effect. Rather, it's an examination of what choices and questions are important in software architecture.

Recently, someone wondered why Secret didn't just store everything in a Graph database such as [Neo4j](http://neo4j.com), it is a social network after all (In fact we did evaluate this and many other options). I had never heard of Neo4j or any graph database taking the kinds of loads we saw. Nor was there much to go on in the way of information about sharding, rebalancing strategy, disk and index storage formats and so on. When you have QPS in excess of six-figures you have to be pretty certain to make such a fundamental choice, and you often have to make that choice quickly.

_Again, my point here is not that neo4j is incapable of all this, it may very well be. It's that when making such decisions, especially under time pressure, you need to be convinced of the solution first, and only then the tool, one that you understand in that context._

The conventional-wisdom counter to this is, _it only matters at scale_. Go with SQL, says the argument, until it falls apart and then rewrite everything, and by that time it won't matter. This is a reasonable thought but I don't completely agree with it either. To my mind, performance is just as important as scale.

_Here, I'm defining performance as what a single user experiences._

Another [startup](http://tactile.com) I worked at began with the SQL approach. Still in stealth mode, they had only alpha users but the volume of data per-user was incredibly large. The product pulls existing data from Salesforce, Google, LinkedIn and Exchange and then performs some domain-specific computation on it. This data is then synced to the phone for offline use. In short order, it was clear that a normalized MySQL schema was just not going to cut it. The kinds of queries needed to generate a final, searchable database for a single user were absurdly inefficient. Even to write this volume of data to a single instance was not feasible, the results were that when one user was being onboarded, others would visibly suffer. Yet the schema fit SQL perfectly, it should have been the right choice. In the end, a custom solution performed far better, one backed by a NoSQL store.

This brings me to my thesis: rather than asking if a tool will solve my problem, I'd rather ask if I understand the behavior of this tool properly. Don't reject MongoDB out of hand because it "doesn't do joins", these guys [prove you wrong](https://www.firebase.com). Don't reject SQL because it "doesn't scale or shard well", look at this [magic bit of work](http://instagram-engineering.tumblr.com/post/10853187575/sharding-ids-at-instagram). A good tool can be phenomenal but it won't solve a problem for you. Patient, methodical software engineering, ultimately, is what solves the problem.



_Special thanks to [@sophistifunk](https://twitter.com/sophistifunk) and [@michaelneale](https://twitter.com/michaelneale) for reviewing early drafts._
