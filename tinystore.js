(function(global){

  function TinyStore (name) {
    this.enabled = (function(){
      try {
        return 'localStorage' in window && window.localStorage !== null;
      } catch (e) {
        return false;
      }
    })();

    this.session = {};

    if (this.enabled) {
      try {
        this.session = JSON.parse(localStorage.getItem(name)) || {};
      } catch (e) {}
    }

    this.save = function () {
      if (this.enabled) {
        localStorage.setItem(name, JSON.stringify(this.session));
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
      delete this.session[key];
      return this.save();
    };

    this.clear = function () {
      this.session = {};
      return this.save();
    };
  }

  global.TinyStore = TinyStore;

})(this);
