<meta published="27 Mar 2012"/>

# Programming Languages & Type Systems

In the late part of the 19th century, there was a furore. Well there were many furors really, Otto Von Bismarck was making threatening movements in Europe, India was on the verge of rebellion, Japan was descending into deep imperialist sentiment, the US was just recovering from several economic collapses. And in Britain, a young man names Bertrand Russell asked a very interesting question.

The result of this furor, was a great change in the way people viewed mathematics, in both its applied and theoretical domains. If you have spent any time at all on the Computing or Mathematics sections of Wikipedia you have heard of this famous challenge known as Russell's Paradox. Prior to Russell, Set theory in mathematics (often referred to with the wonderful irony of hindsight as Naive Set Theory) had a deep and serious flaw.

It goes something like this: if you imagine sets to be any collection of unique objects, then it is possible to construct a set that contains itself. In notational form this might look like:

    b = [Some Object]
    a = { a, b }

In this case, a is a member of itself. This is not such an unusual construction, anyone who has implemented a binary tree can relate to this--a Node is usually a composition of two other Nodes (left- and right- child).

Now that we have this construction, we can logically infer that there exists a set that is NOT a member of itself:

    a = { }
    a = { b }
    a = { <anything but a> }
    etc.

In fact there exist infinitely many such sets. We have now established two special properties that we can describe generally as follows:

  * Sets that contain themselves
  * Sets that don't contain themselves

All sets that exhibit one or the other property can be put into a "common" set. In other words we can functionally describe these two properties as follows:

  * The set of all sets that contain themselves
  * The set of all sets that don't contain themselves

The paradox arises when you consider the second property. It is logically imperative for the master set of all sets that don't contain themselves, to contain itself. In other words, if we're counting sets that don't contain themselves then we must count the master set, but once we do it is no longer a set that doesn't contain itself. And this is an infinite logical loop. The kind that Captain Kirk has often used to good effect to shut down rogue artificial intelligences.

### A Theory of Types

Years later, Russell and Whitehead would publish Principia Mathematica, which among other things, proposed a solution to the paradox. Their solution was to introduce something known as the theory of types. This theory of theirs reorganized the system of set theory in terms of increasing hierarchies of different types. Each layer in the hierarchy was exclusively composed of types from the previous layer, avoiding the kind of loops that were the bane of set theory. (see [http://en.wikipedia.org/wiki/Type_theory](http://en.wikipedia.org/wiki/Type_theory))

This is, very loosely, the foundation of type theory and type systems that we see in modern programming languages today. Java, C#, Ruby, Haskell and programmers of many others such languages take the idea of types, properties and hierarchies for granted. But it is useful to know their origin.

It is also useful to know the distinction between the systems of types used in various programming languages. In heated debates between proponents of dynamic-typing and static-typing, one often encounters a few misconceptions about terminology and the nature of type systems. The primary among these is strong vs. weak typing--it may surprise you to learn that Java, Ruby, Python, Scheme and C# are all strongly typed languages. Strong typing is the idea that computations occur only between compatible types. For example, this expression in Java is illegal:

    // Given a method:
    public void increment(int i);

    // This call is illegal
    increment(24.0);

This is because the types int and double are incompatible. Java does not know how to correctly convert 24.0 into an integer for computation. This kind of expression is known as a mixed-type computation and is generally discouraged by best practice. The reason is that the system cannot convert between these types without losing some information in the process. Doubles in Java are stored in 64-bits. Ints are stored in 32-bits, so the conversion between them necessitates a loss of information.

You might argue that Java permits expressions of this form:

    3 + 24.0

However, this is a type-widening expression. The resulting type is actually a double, since the information in the integer can be preserved, this conversion is permissible. It is easy to see this distinction by attempting to assign the result to an int:

    int x = 3 + 24.0;

This is an illegal expression which won't compile. Similarly, we can try this in a dynamically typed language and see the same problem. In Python the following expression:

    "1" + 2

Results in an error:

_TypeError: cannot concatenate 'str' and 'int' objects_

This message is interesting, because it tells us that the mistake we've made is a TypeError, in other words, Python has no idea how to combine these types in a sensible fashion. Ruby reports a similar error. This is the effect of strong typing and as you can see, it exists in both statically (Java, C#) and dynamically typed (Ruby, Python, Scheme) languages.

In order to correctly process this computation we need to explicitly convert the types into a compatible form. In Python, the str() function explicitly converts integers to strings:

    "1" + str(2)  # returns '12'

Now this works as expected. Conversely, we can add two numbers by performing the following conversion:

    int("1") + 2   # returns 3

The subtlety here is that Python isn't really sure if the + operator should convert strings into ints, or vice versa. And instead of making a surprising choice, it leaves this situation up to the programmer to resolve--a good practice for strongly typed systems.

You may further argue that Java in fact permits this conversion:

    "1" + 2  // returns "12"

At first glance it does look like Java is doing something questionable. In fact, what you're really seeing here is operator overloading in action. Unlike Python and Ruby, Java treats all types as naturally string-representable. So the + operator implicitly calls .toString() on any given object. In this case, the integer is implicitly converted to a string. It's a debatable choice, but arguably it is reasonable to allow this kind of flexibility given that the rest of the type system is very rigorous.

For example, in Python, a function must always accept any type of object:

    def fun(arg):
      ...

In such conditions, it is better to be safe than sorry about type conversions, so Python chooses the TypeError route. On the other hand, Java sports compulsory type annotations, which constrain the given function to a very specific type:

    void fun(String arg) { .. }

In this case, it is arguably much safer to allow the mixed type conversion of arbitrary objects to strings, given that these objects are clearly type-constrained wherever they are declared.

Then again, most dynamically typed languages also assume that any object can be converted to a string form. So in a sense, this is a compromise for convenience.

### Weak Typing

Weak typing as you might guess, is the converse of strong typing. In a sense weak typing takes the compromise we just examined and pushes it as far as possible, prioritizing convenience over all else. JavaScript is a weakly typed language:

    "100" > 10 // returns true

JavaScript goes to great lengths to make the lives of programmers better by performing conversions like this. There are many, many such examples, where it attempts to coerce values into types appropriate for the expression in question. Here are some such examples:

    "Infinity" == Number.POSITIVE_INFINITY   // returns true
    "Infinity" == Number.POSITIVE_INFINIT   // returns false
    "Infinity" == Number.NONSENSE   // returns false
    0 == ""   // returns true


It is a dramatically different approach to strong typing, which provides a basic set of constraints to prevent programmers from shooting themselves in the foot. The nature of these automatic type conversions is such that they are very language specific. Each language makes its own decisions about exactly what will happen when ambivalently typed expressions are encountered. For example, this expression in JavaScript:

    100 + "1" + 0

...evaluates to the string "10010". In Visual Basic on the other hand, it would evaluate to the number 101. Both of these represent decisions to convert between types to make programmers' lives easier, but they also represent arbitrary decisions. There is no clear reason why one rule is preferable to the other. In this sense, strongly typed systems are more predictable and consistent.

### Conclusion

Strong and weak typing are choices that language designers make, depending on what they're optimizing for. Clearly, strongly typed languages like Ruby and Java are safer for teams of programmers where the impact of small mistakes is greatly magnified. Conversely, it may be useful for the kinds of conveniences that exist in JavaScript to be provided for quick, in-web browser development. However, I leave you with this curious feature of JavaScript:

    [[] + [] * 1][0] == "0"
    [[] + [] * 1][0][0] == "0"
    [[] + [] * 1][0][0][0] == "0"
    // and so on...

No matter how many times you pick the first value of the preceding expression, and the first of that, you always end up with the string "0". Not quite Russell's Paradox, but should leave you scratching your head nonetheless. =)

Tweet me your thoughts.

<br>

<div style="font-size: small;">Find me on <a href="http://twitter.com/dhanji">twitter</a></div>
