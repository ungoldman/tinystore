(function(global){

  function TinyStore (name, optionalStore) {
    this.version = '0.0.2';
    this.store = optionalStore || localStorage;

    try {
      if (this.store) {
        if (this.store === localStorage) {
          if ('localStorage' in window && window.localStorage) {
            this.enabled = true;
          }
        } else if (this.store === sessionStorage) {
          if ('sessionStorage' in window && window.sessionStorage) {
            this.enabled = true;
          }
        } else {
          this.enabled = true;
        }
      } else {
        this.enabled = false;
      }
    } catch (err) {
      this.enabled = false;
    }

    this.session = {};

    if (this.enabled) {
      try {
        this.session = JSON.parse(this.store[name]) || {};
      } catch (e) {}
    }

    this.save = function () {
      if (this.enabled) {
        this.store[name] = JSON.stringify(this.session);
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
        delete localStorage[name];
      }
    };
  }

  global.TinyStore = TinyStore;

})(this);
