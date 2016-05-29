# Goals

#### Functional

The biggest problem of JavaScript is the lack of a consistent, productive
standard library. The second biggest problem is the ammount of libraries trying
to solve that by creating a bad implementation of a subset of Haskell's
Prelude.

Starting the right building blocks is the most important thing. Act chose Ramda,
and uses it extensively, from signals to view helpers.

#### Performatic and small

Web apps should be fast. Act's TodoMVC has only 13kb, and [performs better](https://github.com/joaomilho/todomvc-perf-comparison)
than most other frameworks.

#### Simple, but complete

Frameworks are either complete and complex, or simple and require you to figure
out how to complete them with other libraries. Act strives to be as simple and
as complete as possible.

#### Manageable history

In most other frameworks it requires some effort to accomplish things like
`redo`. In Act the action history is a first class citizen.

#### Simple errors

Errors should not reflect the framework inner workings, but display
the real cause of the problem.

#### Clear solutions to common problems

Although having options is not a problem per se, solutions should be clear for
most common problems. No analysis paralysis.

#### Testable

Most of our time is spent testing and tests are the best documentation of our
code. Testing should be straightforward and fast. Complex tests are bad docs
and a time waster.
