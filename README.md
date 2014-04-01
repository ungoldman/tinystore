# TinyStore

A tiny localStorage wrapper.

Useful for interacting with a persistent namespaced object store within localStorage without messing with anything else that might be there (like on *.github.io).

Similar in style to [store.js](https://github.com/marcuswestin/store.js/) but for a slightly different use case (and far less ambitious).

## API

### `new TinyStore(key)`

The constructor takes a string as a key for the object to store in localStorage.

```js
var store = new TinyStore('memories')
```

### `.enabled`

`.enabled` is a boolean flag to show if localStorage is available or not.

```js
store.enabled
// -> true (you've got localStorage!)
// -> false (this browser's no good!)
```

### `.set(key, value)`

`.set()` takes a key and a value and saves the pair to localStorage. The key should be a string, and the value can be any standard javascript thing (string, number, array, object).

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

`.session` is a plain old JS object. It's what gets parsed out of localStorage and stringified back in.

```js
store.session
// -> { "saturday": "karaoke", "sunday": ["hangover", "NaptimePDX"], "monday": { "work": ["meetings", "coding"] } }

// you can manipulate the session object directly if that's your jam
// keep in mind you'll have to manually `.save()` when you do this
store.session.whatever = { 'doge': 'sweater vests' }
```

### `.save()`

`.save()` will persist the `session` object (`.set()` does this automatically).

```js
store.save()
// -> { "saturday": "karaoke", "sunday": ["hangover", "NaptimePDX"], "monday": { "work": ["meetings", "coding"] }, "whatever": { "doge": "sweater vests" } }
```

### `.remove(key)`

`.remove()` will remove the key passed as a parameter from the `.session` object and save the change to localStorage. It will also return the value of the key you removed in case you want to do something fancy.

```js
store.remove('whatever')
// -> { 'doge': 'sweater vests' }
```

### `.clear()`

`.clear()` will reset the session object and remove the item from localStorage if localStorage is enabled.

```js
store.clear()
// -> {}
```

## Tests

```bash
npm install
npm test
```

## License

ISC
