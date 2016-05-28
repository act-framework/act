# Goals

#### Performatic and small

Web apps should be fast. Act's TodoMVC has only 13kb, and [performs better](https://github.com/joaomilho/todomvc-perf-comparison)
than most other frameworks.

#### Simple, but complete

Frameworks are either complete and complex, or simple but require you to figure
out how to complete them with other libraries. Act strives to be as simple and
as complete as possible.

#### Functional

Act uses many tools and techniques from the functional world. The library relies
extensively on [Ramda](http://ramdajs.com/). Views are just functions. Actions
are dealt with signals.

#### Manageable history

In most other frameworks it requires some effort to accomplish things like
`redo`. In Act the action history is a first class citizen.

#### Simple errors

Errors should not reflect the framework inner workings, but strive to display
the real cause of the problem.

#### Clear solutions to common problems

Although having options is not a problem per se, solutions should be clear for
most common problems. No analysis paralysis.

#### Testable

Most of our time is spent testing and tests are the best documentation of our
code. Testing should be straightforward and fast. Complex tests are bad docs
and a time waster.
