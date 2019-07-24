const twitch = window.Twitch.ext;



// Model
var index = 1;



//  Lifecycle
// ===========
(function($){
})(window.jQuery || {});



//  Handle user events
// ====================

// Function allow to add some goals
function add_element() {
    // Preliminary: create element
    var element =   '<div class="cell">' +
                        '<input class="inp-cbx" id="'+index+'" type="checkbox" style="display: none;"/>' + 
                        '<label class="cbx" for="'+index+'">' +
                            '<span>' + 
                                '<svg width="12px" height="10px" viewbox="0 0 12 10">' +
                                    '<polyline points="1.5 6 4.5 9 10.5 1"></polyline>' + 
                                '</svg>' + 
                            '</span>' +
                        '</label>' + 
                        '<span class="title" id="title_'+index+'" contenteditable="true">Texte de la cell '+index+'</span>' +
                    '</div>';

    // Append element
    $('.list').append(element);

    // Perform observer
    $('#'+index).change(function() {
        var index = this.id
        if (this.checked) {
            twitch.rig.log('checked index: '+index);
            $('#title_'+index).css({
                "text-decoration": "line-through",
                "text-decoration-color": "#000000"
            });

            $('#title_'+index).attr('contenteditable', false);
        }
        else {
            twitch.rig.log('not checked index: '+index);
            $('#title_'+index).css({
                "text-decoration": "none"
            });

            $('#title_'+index).attr('contenteditable', true);
        }
    });

    // Upgrade index
    index = index + 1;
}



//  Twitch: Lifecycle
// ===================
twitch.onAuthorized(function(auth) {
    // twitch.rig.log('Live on channel', auth.channelId);
});