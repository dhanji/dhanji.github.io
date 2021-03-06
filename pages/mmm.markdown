<meta published="12 Oct 2011"/>
<meta tag="wave"/>
<meta tag="personal"/>

# The Mythical Man-Month

I vividly recall my first week at Google. It was in Google's old office in Sydney, high up on the
18th floor of a triangular skyscraper. The views from virtually everywhere in the office were
breathtaking. And inside, the walls beamed the warm glow of those wonderful colors so familiar
from a childhood playing with Lego--Yellow, Red, Blue and Green.

I spent the first week imbibing everything a Noogler is given--tutorials, catered food, instructions
on how to work the coffee machine, and the general lay of the land. One part of this was project
selection--deciding what I was going to work on. This came in the form of a two-on-one meeting
with Lars & Jens Rasmussen, the famed creators of Google Maps. They were working on a new, secret
project codenamed [*Walkabout*](http://googleblog.blogspot.com/2009/05/went-walkabout-brought-back-google-wave.html).
Everyone in the office was bursting with curiosity (only a handful of engineers actually knew what
it was).

The pitch went something like this: Walkabout was a "startup inside a startup", it was an attempt
to remake Google's nimble, big-thinking, cultural roots in an isolated microcosm in Australia. We
worked in secret--even from other Sydney Googlers--had our own higher risk/reward bonus scheme, and
a reporting chain that bypassed the Sydney Site Director and layers of bureaucracy, directly
to the Decision Makers in Mountain View.

Of course, I said yes.

### Early Days

My colleague and I joined on the same day and were employees #25 & #26 of Walkabout.
As we walked out of the meeting room I asked if we would be the last, thinking this was a sizeable
number for any startup let alone an early-stage one. I was met with a somewhat incredulous
"No, no. Not at all!" That was a red flag I ignored wilfully.

Fast-forward
six months and Google was in a lavish, new office with Walkabout fully underway and around 35 strong.
The trouble, I am sure, began a lot earlier but this is when I started to really feel it. First,
there was the dreaded endless meeting--they lasted for hours with very little being decided. Then,
you started having to push people to provide APIs or code changes that you desperately needed for
your feature but that they had little to no interest in beyond the academic.

My style is to ask politely and then when I realize nothing is going to be done, to do it myself.
This is a prized hacker ethic, but it does NOT work in large teams. There is simply too much system
complexity for this to scale as a solution. Instead of shaving one Yak, you're shaving the entire
Yak pen at the Zoo, and pretty soon traveling to Tibet to shave foreign Yaks you've never
seen before and whose barbering you know little about.

What happened with me was that my pride made me take on all this and I ended up simply failing at it.
It is irreconcilably demoralizing to think that you can complete a feature in 2 weeks and find yourself
three months in, stuck at work at 3am and neck deep in mounting backlog work.

I'll admit I considered resigning, defeated.

### On Agility

Some of you are reading this and thinking "if only they used an Agile process like Scrum!" Or, "if only
you or someone had prior experience with an Agile team." Well, the sentiment is right but also entirely
naive. Before Google, I worked at a company called ThoughtWorks. They are a religiously Agile shop
and whose Chief Scientist is Martin Fowler, one of the original signatories of the Agile manifesto.
So I knew a thing or two about Agile going in. As did [several of my colleagues](http://jutopia.tirsen.com/about.html).
Furthermore, this was a team with
plenty of very senior ex-Search Quality, Gmail, Maps and Infrastructure people.

To say we should have been better prepared or organized is to miss the point--large teams starting
on a new project are *inherently dysfunctional*. One common consequence of all this chaos is
that experienced engineers seclude themselves to their area of expertise. At a company like Google,
this generally means infrastructure or backend architecture. A major externality of this is that
fresh grads, and junior engineers are shunted to the UI layer. I have seen this happen time and again
in a number of organizations, and it is a critical, unrecognized problem.

__*UI is hard.*__

You need the same mix of experienced talent working in the UI as you do with traditional
"serious" stuff. This is where Apple is simply ahead of everyone else--taking design seriously is
not about having a dictator fuss over seams and pixels. It's about giving it the same
consideration that you give any other critical part of the system.

Now, I don't mean to imply that Wave did not have some very smart engineers working on the UI, we
certainly did. But talent is different from experience. The latter is a guard against 3.5MB of
compressed, minified, inlined Javascript. Against 6 minute compiles to see CSS changes in browser.
Against giving up on IE support (at the time, over 60% of browser market share) because it was
simply too difficult. Against Safari running out of memory as soon as Wave was opened on an iPad.

At the end we were close to 60 engineers, with nearly 20 working on the browser client alone.

### Wins and Losses

Looking back, there was one vivid, crystallizing moment where I decided not to resign and stick it out
instead. It came
a little after we launched to consumers. At the time, we were at the very peak of the hype curve,
invites were flooding user mailboxes and the servers were melting under load. Not even Google's
mammoth datacenter power could stem this tide (the problem was with the software, not machine
strength). The Java VMs could not handle the load, they were running out of memory, crashing or
spending more time paused for garbage collection than serving.

Nobody on our team knew anything about JVM tuning. I knew only a tiny bit more than that. It took
a great deal of effort, many sleepless nights, and it put a lot of stress on my life outside work
but in the end we won. We tamed the load not by some magic salvo, but by degrees--measuring,
tuning, patching--incrementally. And each one of these increments was a small win. It felt good to
have a win, even a small one at that. I felt useful again.

And this is the essential broader point--as a programmer you must have a series of wins, every single
day. It is the Deus Ex Machina of hacker success. It is what makes you eager for the next feature,
and the next after that. And a large team is poison to small wins. The
nature of large teams is such that even when you do have wins, they come after long, tiresome
and disproportionately many hurdles. And this takes all the wind out of them. Often when I shipped a
feature it felt more like relief than euphoria.

### In Hindsight

Critical, drop-everything bugs become daily affairs, and the sense of confidence in the
 engineering strength of the structure begins to erode. This leads to low morale, burnout, and
less internal cooperation for fear of taking on too many bugs.

Of course I enjoyed my time on Wave like no other time in my career. It was equal parts frustration,
joy, defeat and passion. I don't regret a single moment of being associated with it. It remains a wonderful attempt
at creating something unique, exciting and incomparably bold. Nor do I want to ascribe blame to anyone
on the team or Google at large. I just want
to point that even the smartest, most motivated and talented people in the world--with a track record
of delivering success--are alone not sufficient to overcome complexity that creeps up on you. Maybe
we should have known better, but we didn't.

In the end, the man-month as a scalable unit of work is hubris worthy of a Greek tragedy.
