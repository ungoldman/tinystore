var fs = require('fs');
var minify = require('minify');
var pkg = require('../package.json');
var d = new Date();
var dateString = ('0' + d.getDate()).slice(-2) + '-'
  + ('0' + (d.getMonth()+1)).slice(-2) + '-'
  + d.getFullYear();
var banner = '/*! ' + pkg.name + ' - ' + pkg.version + ' - ' + dateString + '\n'
  + '*   ' + pkg.homepage + '\n'
  + '*   Copyright (c) ' + d.getFullYear() + ' Nate Goldman' + '\n'
  + '*   ISC License */\n\n';

minify.optimize('tinystore.js', {
  callback: function (data) {
    fs.writeFile('tinystore.min.js', banner + data, function (err) {
      if (err) throw err;
      console.log('Minified and saved!');
    });
  }
});
