<meta nopublish/>
<meta published="10 Jan 2012"/>

# Languages, verbosity and Java

I learned Java in a short summer course right after graduating from high-school. Since then I have
been programming with it off and on for nearly 12 years, most recently at Google (where I represented
them on several Java expert groups) and a short consulting stint at Square, the payments startup. I enjoy
programming in Java. I am not one of those engineers who bemoans its various idiosynchrasies around
the coffee machine (though I occasionally enjoy doing that too).
I have an unabashed love for the language and platform and all the engineering power it represents.

But Java is verbose. There's no question about it--it's full of seemingly unnecessary repetitions,
lengthy, overwrought conventions and general syntax excessiveness. This is not really news--Java was conceived
as a subset of C++, which itself derives from C, a language that is over 30 years old and not
particularly known for being concise.

As a platform however, Java is modern and genuinely competitive. The combination of a robust garbage
collector, blazing fast VM and battery of libraries for just about every task has made it the
perfect launchpad for a plethora of products and new _hosted_ languages. (Interestingly, Google's V8 is
following a similar pattern.)

### Expressiveness

`ProducerConstructorFactoryFactory` jokes
notwithstanding, there is little doubt that the Java language suffers from a poor character-to-instruction
ratio. I call this property, "expressiveness". In other words, the number of keys you hit in order to accomplish
a simple task. This number is pretty big in Java. It repeatedly violates the DRY (dont-repeat-yourself)
principle and many of its modern features (like Generics) feel lumbering and unwieldy. This
makes reading and understanding source code a tedious task.

Comprehending unfamiliar source code is probably the most important thing a professional
engineer does (often one's own source code after a few weeks of neglect). So tedium in this
task is genuinely painful, and generally describes an unhealthy state of affairs.

As a result many new languages are designed with expressiveness in mind. Ruby and Python
led this trend in relation to C, and Scala, Fantom, Mirah, Groovy, etc., continue it on the JVM.
They have achieved remarkable results:

    boolean numeric = false;
    for (int i = 0; i < string.length(); ++i) {
      if (Character.isDigit(string.charAt(i))) {
        numeric = true;
        break;
      }
    }

<caption>Java code for determining if a string contains numeric characters</caption>

    val numeric = string.exists(_.isDigit)

<caption>Equivalent Scala code is much more expressive</caption>

This is wonderful news for all those insurance companies processing programmer RSI claims. We can
do the same thing in far fewer lines of code, and in some cases the savings are over an order of magnitude!
So have we solved the verbosity problem? Well, yes and no.

### Readability

Something that Josh Bloch said once has always stuck with me:

>  A little redundancy in a language is a good thing. It's important for readability.

Josh is Google's Chief Java Architect, but before that he spent years maintaining Java, was
responsible for Java 5 language features and has created wonderful little tools like
`java.util.Collection` and family. (He's also great at quotable little one-liners.)

As I surveyed the landscape of modern programming languages, I was struck by the wisdom of this
statement. Many have made incredible strides in expressiveness, but fewer words to read
do not always mean improved readability. In fact, in some cases expressiveness can be downright
bad for readability. Consider the following example:

    val ls = List(1, 2, 3, 4, 5)
    (0 /: ls) {_+_}

<caption>Scala code to sum a list using the fold operator</caption>

This code is gibberish if you don't understand that `/:` is a symbol that stands for the `foldLeft`
operation [among other things](http://rickyclarkson.blogspot.com/2008/01/in-defence-of-0l-in-scala.html).
While difficult to read it is still extremely powerful. This is the most compact way to sum a list
that I can think of without custom functions. There certainly isn't anything like it in Java.
However, even if you do understand the symbols, it's not exactly a breeze to read
and this is only a simple example.
The problem is that when you are reading code like this you must mentally substitute
the expanded construction for every compressed symbol (/: -> foldLeft). This has the unintended effect
of slowing down reading speed--especially if Scala is not your primary, day-to-day language.

If you have to go through a lot of code like this, things can get tedious rather quickly
Some people refer to this phenomenon as [language _density_](http://www.youtube.com/watch?v=XAbkDjV2Dp4).
Of course, for the experts, I am sure this is quite natural and not at all tedious. My intent
is not to criticize Scala, but rather to illustrate the spectrum of syntax--from the very verbose
to the very terse--and its concomitant effects on readability.

What is interesting is that these languages ARE solving the verbosity problem, but they're attacking
it by improving _writability_, not necessarily _readability_.

### Grammar and Syntax

Another effect of concise syntax is the increase in complexity of the grammar. Java's grammar has
an interesting property: nearly any expression can be matched to a specific production (roughly,
parsing rule) free of its surrounding context:

    happy happy(happy happy) {
      happy.happy.happy(happy);
    }

Anyone familiar with Java will have no trouble identifying each production in this code. It's
obviously a method that returns type happy, taking an argument
named happy of the same type, and so on. Even the potential ambiguity of the dot-syntax is a non-issue:

    happy.happy;

is an incomplete production and thus a syntax error--you don't even need to invoke the compiler.
The neat thing is that a single statement does not require any surrounding context to identify which
rule it matches, if any.

    happy.happy.happy();

is obviously a method invocation on a dereferenced variable. Similarly, referring to a package name
and class is clear:

    h = happy.happy.class;

Here the left-most happy is obviously a package and the right-most, a class [1]. This is a remarkable
property of the language and it is still more remarkable that this has been preserved across so many
versions of Java. It may not be immediately apparent, but this strict adherence to grammatical
rigor has many benefits to readability.

Of course, Java also benefits from being syntactically similar
to C++, which is buried deep within the collective consciousness of programmers. Even so, it has
readily jettisoned syntax where potential ambiguity was a danger (operator overloading is a good
example).

### Ambiguity

Consider the same dimension in modern (and decidedly more expressive) languages. Many of them
fall woefully short:

>   happy.happy.happy

<caption>Ruby code illustrating syntax ambiguity</caption>

Does this code represent variables being dereferenced? Or methods being called? Or something else?
It's impossible to tell without the surrounding context. Again I don't mean to pick on Ruby,
this is just a symptom of trading keystrokes for expressive power. In Python, the first `happy` could
even refer to a module (analogous to a Java package). Similar syntactic ambiguities exist in statically-typed
languages too.

At face value, this is not really so awful. What's so bad about looking around a statement to
see what it's about? Nobody reads single statements in isolation anyway. And yes, down to
each individual case it's not a problem. But taken in aggregate, these decisions lead to a non-trivial
increase in reading complexity. Throw in the optional mixture of
[infix and postfix operators](http://en.wikipedia.org/wiki/Infix_notation) and things start to get messy.

A bias towards writability also engenders subtle pains. Consider these two code snippets in the
popular language CoffeeScript:

    http.createServer (request, response) ->
      ...


    http.createServer(request, response) ->
      ...

The only difference is a space, but the choice to optionally invoke methods without parentheses
creates a subtle bug with rather large consequences. Both forms are valid, but only one creates
a server (the first one). The space tells CoffeeScript that rather than being a function call with
two arguments, it's a function call with a _closure_ that takes two arguments.

Now look at these two examples when compiled into JavaScript:

    http.createServer(function(request, response) {
      ...
    });


    http.createServer(request, response) (function() {
      ...
    });

Despite being slightly more verbose, this is much clearer to the untrained eye. Even to the trained
one, I imagine the latter form is significantly easier to spot problems with.

_A little redundancy in a language is a good thing._

### Evolution

I love CoffeeScript. I like Ruby. I really enjoy reading about the intricacies of Scala's type system
and learning about its dazzling array of brilliant, expressive features. Scala brings many of Haskell's
powerful and sometimes obscure features to the mainstream in an accessible, pragmatic fashion. I believe
that every one of these languages is an important, bold and laudable attempt at pushing the edge of
software engineering forward.

So what does this mean for verbosity? Are we always going to be stuck with it? Or do we have to trade
expressiveness for readability? I'm not nearly so pessimistic. One of my favorite languages, Scheme,
is incredibly expressive and readable.
As a dialect of Lisp, it has a [context-free grammar](http://en.wikipedia.org/wiki/Context-free_grammar)
that is very simple--everything is a list
of symbols, called S-Expressions. It is both concise and requires a lot fewer lines to achieve
similar results to those in Java. Of course, being more than 50 years old the syntax shows some signs
of age--it doesn't really work with object
oriented constructions, and there are [the parentheses](http://xkcd.com/297/).
But on the whole it is instructive. If Lisp managed such dexterity decades ago, I am optimistic for
the future.

No one should walk away from this article thinking that the modern language diaspora is a bad thing.
The evolution-by-degrees we're seeing now is thrilling and
exciting. Perhaps one of these languages will gain enough of a foothold
that we'll become used to its syntactic idiosyncrasies, and will read it with natural ease. Or perhaps
there will always be an evolving, frothing frontier to challenge and provoke us--to read better,
write better, and create better languages to express ourselves.

<br>

[1] Technically this could refer to an outer/inner class structure, but that serves effectively
the same purpose (namespace).

<div style="font-size: small;">Find me on <a href="http://twitter.com/dhanji">twitter</a></div>
