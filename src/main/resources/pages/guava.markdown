<meta published="12 Mar 2012"/>

# Google Guava, Guice and other Fresh Fruit

This post by my former colleague, Kevin Bourrillion, has caused a bit of a stir amongst the Java faithful.

[https://plus.google.com/113026104107031516488/posts/ZRdtjTL1MpM](https://plus.google.com/113026104107031516488/posts/ZRdtjTL1MpM)

It's not really fair to blame everything in the comments threads on the original post, but it takes a special kind of audacity to suggest that it is harder to accept patches to Guava (a nice, elegant, but not all that significant library) than the the Linux Kernel:

<blockquote>
"Sam Berlin - Disclaimer: I don't know what patches to the Linux Kernel are typically like, nor PCGen. But, +Martijn Verburg, there's a pretty big difference between submitting a patch to a library and submitting a patch to a "project". Patches to libraries are typically changes/additions/removals to the API, whereas patches to 'projects' are typically changes to the internals. It's a whole lot easier to change the internals of something than it is to change the API. Changing the API means the effects can bubble outwards. Changing the internals is usually just optimizations or bug-fixes."
</blockquote>

I am quite fond of Sam as a friend, but I am aghast. This is the Linux Kernel we're talking about here. _The. Linux. Kernel._ If anything has a bubble-out impact, it is this. Short of the silicon diode micro-architecture, it is the most fundamental part of the stack of modern computing.

More than that it is the single most poignant example of an open source project that accepts thousands of contributions simultaneously, processes, curates and applies them to the most impactful 5 megabytes[1] in the entire technology world.

Also, the Kernel is an API. It is the most fundamental of APIs. It is how you call into the physical hardware using the abstractions of device drivers, system calls and threads. It is harder to accept patches into the least significant part of the Linux Kernel on its least active day than it will ever be for Guava.

<blockquote>
"Kevin Bourrillion - Be honest: if you were going to sign yourself up for doing all that work above... wouldn't you at least want to have the pleasure of writing the code for it yourself? I love writing code -- that's why I do this! -- but such a large majority of my time goes into activities like those described above. If my job were all about just applying other people's patches, I would inevitably start hating it after a while. Let me have some fun sometimes, okay? :-)"
</blockquote>

This is a nice sentiment. I like Kevin, so I am going to smile back. =) There you go. But let's be honest--it is hyperbolic and a reductio ad absurdum. "all about just applying other people's patches" is nowhere near the stance he has taken. Every open source project needs a strong, principled leader with a solid vision for its future. A lot of the time this means saying no to things--and that's exactly what a benevolent dictator is there for. But even Saddam Hussein pretended to hold elections every now and then for the illusion of legitimacy.

(Given that Kevin and I are friends, I will assume he smiled when reading this too)

I understand the difficulty of developing a two-headed beast like Guava. A certain portion of it is buried under the mammoth structure that is the Google code base. A certain portion of it is being dragged forward by the open source community of external users. The latter group has very little conception of the size, scale and complexity of the former task. And keeping the two in sync is a nightmarish proposition. I don't envy anyone the task. If there are Java engineers talented, experienced and thoughtful enough to do it anywhere in the world--then those people are Kevin and his team.

In my time I worked on several open source projects at Google--they used vastly different models that often depended on the attitudes of the developers in charge. Google Wave for example, treated open source as a second class citizen, a marketing gimmick and a once-made promise to be kept, time allowing. Guava seems to be bleeding those same colors.

My point though--is why bother? Discard all this confounding complexity and bureaucratic weight. Commit to the open source principle. They've slapped an Apache license on it for some reason. Part of that reason is developer advocacy, part of it is hiring (yes, open source projects are a huge hiring funnel for talented Googlers), and another part is the true joy that comes with seeing your work benefit others. For free, for them to do with as they please.

One of Kevin's own other projects--Guice--did the opposite to great effect. It is used internally at the bottom of every stack, but the pain is nowhere near as bad as maintaining Guava (at least it wasn't when I maintained it). Partly this was because its surface area is smaller, but mostly it was because patches happened in the open. And the open repo was the sole source of truth. It wasn't ideal, we rejected many more patches than I'd have liked. No one maintained Guice full time, we all had to volunteer nights and weekends to accept those patches. There was no dedicated team, and no management budget. And yet we didn't rule out accepting patches from non-Googlers. In fact, we encouraged them.

In the end developing in the open and feeding the patches back to Google was the right call. It accorded with the spirit of open source.

<blockquote>
"Kevin Bourrillion - Well, there is the fact that we take all of our source code, put it out where you can have it, with an Apache2 license on it giving you leeway to do almost whatever you want with it. If that's not enough to be called "open source", I don't mind if people want to say that Guava is not open source."
</blockquote>

So take up that mantra, and let it be what it wants to be. Engage with the community and let them embrace you--that doesn't mean you have to accept all their patches. It doesn't even mean accept 10% of them. Not even 1%. It means, be open to considering them. Treat them like peers, like people who have real problems and real solutions too. Because believe it or not there are talented people working everywhere and their worth in testing, debugging and contributing changes is incalculable. Their code will often surprise you, pleasantly. And it is worth it.


[1] <pre><code>-rw-r--r-- 1 root root 5089792 Oct 25 00:48 /boot/vmlinuz</code></pre>

<br>

<div style="font-size: small;">Find me on <a href="http://twitter.com/dhanji">twitter</a></div>
