const twitch = window.Twitch.ext;



//  Lifecycle
// ===========

(function($){
    twitch.onAuthorized((auth) => {
        twitch.listen("broadcast", function(target, contentType, message){
            const response = JSON.parse(message);
            twitch.rig.log(response.display);
            if (response.display === true) {
                $('.gift_done').css({ "display":"inline-block" });
            }
            else {
                $('.gift_done').css({ "display":"none" });
            }
        });
    });
})(window.jQuery || {});
