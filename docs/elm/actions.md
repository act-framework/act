# Actions

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

##### Act

```js
const view = (model) =>
  ['div', [
    ['h1', model.dieFace],
    ['button', {click: roll}, 'Roll']
  ]]

// action doing some side effect
const roll = (history) =>
  history.push({ type: 'newFace', payload: parseInt(Math.random() * 6 + 1) })

const reducer = (state, { type, payload }) =>
  type === 'newFace' ? { ...state, dieFace: payload } : state
```
