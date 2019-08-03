const twitch = window.Twitch.ext;



//  Lifecycle
// ===========

(function($){
  twitch.onAuthorized((auth) => {
      $('.discord-btn').on('click', function() {
        window.open("https://discord.gg/Yed6x2n");
      });
  });
})(window.jQuery || {});
