(function(global){

  function TinyStore (name, optionalStore) {
    this.session = {};
    this.store = typeof optionalStore !== 'undefined' ? optionalStore : localStorage;
    this.name = name || 'TinyStore';
    this.enabled = isEnabled(this.store);

    if (this.enabled) {
      try {
        this.session = JSON.parse(this.store[this.name]) || {};
      } catch (e) {}
    }
  }

  TinyStore.prototype.save = function () {
    if (this.enabled) {
      this.store[this.name] = JSON.stringify(this.session);
    }
    return this.session;
  };

  TinyStore.prototype.set = function (key, value) {
    this.session[key] = value;
    this.save();
    return this.session[key];
  };

  TinyStore.prototype.get = function (key) {
    return this.session[key];
  };

  TinyStore.prototype.remove = function (key) {
    var value = this.session[key];
    delete this.session[key];
    this.save();
    return value;
  };

  TinyStore.prototype.clear = function () {
    this.session = {};
    if (this.enabled) {
      delete this.store[this.name];
    }
  };

  function isEnabled (store) {
    // definitely invalid:
    // * null
    // * undefined
    // * NaN
    // * empty string ("")
    // * 0
    // * false
    if (!store) { return false; }

    var storeType = typeof store;
    var isLocalOrSession = typeof store.getItem === 'function' && typeof store.setItem === 'function';
    var isObjectOrFunction = storeType === 'object' || storeType === 'function';

    // store is valid iff it is either
    // (a) localStorage or sessionStorage
    // (b) a regular object or function
    if (isLocalOrSession || isObjectOrFunction) { return true; }

    // catchall for outliers (string, positive number, true boolean, xml)
    return false;
  }

  global.TinyStore = TinyStore;

})(this);
