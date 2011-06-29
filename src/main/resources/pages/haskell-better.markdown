
# Haskell

I'm sure you've run into that annoying clod of a programmer, perhaps a colleague, an intern, or someone
you meet at drinks after a usergroup meeting. This person won't shut up about how fantastic
the Haskell programming language is. About how every other language is inferior, almost by definition,
how some day we will all be coding in Haskell, and disdaining object-oriented programming as the
failed anachronism that it already, clearly is.

Well, I am one of these people! To be sure, I find them equally annoying to be around and do roll my
eyes when I hear the phrase *referential transparency* bandied about with the same fervent, partial
dementia as *manifest destiny*. I listen closely for the subtle misunderstandings that are inevitably
lurking underneath this newly-minted zealotry. And I am seldom disappointed.

Haskell will never take over mainstream programming, it will always be the seductive, out-of-reach
mistress and muse of aspiring hackers. But I am a fan. Let me tell you why.

### A Question of State

Most modern programming is built around the idea of a state machine. Sure, there are patterns that
reduce things to declarative constructs and good libraries that encourage stateless architecture,
but essentially this is window dressing around the core programming model--which is pushing inputs
through a series of states.

I don't know about you but I find this model extremely difficult. In my limited experience, most people
are unable to keep more than a handful of potential options in their heads, let alone model the search
space of even the simplest of practical computing problems. If you don't believe me, construct a binary
search tree in your head, consisting of the english alphabet and desribe how to get to the letter Q.

This brings me to my next point--we're lazy. It's much simpler to describe the mechanism of the tree
than to realize the tree in your head. To say the tree behaves such that all letters above
'K' go in the right half of the tree and those below 'K' go in the left half. And so on, recursively.

Programming in Haskell naturally fits this way of modeling the universe. I concede here that I've
picked an example that is very favorable to my argument. But consider the broader dialectic of a material
search space versus the abstract, recursive description of a constraint. I argue that almost all problems
can be reduced this way. And it is quite clear which side is the more suited to human cognitive facility.

### Actual Performance

This is something you rarely hear annoying Haskell fanboys say, but Haskell has inherent, idiomatic
advantages over all other languages in performance. The trick is in [lazy evaluation](http://en.wikipedia.org/wiki/Lazy_evaluation).
Consider the following trivial example:

	pick [] = []
	pick ls = (take 100 ls) !! random

	pick [1..]

Here we are picking a number at random from the first 100 items of a list. Haskell's advantage lies in the
fact that it will only pick as many items from the list as the random index requires. In this
case, since the list is infinitely long, that will save us a lot of memory and CPU.

This code is readable, expressive and incredibly performant. Writing code like this in any other
language is pretty much impossible without trading speed and memory. This sort of expressiveness
is extremely useful in many real world use cases.

Lest you write this off as yet another contrived example to favor Haskell, check out this parser
that emits `xml` from [Maven Atom source code](https://github.com/dhanji/play/blob/master/hake.hs).

In particular, this line:

	xmlTag name content = '<' : name ++ ">" ++ content ++ ( "</" ++ (head $ words name) ++ ">")

..is used almost abusively all over the program; to rip apart the contents of an XML start
tag to extract the name of its end tag: `"</" ++ (head $ words name) ++ ">"`. To the non-lazy
programmer, this would appear extremely inefficient--why split the entire length of `name` by whitespace
every single time? But this is not how it works--in practice, the program only ever seeks as far as
the first space character because the function `words` is *lazily* evaluated.

In most other languages, this is something that could easily explode in CPU and memory cost.
In those languages, you'd be writing a separate 'optimized' version requiring additional tests,
prone to subtle bugs, performance problems and creating reams of unnecessary text to drag one's
eyes over.

### No Manifest Destiny

So, I'll admit it--I too, am a fanboy. I have a special affinity for Haskell, for the reasons mentioned above
and many others (my uncle was even a member of the original Haskell committee).

But as I said, it will never head over to the mainstream.
There are many reasons for this: Haskell's APIs are pedantic, quirkily designed, its monadic IO is confusing
and complicated, and so on. But the main reason is that shift in mindset required is far too great. We're
just too used to laundry-list-style sequences of instructions and attempting, however futilely, to
mentally map the search-space of a complex real-world problem, in fairly literal terms.

And I'm glad. I have fun with my exclusive little hobby, small community of co-conspirators, and
that tiny bit of magic I feel every time I stand back and behold my latest Haskell creation!

<br>

<div style="font-size: small;">Find me on <a href="http://twitter.com/dhanji">twitter</a></div>
