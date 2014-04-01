describe('TinyStore', function(){

  var key = 'tinystorespec';
  var store;

  describe('#constructor', function(){
    it('should return instance of TinyStore', function(){
      store = new TinyStore(key);
      assert.instanceOf(store, TinyStore);
    });

    it('should not create a new item in localStorage until something is set', function(){
      expect(JSON.parse(localStorage.getItem(key))).to.be.null;
      store.set('hello', 'world');
      expect(JSON.parse(localStorage.getItem(key))).to.deep.equal({ 'hello': 'world' });
    });
  });

  describe('#enabled', function(){
    it('should return true if localStorage is available', function(){
      assert.isTrue('localStorage' in window && window.localStorage !== null);
      assert.isTrue(store.enabled);
    });
  });

  describe('#set', function(){
    it('should return value when setting a key (string)', function(){
      assert.strictEqual(store.set('saturday', 'karaoke'), 'karaoke');
    });

    it('should return value when setting a key (array)', function(){
      assert.sameMembers(store.set('sunday', ['hangover', 'NaptimePDX']), ['hangover', 'NaptimePDX']);
    });

    it('should return value when setting a key (object)', function(){
      assert.propertyVal(store.set('monday', {'work': 'coding'}), 'work', 'coding');
    });

    it('should return value when setting a key (number)', function(){
      assert.strictEqual(store.set('tuesday', 42), 42);
    });
  });

  describe('#get', function(){
    it('should return undefined for a non-existent key', function(){
      assert.isUndefined(store.get('wednesday'));
    });

    it('should return correct value when getting a previously set key (string)', function(){
      assert.strictEqual(store.get('saturday'), 'karaoke');
    });

    it('should return correct value when getting a previously set key (array)', function(){
      assert.sameMembers(store.get('sunday'), ['hangover', 'NaptimePDX']);
    });

    it('should return correct value when getting a previously set key (object)', function(){
      assert.propertyVal(store.get('monday'), 'work', 'coding');
    });

    it('should return correct value when getting a previously set key (number)', function(){
      assert.strictEqual(store.get('tuesday'), 42);
    });
  });

  describe('#save', function(){
    it('should persist session object to localStorage', function(){
      store.session.doge = 'sweater vests';
      store.save();
      assert.propertyVal(JSON.parse(localStorage.getItem(key)), 'doge', 'sweater vests');
    });
  });

  describe('#remove', function(){
    it('should return the value of a removed key', function(){
      assert.strictEqual(store.remove('doge'), 'sweater vests');
    });

    it('should remove a key/value pair from session object and localStorage', function(){
      assert.notProperty(store.session, 'doge');
      assert.notProperty(JSON.parse(localStorage.getItem(key)), 'doge');
    });
  });

  describe('#clear', function(){
    it('should reset the session object', function(){
      store.clear();
      expect(store.session).to.deep.equal({});
    });

    it('should remove the item from localStorage', function(){
      expect(JSON.parse(localStorage.getItem(key))).to.be.null;
    });
  });
});
