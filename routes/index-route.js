module.exports.create = function () {
  return this.fdi.get(['router', 'db', 'config'])(function (resources) {
    this.fdi.log('index-route router provided');

    resources.router.get('/', function (req, res) {
      resources.db.count = (resources.db.count || 0) + 1;
      res.send(resources.db.count.toString() + ' CONFIG.test: ' + resources.config.test);
    });

  }).run();
};