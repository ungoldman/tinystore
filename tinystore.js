(function(global){

  function TinyStore (name, optionalStore) {
    this.version = '0.0.2';
    this.session = {};
    this.store = typeof optionalStore !== 'undefined' ? optionalStore : localStorage;
    this.name = name || 'TinyStore';
    this.enabled = false;

    // conditions for valid object store:
    // * must not be undefined, and
    //   * have a getItem & setItem method (localStorage or sessionStorage), or
    //   * be an object, or
    //   * be a function
    if (typeof this.store !== 'undefined' &&
      ((typeof this.store.getItem === 'function' && typeof this.store.setItem === 'function') ||
        typeof this.store === 'object' || typeof this.store === 'function'
      )) {
      this.enabled = true;
    }

    if (this.enabled) {
      try {
        this.session = JSON.parse(this.store[this.name]) || {};
      } catch (e) {}
    }

    this.save = function () {
      if (this.enabled) {
        this.store[this.name] = JSON.stringify(this.session);
      }
      return this.session;
    };

    this.set = function (key, value) {
      this.session[key] = value;
      this.save();
      return this.session[key];
    };

    this.get = function (key) {
      return this.session[key];
    };

    this.remove = function (key) {
      var value = this.session[key];
      delete this.session[key];
      this.save();
      return value;
    };

    this.clear = function () {
      this.session = {};
      if (this.enabled) {
        delete this.store[this.name];
      }
    };
  }

  global.TinyStore = TinyStore;

})(this);
