describe('TinyStore', function(){

  var localStore, sessionStore, objStore;
  var key = 'tinystorespec';
  var obj = {};

  describe('#constructor', function(){
    it('should return instance of TinyStore', function(){
      localStore = new TinyStore(key);
      sessionStore = new TinyStore(key, sessionStorage);
      objStore = new TinyStore(key, obj);

      assert.instanceOf(localStore, TinyStore);
      assert.instanceOf(sessionStore, TinyStore);
      assert.instanceOf(objStore, TinyStore);
    });

    it('should not create a new item in localStorage until something is set', function(){
      expect(JSON.parse(localStorage.getItem(key))).to.be.null;
      localStore.set('hello', 'world');
      expect(JSON.parse(localStorage.getItem(key))).to.deep.equal({ 'hello': 'world' });
    });

    it('should not create a new item in sessionStorage until something is set', function(){
      expect(JSON.parse(sessionStorage.getItem(key))).to.be.null;
      sessionStore.set('hello', 'world');
      expect(JSON.parse(sessionStorage.getItem(key))).to.deep.equal({ 'hello': 'world' });
    });

    it('should not create a new item in plain object until something is set', function(){
      expect(obj[key]).to.be.undefined;
      objStore.set('hello', 'world');
      expect(JSON.parse(obj[key])).to.deep.equal({ 'hello': 'world' });
    });
  });

  describe('#enabled', function(){
    it('should return true if localStorage is available', function(){
      assert.isTrue('localStorage' in window && window.localStorage !== null);
      assert.isTrue(localStore.enabled);
    });

    it('should return true if sessionStorage is available', function(){
      assert.isTrue('sessionStorage' in window && window.sessionStorage !== null);
      assert.isTrue(sessionStore.enabled);
    });
  });

  describe('#set', function(){
    it('should return value when setting a key (string)', function(){
      assert.strictEqual(localStore.set('saturday', 'karaoke'), 'karaoke');
      assert.strictEqual(sessionStore.set('saturday', 'karaoke'), 'karaoke');
      assert.strictEqual(objStore.set('saturday', 'karaoke'), 'karaoke');
    });

    it('should return value when setting a key (array)', function(){
      assert.sameMembers(localStore.set('sunday', ['hangover', 'NaptimePDX']), ['hangover', 'NaptimePDX']);
      assert.sameMembers(sessionStore.set('sunday', ['hangover', 'NaptimePDX']), ['hangover', 'NaptimePDX']);
      assert.sameMembers(objStore.set('sunday', ['hangover', 'NaptimePDX']), ['hangover', 'NaptimePDX']);
    });

    it('should return value when setting a key (object)', function(){
      assert.propertyVal(localStore.set('monday', {'work': 'coding'}), 'work', 'coding');
      assert.propertyVal(sessionStore.set('monday', {'work': 'coding'}), 'work', 'coding');
      assert.propertyVal(objStore.set('monday', {'work': 'coding'}), 'work', 'coding');
    });

    it('should return value when setting a key (number)', function(){
      assert.strictEqual(localStore.set('tuesday', 42), 42);
      assert.strictEqual(sessionStore.set('tuesday', 42), 42);
      assert.strictEqual(objStore.set('tuesday', 42), 42);
    });
  });

  describe('#get', function(){
    it('should return undefined for a non-existent key', function(){
      assert.isUndefined(localStore.get('wednesday'));
      assert.isUndefined(sessionStore.get('wednesday'));
      assert.isUndefined(objStore.get('wednesday'));
    });

    it('should return correct value when getting a previously set key (string)', function(){
      assert.strictEqual(localStore.get('saturday'), 'karaoke');
      assert.strictEqual(sessionStore.get('saturday'), 'karaoke');
      assert.strictEqual(objStore.get('saturday'), 'karaoke');
    });

    it('should return correct value when getting a previously set key (array)', function(){
      assert.sameMembers(localStore.get('sunday'), ['hangover', 'NaptimePDX']);
      assert.sameMembers(sessionStore.get('sunday'), ['hangover', 'NaptimePDX']);
      assert.sameMembers(objStore.get('sunday'), ['hangover', 'NaptimePDX']);
    });

    it('should return correct value when getting a previously set key (object)', function(){
      assert.propertyVal(localStore.get('monday'), 'work', 'coding');
      assert.propertyVal(sessionStore.get('monday'), 'work', 'coding');
      assert.propertyVal(objStore.get('monday'), 'work', 'coding');
    });

    it('should return correct value when getting a previously set key (number)', function(){
      assert.strictEqual(localStore.get('tuesday'), 42);
      assert.strictEqual(sessionStore.get('tuesday'), 42);
      assert.strictEqual(objStore.get('tuesday'), 42);
    });
  });

  describe('#save', function(){
    it('should persist session object to localStorage', function(){
      localStore.session.doge = 'sweater vests';
      localStore.save();
      assert.propertyVal(JSON.parse(localStorage.getItem(key)), 'doge', 'sweater vests');
    });

    it('should persist session object to sessionStorage', function(){
      sessionStore.session.doge = 'sweater vests';
      sessionStore.save();
      assert.propertyVal(JSON.parse(sessionStorage.getItem(key)), 'doge', 'sweater vests');
    });

    it('should persist session object to plain object', function(){
      objStore.session.doge = 'sweater vests';
      objStore.save();
      assert.propertyVal(JSON.parse(obj[key]), 'doge', 'sweater vests');
    });
  });

  describe('#remove', function(){
    it('should return the value of a removed key', function(){
      assert.strictEqual(localStore.remove('doge'), 'sweater vests');
      assert.strictEqual(sessionStore.remove('doge'), 'sweater vests');
      assert.strictEqual(objStore.remove('doge'), 'sweater vests');
    });

    it('should remove a key/value pair from session object and localStorage', function(){
      assert.notProperty(localStore.session, 'doge');
      assert.notProperty(JSON.parse(localStorage.getItem(key)), 'doge');
    });

    it('should remove a key/value pair from session object and sessionStorage', function(){
      assert.notProperty(sessionStore.session, 'doge');
      assert.notProperty(JSON.parse(sessionStorage.getItem(key)), 'doge');
    });

    it('should remove a key/value pair from session object and plain object', function(){
      assert.notProperty(objStore.session, 'doge');
      assert.notProperty(JSON.parse(obj[key]), 'doge');
    });
  });

  describe('#clear', function(){
    it('should reset the session object', function(){
      localStore.clear();
      sessionStore.clear();
      objStore.clear();
      expect(localStore.session).to.deep.equal({});
      expect(sessionStore.session).to.deep.equal({});
      expect(objStore.session).to.deep.equal({});
    });

    it('should remove the item from localStorage', function(){
      expect(JSON.parse(localStorage.getItem(key))).to.be.null;
    });

    it('should remove the item from sessionStorage', function(){
      expect(JSON.parse(sessionStorage.getItem(key))).to.be.null;
    });

    it('should remove the item from plain object', function(){
      expect(obj[key]).to.be.undefined;
    });
  });
});
