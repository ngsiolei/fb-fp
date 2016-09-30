var util = require('util');

module.exports = function (data) {
  data.sort(function (a, b) {
    var aLikeCount = a.likes.summary.total_count;
    var bLikeCount = b.likes.summary.total_count;
    return bLikeCount - aLikeCount;
  });

  console.log('created_time|message|like_count|comment_count|share_count|permalink');
  var placeholder = '%s|%s|%s|%s|%s|%s|%s';
  data.forEach(function (x) {
    var id = x.id;
    var created = x.created_time;
    var message = x.message || '';
    message = message.replace(/"/g, "'");
    message = message.slice(0, 10);
    var likeCount = x.likes.summary.total_count;
    var commentCount = x.comments.summary.total_count;
    var shareCount = (x.shares && x.shares.count) ? x.shares.count : 0;
    var link = 'https://www.facebook.com/' + id.split('_')[0] + '/posts/' + id.split('_')[1];
    var out = util.format(
      placeholder,
      id,
      x.created_time,
      message,
      likeCount,
      commentCount,
      shareCount,
      link
    );
    console.log(out);
  });
}
