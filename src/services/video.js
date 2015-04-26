
var videoFeed = function (access_token, user_id) {
    FB.napi('/me/home', {access_token: access_token, filter: 'app_2392950137'}, function (err, data) {
        if (err) {
            return;
        }

        _.forEach(data.data, function(v) {
            v.user = user_id;  // Video(v).save();
        });          
    });
};