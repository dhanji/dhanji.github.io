
# Testing Parsers & Concurrent Code

Testing is an interesting subject. Everyone pays lip service to it, but I suspect that secretly no one wants to do it. I'm specifically talking about writing automated tests. Much of the available literature focuses on testing frameworks (xUnit, QuickCheck, Selenium, and so on) or methodologies (test-driven development, functional testing), but not much on testing techniques. This may sound reasonable, but by comparison literature on writing production code is considerably richer-you can find all kinds of books and articles on design patterns, architecture, and algorithms. But apart from some pedantic stuff about mock versus stub objects, I haven't really come across a lot on the techniques of testing. I've always found learning a new technique to be far more valuable than learning a new framework.

Until a few years ago, I had pretty much assumed that I knew all there was to know about testing. It was a chore that simply had to be endured, with things like test-driven development (TDD) being occasional, interesting distractions. However, since then I've come to realize that what I don't know far outweighs what I do know. Visual testing is a technique I picked up from watching and imitating brilliant engineers over the years. While it may not be revolutionary, I've found it incredibly useful when attacking difficult testing problems.

### Comparing Strings

Like many good techniques, visual testing is largely about giving you clear, concise, and exhaustive information about what happened. Here's a simple example:

     @Test
     public void sortSomeNumbers() {
       assertEquals("[1, 2, 3]", Sorter.sort(3, 2, 1).toString());
     }

This test asserts that my program, Sorter, correctly sorts a list of three numbers. But the test is comparing strings, rather than asserting order in a list of numbers.
_If this example is setting off your type-safety warning bells, don't worry; its benefit will become clear shortly._

Since we're only testing string equality, it doesn't really matter if Sorter.sort() returns a list, an array, or some other kind of object—as long as its string form produces a result that we expect. This capability is incredibly powerful for a couple of reasons:

You can instantly see when something is wrong by simply diffing two strings.
You're free to change your mind about the underlying logic (repeatedly), and your test remains unchanged.
You might argue that the second point is achieved with a sufficiently abstract interface--this is largely true, but in many cases it's quite cumbersome. (Particularly with evolving code, I've found it quite painful.) And refactoring tools only take you so far. Using strings neatly sidesteps this problem.

<i>Read the <a href="http://www.informit.com/articles/article.aspx?p=1831497">rest of this article</a> (at InformIT).</i>

<br>

<div style="font-size: small;">Find me on <a href="http://twitter.com/dhanji">twitter</a></div>