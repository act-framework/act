# For Elm developers

It's no secret Act is hugely inspired by Elm. Therefore, Act will [I hope] feel
sort of natural to anyone with some Elm experience.

The main way Act departs from Elm, and also it's main advantage, is that it's
written in JavaScript (actually, es2015/es6). Also it's main disadvantage is
that it's written in JavaScript :cry:.

- Being written in JavaScript allows Act to play nicer with other JavaScript
  libraries and it also appeals to a bigger number of developers than any Haskell
  inspired language. Also, given it's simplicity Act will very likely generate
  much smaller builds than most frameworks out there.

- Being written in JavasScript makes almost impossible for Act – and any
  JavaScript framework out there – to throw elegant error messages in compile
  time, and the lack of type system forces us to use strings for message types
  (like in Redux) and this makes composition of components a little too shabby.
  Also, even though I stated Act plays nicer with other JavaScript libraries,
  when Elm implements any of these libraries it will invariably add a layer of
  safety to them, and that's another unfortunate miss.

## Conceptual departures from Elm

### `update` vs `reducer`

Act uses the term `reducer` for the `update` function. Since React + Redux is
probably a more popular setup I think more developers will be used to this
terminology.

### DOM helpers vs JSON

In Elm you build your views (if you're rendering plain HTML) using some helpers
that you have to import. In Act you don't have to import anything, sice you
just return JSON.

##### Elm

```haskell
import Html exposing (Html, button, div, h1, text)

view : Model -> Html Msg
view model =
  div []
    [ h1 [] [ text (toString model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
```

##### Act

```js
const view = (model) =>
  ['div, [
    ['h1', model],
    ['button', {click: {increment: 1} , '+']
  ]]
```

### Actions

In Elm, when you want to make any kind of side effect, like an ajax call, you
[use the update/reducer](http://guide.elm-lang.org/architecture/effects/http.html).
In Act, we prefered to use actions, to separate it from the reducer, so it is
closer from Redux. This will make your history do not include any item that
triggers the request, only the responses.

##### Elm

```haskell
view : Model -> Html Msg
view model =
  div []
    [ h1 [] [ text (toString model.dieFace) ]
    , button [ onClick Roll ] [ text "Roll" ]
    ]

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Roll ->
      (model, Random.generate NewFace (Random.int 1 6))

    NewFace newFace ->
      (Model newFace, Cmd.none)
```

```js
const view = (model) =>
  ['div', [
    ['h1', model.dieFace],
    ['button', {click: roll}, 'Roll']
  ]]

// action doing some side effect
const roll = (update) =>
  update('newFace', parseInt(Math.random(5) * 6 + 1))

const reducer = (state, { type, payload }) =>
  type === 'newFace' ? { ...state, dieFace: payload } : state
```
