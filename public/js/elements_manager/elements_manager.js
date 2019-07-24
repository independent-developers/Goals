const twitch = window.Twitch.ext;

twitch.onAuthorized(function(auth) {
    twitch.rig.log('Live on channel', auth.channelId);
});

var index = 1;

// Function allow to add some goals
function add_element() {
    var element =   '<div class="cell">' +
                        '<input class="inp-cbx" id="cbx'+index+'" type="checkbox" style="display: none;"/>' + 
                        '<label class="cbx" for="cbx'+index+'">' +
                            '<span>' + 
                                '<svg width="12px" height="10px" viewbox="0 0 12 10">' +
                                    '<polyline points="1.5 6 4.5 9 10.5 1"></polyline>' + 
                                '</svg>' + 
                            '</span>' +
                        '</label>' + 
                        '<span class="title" contenteditable="true">Texte de la cell '+index+'</span>' +
                    '</div>';
                    
    $('.list').append(element);
    index = index + 1;
}