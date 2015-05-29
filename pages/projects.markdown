<meta noindex/>
<meta published="29 May 2011"/>
<meta tag="personal"/>
<meta tag="programming"/>

# My Projects

Here is a list of things I have worked on in the past, or am currently working on. They mostly
consist of open source projects except where they point to my work at Google and Fluent.

  * [Sitebricks](https://github.com/dhanji/sitebricks) - Sitebricks is a web applications library
    built on top of Guice. It
    makes life easy for Java developers providing something akin to the simplicity of Rails or
    Django yet with the rigor and type-safety of Java. Some of the ideas in JAX-RS mirror
    those found in Sitebricks.

  * [Fluent.io](http://fluent.io) - This is an email startup I founded along with some ex-colleagues
    from Google. It is built on Sitebricks and features an instant-search capability similar to
    Google Search, but over your email. I designed and built this feature from the ground up, including
    special adaptations to make it scale for hundreds of concurrent users with near-realtime indexing.
    I also created a pure-Java, custom IMAP engine using Non-blocking IO to fetch
    gigabytes of messages concurrently, performing over 50x better than industry standard JavaMail.
    I was responsible for the entire tech stack at Fluent.

> Fluent's search feature ... it's truly instantaneous... I can confirm that ... Fluent's instant
> search is crazy, crazy fast. It's like Google Instant for your inbox.
>
> <span class="caption">&mdash; [TechCrunch](http://techcrunch.com/2012/05/31/first-impressions-on-fluent-the-startup-promising-the-future-of-email)</span>

&nbsp;

> The speed and accuracy of the mail search is stupendous; it makes you wonder why Google doesn't
> have something similar in place for its own Gmail interface.
>
> <span class="caption">&mdash; [Computer World](http://www.computerworld.com/s/article/9227899/Fluent_review_An_innovative_new_interface_for_Gmail)</caption>

  * [Google Wave](http://wave.google.com) - In my nearly two years at this project, I helped
    design and build the Livesearch architecture, many aspects of the user interface,
    the third-party APIs and also spent a lot of time on scalability and
    performance, particularly with JVMs.

  * I have also represented Google on several Java expert groups including the Java API for RESTful
    web services.

  * [Guice](http://code.google.com/p/google-guice) - I created the Guice Servlet and Persist
    extensions that are widely in use today. Nearly every Java server at Google uses these
    technologies.

  * [Loop](https://github.com/dhanji/loop) - A functional programming language. Borrowing from the
    syntax and
    semantics of Scheme, Ruby, Haskell and Erlang, Loop is an attempt to create a practical,
    concise programming language for quick development.

  * [MVEL](http://mvel.codehaus.org) - I helped write the static typing layer for this fast,
    wonderful little expression language from my friend [Mike Brock](http://twitter.com/brockm).

  * [Maven Atom](https://github.com/sonatype/polyglot-maven/tree/master/pmaven-atom) - An experiment
   to create a compact syntax for Maven. Part of the
    [Polyglot Maven](http://polyglot.sonatype.org/) project. Here is an example:
<pre>   repositories << "http://repository.codehaus.org",
                     "http://repo1.maven.org/maven2"
    project "Google Guice" @ "http://code.google.com/p/google-guice"
       id: com.google.inject:guice:4.0
       srcs: [ src: "src" test: "test" ]
       deps: [ junit:junit:3.8.1 ]
       scm:  [ url: "url:git:git@github.com:mikebrock/mvel.git" ]</pre>

After Wave, I also worked on a few secret projects at Google.

In addition, I have a number of side projects I am always working on. As they mature I will post
about them on this website. see [about me](/p/about) for more.
