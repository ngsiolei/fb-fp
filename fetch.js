var https = require('https');
var url = require('url');
var posts = [];
var firstPath;

module.exports = function (appId, appSecret, id, cb) {
  var accessToken = appId + '|' + appSecret;
  firstPath = '/' + id + '/feed?access_token=' + accessToken + '&fields=message,created_time,shares,comments.limit(1).summary(true),likes.limit(1).summary(true)';
  fetchPosts(accessToken, null, function (err) {
    if (err) {
      cb(err);
    } else {
      cb(null, posts);
    }
  });
};

function fetchPosts(accessToken, nextUrl, cb) {
  var options = {
    'hostname': 'graph.facebook.com',
    'port': 443,
    'path': firstPath,
    'method': 'GET'
  };
  if (typeof nextUrl === 'string') {
    var u = url.parse(nextUrl);
    if (u.hostname && u.path) {
      options.hostname = u.hostname;
      options.path = u.path;
    } else {
      cb('invalid nextUrl: ' + nextUrl);
      return;
    }
  }
  var req = https.request(options, function (res) {
    var content = '';
    res.on('data', function (d) {
      content += d;
    });
    res.on('end', function () {
      var obj = JSON.parse(content);
      if (obj.data && obj.data.length > 0) {
        posts = posts.concat(obj.data);
      }
      if (obj.paging && obj.paging.next) {
        fetchPosts(accessToken, obj.paging.next, cb);
      } else {
        cb();
      }
    });
  });
  req.end();
  req.on('error', function (err) {
    cb(err);
  });
}
