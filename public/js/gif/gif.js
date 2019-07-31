const twitch = window.Twitch.ext;



//  MODEL
// =======
let listenFirstTimeOnly = true;
let arrayOfGifsAvailable = ["https://media.giphy.com/media/87NS05bya11mg/giphy.gif", "https://media.giphy.com/media/UmBdALbYTmCJ2/giphy.gif", 
                            "https://media.giphy.com/media/LgwoVr7YgUkrC/giphy.gif", "https://media.giphy.com/media/l3vRaWnqG3gOZ8lsk/giphy.gif",
                            "https://media.giphy.com/media/2ipe5r5bG7yyvUQq8e/giphy.gif", "https://media.giphy.com/media/l1AsG4s7OnyB3Owak/giphy.gif",
                            "https://media.giphy.com/media/3o6Mb6FrvxUTxCvbwc/giphy.gif", "https://media.giphy.com/media/229OX0vSVNys10AZnS/giphy.gif",
                            "https://media.giphy.com/media/3o6gDPmm6ZvFVu4yJO/giphy.gif", "https://media.giphy.com/media/U6pavBhRsbNbPzrwWg/giphy.gif"];


//  Lifecycle
// ===========

(function($){
    twitch.onAuthorized((auth) => {
        if (listenFirstTimeOnly === true) {
            listenFirstTimeOnly = false;
            twitch.listen("broadcast", function(target, contentType, message){
                const response = JSON.parse(message);
                twitch.rig.log("response: ",response);
                if (response.display === true) {
                    $('p.title').html(response.title);
                    $('img.gif').attr("src", arrayOfGifsAvailable[Math.floor(Math.random() * 10)]);
                    $('.gift_done').css({ "display":"inline-block" });
                    $(".gift_done").fadeOut(10000, function() {
                        $('.gift_done').css({ "display":"none" });
                        $('img.gif').attr("src", '');
                        $('p.title').html('');
                    });
                }
                else if (response.display === false) {
                    $('.gift_done').css({ "display":"none" });
                    $('img.gif').attr("src", '');
                    $('p.title').html('');
                }
            });
        }
    });
})(window.jQuery || {});
