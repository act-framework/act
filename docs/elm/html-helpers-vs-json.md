# Html helpers vs JSON

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
  ['div', [
    ['h1', model],
    ['button', {click: {increment: 1} , '+']
  ]]
```
