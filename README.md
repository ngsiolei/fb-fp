
###Example

    var config = require('./config');
    var fetch = require('./fetch');
    var print = require('./print');
    var id = 'fb-page-id';

    fetch(config.appId, config.appSecret, id, function (err, posts) {
      if (err) {
        console.log(err);
        return;
      }
      print(posts);
    });
