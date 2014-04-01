describe('TinyStore', function(){

  var store = new TinyStore('tinystorespec');

  describe('#set', function(){
    it('should return value when setting a key', function(){
      assert.strictEqual(store.set('saturday', 'karaoke'), 'karaoke');
    });
  });

  describe('#get', function(){
    it('should return correct value when getting a key', function(){
      assert.strictEqual(store.get('saturday'), 'karaoke');
    });

    it('should return undefined for a non-existent key', function(){
      assert.isUndefined(store.get('tuesday'));
    });
  });
});
