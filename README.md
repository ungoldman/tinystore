# TinyStore

A tiny localStorage wrapper.

Useful for interacting with a persistent namespaced object store within localStorage without messing with anything else that might be there (like on *.github.io).

## API

```js
var store = new TinyStore('memories')

store.enabled
// -> true (you've got localStorage!)

store.get('saturday')
// -> undefined

store.set('saturday', 'karaoke')
// -> 'karaoke'

store.set('sunday', ['hangover', 'NaptimePDX'])
// -> ["hangover", "NaptimePDX"]

store.set('monday', { 'work': ['meetings', 'coding'] })
// -> { "work": ["meetings", "coding"] }

store.session
// -> { "saturday": "karaoke", "sunday": ["hangover", "NaptimePDX"], "monday": { "work": ["meetings", "coding"] } }

// you can manipulate the session object directly if that's your jam
store.session.whatever = { 'doge': 'sweater vests' }

// save will persist the `session` object (`set` does this automatically)
store.save()
// -> { "saturday": "karaoke", "sunday": ["hangover", "NaptimePDX"], "monday": { "work": ["meetings", "coding"] }, "whatever": { "doge": "sweater vests" } }

store.remove('whatever')
// -> { "saturday": "karaoke", "sunday": ["hangover", "NaptimePDX"], "monday": { "work": ["meetings", "coding"] } }

store.clear()
// -> {}
```

## Tests (in progress)

```bash
npm install
npm install -g karma
karma start test/karma.conf
```
