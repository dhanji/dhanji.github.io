<meta published="29 May 2011"/>
<meta tag="programming"/>

# Unit Testing: A False Idol

There is a fervor among agile enthusiasts and programmers about unit testing that borders on
religion. This fever has even infected the ranks of everyday programmers,
even those who do not practice Test-driven or eXtreme Programming.
So much so that the code coverage metric is a prized goal, one which misguided engineering
managers give out t-shirts and other pedestrian awards for. (At Google you similarly received
certifications based on levels of coverage--to be fair, among other criteria.)
This is a false idol--don't worship it!

 Unit tests create the illusion of a well-tested codebase,
 without the rigor that goes with it. The problem lies in the fact that there is almost never a
 match between the unit test and the atomicity of the unit under test. Invariably,
 these components have strong dependencies on the behavior of neighboring,
 external code. When you mock that dependency you are making an explicit commitment to
 maintain two streams of code--the mock, and the neighboring logic.

In Sitebricks, we have 321 unit tests and about 83 integration tests. The latter have,
time and again, proven far more useful in detecting bugs and preventing regressions than have the
 former. In fact, every time I add a working, well-tested feature, I find that I must crawl a
 spiderweb of unrelated unit tests and fix all the mock behaviors to correspond to the new system.
This makes refactoring very frustrating, and sometimes downright impractical.

This is not to say that all unit testing is bad--of course not. The dispatch logic in Guice
Servlet and Sitebricks benefit from rigorous, modular unit tests. If you have ever used Gmail,
Blogger, Google Apps, AdWords or Google Wave (all use Guice Servlet to dispatch requests) you
have seen the benefits of this rigor first-hand. But take it from me,
we could have achieved the same level of confidence with a few well written unit tests and a
battery of integration tests. And we'd have been in a much better position to improve the
framework and add features quickly.

Nowadays, when I'm doing major refactors of Sitebricks I simply delete unit tests that are
getting in my way, the overall code quality continues to be high and I am able to respond faster
to bug reports and feature requests.

So the next time someone comes to you saying let's write the
 tests first, or that we should aim for 80% code coverage, take it with a healthy dose of
 skepticism.
