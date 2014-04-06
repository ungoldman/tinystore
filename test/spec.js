describe('TinyStore', function(){

  var localStore, sessionStore, objectStore;
  var key = 'tinystorespec';
  var obj = {};
  var fn = function () {};

  describe('#constructor', function(){
    it('should return instance of TinyStore', function(){
      localStore = new TinyStore(key + 'local');
      sessionStore = new TinyStore(key + 'session', sessionStorage);
      objectStore = new TinyStore(key + 'object', obj);
      functionStore = new TinyStore(key + 'function', fn);

      assert.instanceOf(localStore, TinyStore);
      assert.instanceOf(sessionStore, TinyStore);
      assert.instanceOf(objectStore, TinyStore);
      assert.instanceOf(functionStore, TinyStore);
    });

    it('should not be enabled with an invalid store', function(){
      var invalidStore = new TinyStore(key + 'invalid', false);
      assert.isTrue(!invalidStore.enabled);
    });

    it('should not create a new item in localStorage until something is set', function(){
      expect(JSON.parse(localStorage.getItem(key + 'local'))).to.be.null;
      localStore.set('hello', 'world');
      expect(JSON.parse(localStorage.getItem(key + 'local'))).to.deep.equal({ 'hello': 'world' });
    });

    it('should not create a new item in sessionStorage until something is set', function(){
      expect(JSON.parse(sessionStorage.getItem(key + 'session'))).to.be.null;
      sessionStore.set('hello', 'world');
      expect(JSON.parse(sessionStorage.getItem(key + 'session'))).to.deep.equal({ 'hello': 'world' });
    });

    it('should not create a new item in plain object until something is set', function(){
      expect(obj[key + 'object']).to.be.undefined;
      objectStore.set('hello', 'world');
      expect(JSON.parse(obj[key + 'object'])).to.deep.equal({ 'hello': 'world' });
    });

    it('should not create a new item in function until something is set', function(){
      expect(fn[key + 'function']).to.be.undefined;
      functionStore.set('hello', 'world');
      expect(JSON.parse(fn[key + 'function'])).to.deep.equal({ 'hello': 'world' });
    });
  });

  describe('#enabled', function(){
    it('should return true if store is localStorage', function(){
      assert.isTrue('localStorage' in window && window.localStorage !== null);
      assert.isTrue(localStore.enabled);
    });

    it('should return true if store is sessionStorage', function(){
      assert.isTrue('sessionStorage' in window && window.sessionStorage !== null);
      assert.isTrue(sessionStore.enabled);
    });

    it('should return true if store is object', function(){
      assert.isTrue(typeof objectStore.store === 'object');
      assert.isTrue(objectStore.enabled);
    });

    it('should return true if store is function', function(){
      assert.isTrue(typeof functionStore.store === 'function');
      assert.isTrue(functionStore.enabled);
    });
  });

  describe('#set', function(){
    it('should return value when setting a key (string)', function(){
      assert.strictEqual(localStore.set('saturday', 'karaoke'), 'karaoke');
      assert.strictEqual(sessionStore.set('saturday', 'karaoke'), 'karaoke');
      assert.strictEqual(objectStore.set('saturday', 'karaoke'), 'karaoke');
      assert.strictEqual(functionStore.set('saturday', 'karaoke'), 'karaoke');
    });

    it('should return value when setting a key (array)', function(){
      assert.sameMembers(localStore.set('sunday', ['hangover', 'NaptimePDX']), ['hangover', 'NaptimePDX']);
      assert.sameMembers(sessionStore.set('sunday', ['hangover', 'NaptimePDX']), ['hangover', 'NaptimePDX']);
      assert.sameMembers(objectStore.set('sunday', ['hangover', 'NaptimePDX']), ['hangover', 'NaptimePDX']);
      assert.sameMembers(functionStore.set('sunday', ['hangover', 'NaptimePDX']), ['hangover', 'NaptimePDX']);
    });

    it('should return value when setting a key (object)', function(){
      assert.propertyVal(localStore.set('monday', {'work': 'coding'}), 'work', 'coding');
      assert.propertyVal(sessionStore.set('monday', {'work': 'coding'}), 'work', 'coding');
      assert.propertyVal(objectStore.set('monday', {'work': 'coding'}), 'work', 'coding');
      assert.propertyVal(functionStore.set('monday', {'work': 'coding'}), 'work', 'coding');
    });

    it('should return value when setting a key (number)', function(){
      assert.strictEqual(localStore.set('tuesday', 42), 42);
      assert.strictEqual(sessionStore.set('tuesday', 42), 42);
      assert.strictEqual(objectStore.set('tuesday', 42), 42);
      assert.strictEqual(functionStore.set('tuesday', 42), 42);
    });
  });

  describe('#get', function(){
    it('should return undefined for a non-existent key', function(){
      assert.isUndefined(localStore.get('wednesday'));
      assert.isUndefined(sessionStore.get('wednesday'));
      assert.isUndefined(objectStore.get('wednesday'));
      assert.isUndefined(functionStore.get('wednesday'));
    });

    it('should return correct value when getting a previously set key (string)', function(){
      assert.strictEqual(localStore.get('saturday'), 'karaoke');
      assert.strictEqual(sessionStore.get('saturday'), 'karaoke');
      assert.strictEqual(objectStore.get('saturday'), 'karaoke');
      assert.strictEqual(functionStore.get('saturday'), 'karaoke');
    });

    it('should return correct value when getting a previously set key (array)', function(){
      assert.sameMembers(localStore.get('sunday'), ['hangover', 'NaptimePDX']);
      assert.sameMembers(sessionStore.get('sunday'), ['hangover', 'NaptimePDX']);
      assert.sameMembers(objectStore.get('sunday'), ['hangover', 'NaptimePDX']);
      assert.sameMembers(functionStore.get('sunday'), ['hangover', 'NaptimePDX']);
    });

    it('should return correct value when getting a previously set key (object)', function(){
      assert.propertyVal(localStore.get('monday'), 'work', 'coding');
      assert.propertyVal(sessionStore.get('monday'), 'work', 'coding');
      assert.propertyVal(objectStore.get('monday'), 'work', 'coding');
      assert.propertyVal(functionStore.get('monday'), 'work', 'coding');
    });

    it('should return correct value when getting a previously set key (number)', function(){
      assert.strictEqual(localStore.get('tuesday'), 42);
      assert.strictEqual(sessionStore.get('tuesday'), 42);
      assert.strictEqual(objectStore.get('tuesday'), 42);
      assert.strictEqual(functionStore.get('tuesday'), 42);
    });
  });

  describe('#save', function(){
    it('should persist session object to localStorage', function(){
      localStore.session.doge = 'sweater vests';
      localStore.save();
      assert.propertyVal(JSON.parse(localStorage.getItem(key + 'local')), 'doge', 'sweater vests');
    });

    it('should persist session object to sessionStorage', function(){
      sessionStore.session.doge = 'sweater vests';
      sessionStore.save();
      assert.propertyVal(JSON.parse(sessionStorage.getItem(key + 'session')), 'doge', 'sweater vests');
    });

    it('should persist session object to plain object', function(){
      objectStore.session.doge = 'sweater vests';
      objectStore.save();
      assert.propertyVal(JSON.parse(obj[key + 'object']), 'doge', 'sweater vests');
    });

    it('should persist session object to function', function(){
      functionStore.session.doge = 'sweater vests';
      functionStore.save();
      assert.propertyVal(JSON.parse(fn[key + 'function']), 'doge', 'sweater vests');
    });
  });

  describe('#remove', function(){
    it('should return the value of a removed key', function(){
      assert.strictEqual(localStore.remove('doge'), 'sweater vests');
      assert.strictEqual(sessionStore.remove('doge'), 'sweater vests');
      assert.strictEqual(objectStore.remove('doge'), 'sweater vests');
      assert.strictEqual(functionStore.remove('doge'), 'sweater vests');
    });

    it('should remove a key/value pair from session object and localStorage', function(){
      assert.notProperty(localStore.session, 'doge');
      assert.notProperty(JSON.parse(localStorage.getItem(key + 'local')), 'doge');
    });

    it('should remove a key/value pair from session object and sessionStorage', function(){
      assert.notProperty(sessionStore.session, 'doge');
      assert.notProperty(JSON.parse(sessionStorage.getItem(key + 'session')), 'doge');
    });

    it('should remove a key/value pair from session object and plain object', function(){
      assert.notProperty(objectStore.session, 'doge');
      assert.notProperty(JSON.parse(obj[key + 'object']), 'doge');
    });

    it('should remove a key/value pair from session object and function', function(){
      assert.notProperty(functionStore.session, 'doge');
      assert.notProperty(JSON.parse(fn[key + 'function']), 'doge');
    });
  });

  describe('#clear', function(){
    it('should reset the session object', function(){
      localStore.clear();
      sessionStore.clear();
      objectStore.clear();
      functionStore.clear();
      expect(localStore.session).to.deep.equal({});
      expect(sessionStore.session).to.deep.equal({});
      expect(objectStore.session).to.deep.equal({});
      expect(functionStore.session).to.deep.equal({});
    });

    it('should remove the item from localStorage', function(){
      expect(JSON.parse(localStorage.getItem(key + 'local'))).to.be.null;
    });

    it('should remove the item from sessionStorage', function(){
      expect(JSON.parse(sessionStorage.getItem(key + 'session'))).to.be.null;
    });

    it('should remove the item from plain object', function(){
      expect(obj[key + 'object']).to.be.undefined;
    });

    it('should remove the item from function', function(){
      expect(fn[key + 'function']).to.be.undefined;
    });
  });
});
