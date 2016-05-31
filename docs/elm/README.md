# For Elm developers

It is no secret Act is hugely inspired by Elm. Therefore, Act will [I hope] feel
sort of natural to anyone with some Elm experience.

The main way Act departs from Elm, and also its main advantage, is that it is
written in JavaScript (actually, es2015/es6). Also its main disadvantage is
that it is written in JavaScript :cry:.

- Being written in JavaScript allows Act to play nicer with other JavaScript
  libraries and it also appeals to a bigger number of developers than any Haskell
  inspired language. Also, given its simplicity Act will very likely generate
  much smaller builds than most frameworks out there.

- Being written in JavaScript makes almost impossible for Act – and any
  JavaScript framework out there – to throw elegant error messages in compile
  time, and the lack of type system forces us to use strings for message types
  (like in Redux) and this makes composition of components a little too shabby.
  Also, even though I stated Act plays nicer with other JavaScript libraries,
  when Elm implements any of these libraries it will invariably add a layer of
  safety to them, and that's another unfortunate miss.

Here's a selection of things in which Act departs from Elm:

* [update vs reducer](/update-vs-reducer.md)
* [Html helpers vs JSON](/html-helpers-vs-json.md)
* [Actions](/actions.md)
* [History](/history.md)
