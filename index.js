var di = require('fdi').create();
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');

di.provide(function () {
  di.log('providing event bus');

  di.shared('eventBus')(function () {
    return new EventEmitter();
  });

  di.shared('config')
  (function () {
    fs.readFile('./etc/config.json', this.pause())
  })
  (function (err, contents) {
    return JSON.parse(contents);
  });

  di.shared('db')(function () {
    return {};
  });

  di.shared('router')(require('./router.js').create);

  di.bean('indexRoute')(require('./routes/index-route.js').create);

  di.log('providing end');
})(function () {
  di.log('provide try next');
  di.get('router')(function (router) {
    di.log('router provided');
    router.listen(3000);
  }).run();
}).run();

