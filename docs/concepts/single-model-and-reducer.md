## Single model & reducer

In Act you have a single data model and a single reducer. A data model is a
plain JavaScript value (object, array, string, number...).

When you nest components you can treat their individual models and reducers as
isolated, but the main component in your app will have to compose them to
create a single data object and a single reducer.

To understand it better I suggest reading Redux's
[three principles](http://redux.js.org/docs/introduction/ThreePrinciples.html),
since everything is stated there is also true for Act.
