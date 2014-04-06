# TinyStore

A tiny web storage wrapper (< 1k minified). Works with localStorage, sessionStorage, objects, and functions.

Useful for interacting with a persistent namespaced object store within localStorage or sessionStorage without messing with anything else that might be there (like on *.github.io).

Similar in style to [store.js](https://github.com/marcuswestin/store.js/) but for a slightly different use case (and far less ambitious).

## API

### `new TinyStore(name, optionalStore)`

The constructor takes a string as a name for the object to store in localStorage.

```js
var store = new TinyStore('memories')
```

Optionally, an alternative storage mechanism can be specified. localStorage, sessionStorage, objects, and functions are supported (default is localStorage).

```js
var localStore = new TinyStore('local', localStorage)
var sessionStore = new TinyStore('session', sessionStorage)

var obj = {}
var objStore = new TinyStore('obj', obj)
```

### `.enabled`

`.enabled` is a boolean flag to show if the specified store is available or not.

```js
store.enabled
// -> true (you've got localStorage/sessionStorage/an object/a function!)
// -> false (something went horribly wrong!)
```

### `.set(key, value)`

`.set()` takes a key and a value and saves the pair to storage. The key should be a string, and the value can be any standard javascript thing (string, number, array, object).

```js
store.set('saturday', 'karaoke')
// -> "karaoke"

store.set('sunday', ['hangover', 'NaptimePDX'])
// -> ["hangover", "NaptimePDX"]

store.set('monday', { 'work': ['meetings', 'coding'] })
// -> { "work": ["meetings", "coding"] }
```

### `.get(key)`

`.get()` takes a key string and returns the value if it exists.

```js
store.get('saturday')
// -> "karaoke"

store.get('friday')
// -> undefined
```

### `.session`

`.session` is a plain old object. It's what gets parsed out of storage and stringified back in.

```js
store.session
// -> { "saturday": "karaoke", "sunday": ["hangover", "NaptimePDX"], "monday": { "work": ["meetings", "coding"] } }

// you can manipulate the session object directly if that's your jam
// keep in mind you'll have to manually `.save()` afterwards when you do this
store.session.whatever = { 'doge': 'sweater vests' }
```

### `.save()`

`.save()` will persist the `session` object (`.set()` does this automatically).

```js
store.save()
// -> { "saturday": "karaoke", "sunday": ["hangover", "NaptimePDX"], "monday": { "work": ["meetings", "coding"] }, "whatever": { "doge": "sweater vests" } }
```

### `.remove(key)`

`.remove()` will remove the given key from the `.session` object and save the change to storage. It will also return the key's value in case you want to do something fancy.

```js
store.remove('whatever')
// -> { 'doge': 'sweater vests' }
```

### `.clear()`

`.clear()` will remove the item from storage, if enabled, and reset the session object.

```js
store.clear()
// -> {}
```

## Tests

```bash
npm install
npm test
```

## Minification

```bash
npm install
npm run minify
```

## License

ISC
