var fs = require('fs');
var minify = require('minify');
var pkg = require('../package.json');
var d = new Date();
var dateString = ('0' + d.getDate()).slice(-2) + '-'
  + ('0' + (d.getMonth()+1)).slice(-2) + '-'
  + d.getFullYear();
var br = ' | ';
var nl = '\n';
var banner = '/*! ' + pkg.name + ' v' + pkg.version + ' (' + dateString + ')' + br
  + '(c) ' + d.getFullYear() + ' Nate Goldman' + br
  + pkg.homepage.split('//')[1] + '#license */' + nl;

minify.optimize('tinystore.js', {
  callback: function (data) {
    fs.writeFile('tinystore.min.js', banner + data + nl, function (err) {
      if (err) throw err;
      var oStats = fs.statSync('tinystore.js');
      var mStats = fs.statSync('tinystore.min.js');

      console.log('Minified and saved!');
      console.log('original:', oStats.size / 1000, 'kb');
      console.log('minified:', mStats.size / 1000, 'kb');
    });
  }
});
