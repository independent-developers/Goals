const twitch = window.Twitch.ext
const BASE_URL = 'http://localhost:5000/api'

/**
 * Getch the streamer's goals list
 * @param {Integer} streamerId
 * @returns {Array} Streamer's goals
 * @returns {Boolean} Return the success of the request
 */
function deleteGoals(streamerId) {
	return fetch(`${BASE_URL}/users/${streamerId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .catch(error => {
        console.error('An error occurred while fetching goals', error)
        throw error
    })
}

/**
 * Getch the streamer's goals list
 * @param {Integer} streamerId
 * @returns {Array} Streamer's goals
 * @returns {Boolean} Return the success of the request
 */
function fetchGoals(streamerId) {
	return fetch(`${BASE_URL}/users/${streamerId}/goals`)
		.then(response => response.json())
		.then(function(goals){
            console.log(goals);
            goals_local = goals;
        })
		.catch(error => {
			console.error('An error occurred while fetching goals', error)
			throw error
		})
}

/**
 * Set goals for the streamer
 * @param {Integer} streamerId 
 * @param {Array} goals The array you want
 * @returns {Boolean} Return the success of the request
 */
function setGoals(streamerId, goals = []) {
	goals.forEach(goal => {
		let url = ''
		if (goal && goal.key) {
			url = `${BASE_URL}/users/${streamerId}/goals/${goal.key}`
		} else {
			url = `${BASE_URL}/users/${streamerId}/goals`
		}
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				title: goal.title,
				isChecked: goal.isChecked,
			}),
		})
		.then(response => response.json())
		.catch(error => {
			console.error('An error occurred while setting some goals', error)
			throw error
		})
	})
}

const manager = {
	goals: {
		fetch: fetchGoals,
        create: setGoals,
        delete: deleteGoals
	},
}

// TODO: Utiliser le manager comme suit pour fetch
// manager.goals.fetch('1234')
// TODO: Utiliser le manager comme suit pour create
// manager.goals.create('1234', [{
//     "key": "0da0d92183921efe233c79d3ca6ab5bd276641ee",
//     "title": "Blblblblbl",
//     "isChecked": true
// },
// {
//     "key": "34c55d8715ad3f95183e2aca5c2e4c4ac2837671",
//     "title": "Blblblblbl",
//     "isChecked": false
// }])

// Model
var delete_mode = false;
var isBroadcaster = false;
var channelID = "";
var goals_local = [];



//  Lifecycle
// ===========
(function($){
    twitch.onAuthorized(function(auth) {
        var parts = auth.token.split(".");
        var payload = JSON.parse(window.atob(parts[1]));
        isBroadcaster = ( payload.role == 'broadcaster' );
        channelID = payload.channel_id;
        twitch.rig.log("broadcaster: ", isBroadcaster);
        twitch.rig.log("channelID: ", channelID);
    
        // Configure view for viewer
        if (isBroadcaster === false) {
            $('.btn_add').css({ "display":"none" });
            $('.btn_delete').css({ "display":"none" });
        }

        // Fetch all goals
        manager.goals.fetch(channelID).then(function(){
            goals_local.forEach(goal => {
                perform_element(goal.key, goal.title, goal.isChecked);
            });
        });
    });
})(window.jQuery || {});



//  Handle user events
// ====================

// Function allow to add one goal
function add_element() {
    perform_element("","",false);
}

// Function allow to delete one goal
function handle_delete_edit_mode() {
    if (delete_mode === false) {
        // Handle state of delete mode
        delete_mode = true;

        // Handle state of cells
        $('.cell').each(function() {
            $(this).removeClass('edit_mode');
            $(this).addClass('delete_mode');
        });

        // Handle state of delete button
        $('.btn_delete').html('Done');
        $('.btn_delete').css({
            "color": "#000000"
        })

        // Handle state of add button
        $('.btn_add').html('Delete all')
        $('.btn_add').css({
            "background-color":"#D0021B"        
        })
    }
    else {
        // Handle state of delete mode
        delete_mode = false;

        // Handle state of cells
        $('.cell').each(function() {
            $(this).removeClass('delete_mode');
            $(this).addClass('edit_mode');
        });

        // Handle state of delete button
        $('.btn_delete').html('Delete');
        $('.btn_delete').css({
            "color": "#D0021B"
        })

        // Handle state of add button
        $('.btn_add').html('+ Add')
        $('.btn_add').css({
            "background-color":"#000000"
        })
    }
}



//  Private methods
// =================

function perform_element(key, title, goalIsChecked) {
    twitch.rig.log("key: ", key);
    // Preliminary: create element
    var element =  '<div class="cell edit_mode">' +
                        '<input class="inp-cbx" id="'+key+'" type="checkbox" style="display: none;"/>' + 
                        '<label class="cbx" for="'+key+'">' +
                            '<span>' + 
                                '<svg width="12px" height="10px" viewbox="0 0 12 10">' +
                                    '<polyline points="1.5 6 4.5 9 10.5 1"></polyline>' + 
                                '</svg>' + 
                            '</span>' +
                        '</label>' + 
                        '<span class="title"> <textarea class="title" id="title_'+key+'" rows="2" cols="30" data-limit-rows="true" placeholder="Enter your goal...">'+title+'</textarea> </span>' +
                        '<input class="inp-trash" id="trash_'+key+'" type="button" style="display: none;"/>' +
                        '<span class="trash" for="trash_'+key+'">' +
                            '<svg width="16px" height="19px" viewBox="0 0 16 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                                '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                                    '<g id="trash" fill="#D0021B" fill-rule="nonzero">' +
                                        '<path d="M15.5467748,1.73841441 L10.5878559,1.73841441 L10.5878559,0.863243243 C10.5878559,0.387243243 10.2011532,0 9.72587387,0 L6.27416216,0 C5.79884685,0 5.41218018,0.387243243 5.41218018,0.863243243 L5.41218018,1.73837838 L0.453225225,1.73837838 C0.213405405,1.73837838 0.019027027,1.93275676 0.019027027,2.17257658 C0.019027027,2.4123964 0.213405405,2.60677477 0.453225225,2.60677477 L1.25798198,2.60677477 L1.80673874,16.8913153 C1.84032432,17.7655856 2.552,18.4504505 3.42699099,18.4504505 L12.5730811,18.4504505 C13.4480721,18.4504505 14.1597477,17.7655495 14.1932613,16.8912793 L14.742018,2.60673874 L15.5467748,2.60673874 C15.7865225,2.60673874 15.980973,2.41236036 15.980973,2.17254054 C15.980973,1.93279279 15.7865946,1.73841441 15.5467748,1.73841441 Z M6.28054054,0.86836036 L9.71945946,0.86836036 L9.71945946,1.73837838 L6.28054054,1.73837838 L6.28054054,0.86836036 L6.28054054,0.86836036 Z M13.3255495,16.857982 C13.3099459,17.264036 12.9794234,17.5820901 12.573045,17.5820901 L3.42699099,17.5820901 C3.02064865,17.5820901 2.69012613,17.264 2.67448649,16.8579459 L2.12702703,2.60677477 L13.873045,2.60677477 L13.3255495,16.857982 Z" id="Shape"></path>' +
                                        '<path d="M5.35603604,6.5430991 C5.35145946,6.30616216 5.15805405,6.11726126 4.92209009,6.11726126 C4.91927928,6.11726126 4.9163964,6.11726126 4.91358559,6.11726126 C4.67387387,6.12194595 4.48320721,6.32007207 4.48781982,6.55978378 L4.62407207,13.6456937 C4.62861261,13.8826306 4.82209009,14.0715315 5.05801802,14.0715315 C5.06082883,14.0715315 5.06371171,14.0715315 5.06652252,14.0715315 C5.30627027,14.0668468 5.4969009,13.8687928 5.49228829,13.629009 L5.35603604,6.5430991 Z" id="Path"></path>' +
                                        '<path d="M7.99992793,6.11722523 C7.76014414,6.11722523 7.56572973,6.3116036 7.56572973,6.55142342 L7.56572973,13.6373333 C7.56572973,13.8771171 7.76010811,14.0715315 7.99992793,14.0715315 C8.23974775,14.0715315 8.43412613,13.8771532 8.43412613,13.6373333 L8.43412613,6.55142342 C8.43412613,6.31163964 8.23974775,6.11722523 7.99992793,6.11722523 Z" id="Path"></path>' +
                                        '<path d="M11.0863063,6.11733333 C10.8474595,6.11203604 10.6484324,6.30335135 10.6438559,6.5430991 L10.5076036,13.629009 C10.502955,13.8687568 10.6936216,14.0668468 10.9333694,14.0715315 C10.9361802,14.0715315 10.9390631,14.0715315 10.9418739,14.0715315 C11.1777658,14.0715315 11.3712793,13.8825586 11.3758198,13.6456937 L11.5120721,6.55978378 C11.5166847,6.32 11.3260901,6.12190991 11.0863063,6.11733333 Z" id="Path"></path>' +
                                    '</g>' +
                                '</g>'
                            '</svg>' +
                        '<span>' +
                    '</div>';

    // Append element
    $('.list').append(element);

    // Configure textarea
    if (isBroadcaster === false) {
        $('#title_'+key).prop('readonly', true);
    }

    $('#title_'+key+'[data-limit-rows=true]').on('keypress', function (event) {
        var textarea = $(this);
        if (event.which === 13 && textarea.val()) {
            textarea.blur();
        }
        if (event.which === 13) {
            return false;
        }
        return ( textarea.val().length < 55 );
    });

    $('#title_'+key).on('blur', function (event) {
        var textarea = $(this);
        manager.goals.create(channelID, [{"key":key, "title":textarea.val(), "isChecked":goalIsChecked}]);
    });

    // Perform observer check action
    $('#'+key).change(function() {
        if (this.checked) {
            $('#title_'+key).css({
                "text-decoration": "line-through",
                "text-decoration-color": "#000000",
                "cursor": "default"
            });

            $('#title_'+key).prop('readonly', true);
        }
        else {
            $('#title_'+key).css({
                "text-decoration": "none",
                "cursor": "text"
            });

            $('#title_'+key).prop('readonly', false);
        }
        manager.goals.create(channelID, [{"key":key, "title":$('#title_'+key).val(), "isChecked":this.checked}]);
    });
}
