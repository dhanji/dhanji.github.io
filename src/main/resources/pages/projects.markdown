<meta noindex/>

# My Projects

Here is a list of things I have worked on in the past, or am currently working on. They mostly
consist of open source projects except where they point to my work at Google.

  * [Sitebricks](https://github.com/dhanji/sitebricks) - Sitebricks is a web applications library built on top of Guice. It
    makes life easy for Java developers providing something akin to the simplicity of Rails or
    Django yet with the rigor and type safety of Java. Some of the ideas in JAX-RS mirror
    those found in Sitebricks. It is a work-in-progress.
  * [Google Wave](http://wave.google.com) - In my nearly two years at this project, I helped design and build the
    Realtime search and indexing architecture, many aspects of the GWT-based user interface,
    the Data and Wave embedding APIs and also spent a lot of time on scalability and
    performance. I intend to make a series of posts describing my experiences with Wave,
    Google and working on large, disruptive projects in general. So stay tuned!
  * [Guice](http://code.google.com/p/google-guice) - I was the official maintainer of Guice for a
    long time along with Jesse Wilson. I created the Guice Servlet and Persist extensions that are
    widely in use at many startups and websites. Nearly every Java program at Google uses these
    technologies.
  * [MVEL](http://mvel.codehaus.org) - I helped write the static typing layer for this fast,
    wonderful little expression language from my dear friend [Mike Brock](http://twitter.com/brockm).
     I remain a devoted fan.
  * [Maven Atom](https://github.com/sonatype/polyglot-maven/tree/master/pmaven-atom) - An experiment
   to create a concise and elegant alternative grammar for Maven. Part of the
    [Polyglot Maven](http://polyglot.sonatype.org/) project. Here is an example:
<pre>   repositories << "http://repository.codehaus.org",
                     "http://repo1.maven.org/maven2"
    project "Google Guice" @ "http://code.google.com/p/google-guice"
       id: com.google.inject:guice:4.0
       srcs: [ src: "src" test: "test" ]
       deps: [ junit:junit:3.8.1 ]
       scm:  [ url: "url:git:git@github.com:mikebrock/mvel.git" ]</pre>
  * I have also represented Google on the JAX-RS, JSR-303 (Bean Validation) and Servlet expert
    groups. They have since withdrawn from these efforts.

After Wave, I also worked on a few secret projects at Google. One of these was released as the
[smart content discovery](http://googleblog.blogspot.com/2011/03/whats-new-with-blogger.html)
feature that was launched inside Blogger at SXSW 2010.

I frequently collaborate with [The Man In Blue](http://themaninblue.com) whom I consider without
hyperbole to be the world's finest user experience designer, bar none.

In addition, I have a number of side projects I am always working on. As they mature I will post
about them on this website.
