const twitch = window.Twitch.ext
const BASE_URL = 'http://localhost:3000/api'

/**
 * Getch the streamer's goals list
 * @param {Integer} streamerId
 * @returns {Array} Streamer's goals
 * @returns {Boolean} Return the success of the request
 */
function fetchGoals(streamerId) {
	return fetch(`${BASE_URL}/users/${streamerId}/goals`)
		.then(response => response.json())
		.then(goals => console.log(goals))
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
				checked: goal.check,
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
	},
}

// TODO: Utiliser le manager comme suit pour fetch
// manager.goals.fetch('1234')
// TODO: Utiliser le manager comme suit pour create
// manager.goals.create('1234', [{
//     "key": "0da0d92183921efe233c79d3ca6ab5bd276641ee",
//     "title": "Blblblblbl",
//     "check": true
// },
// {
//     "key": "34c55d8715ad3f95183e2aca5c2e4c4ac2837671",
//     "title": "Blblblblbl",
//     "check": false
// }])

// Model
var index = 1

//  Lifecycle
// ===========
;(function($) {})(window.jQuery || {})

//  Handle user events
// ====================

// Function allow to add some goals
function add_element() {
	// Preliminary: create element
	var element =
		'<div class="cell">' +
		'<input class="inp-cbx" id="' +
		index +
		'" type="checkbox" style="display: none;"/>' +
		'<label class="cbx" for="' +
		index +
		'">' +
		'<span>' +
		'<svg width="12px" height="10px" viewbox="0 0 12 10">' +
		'<polyline points="1.5 6 4.5 9 10.5 1"></polyline>' +
		'</svg>' +
		'</span>' +
		'</label>' +
		'<span class="title" id="title_' +
		index +
		'" contenteditable="true">Texte de la cell ' +
		index +
		'</span>' +
		'</div>'

	// Append element
	$('.list').append(element)

	// Perform observer
	$('#' + index).change(function() {
		var index = this.id
		if (this.checked) {
			twitch.rig.log('checked index: ' + index)
			$('#title_' + index).css({
				'text-decoration': 'line-through',
				'text-decoration-color': '#000000',
				cursor: 'default',
			})

			$('#title_' + index).attr('contenteditable', false)
		} else {
			twitch.rig.log('not checked index: ' + index)
			$('#title_' + index).css({
				'text-decoration': 'none',
				cursor: 'text',
			})

			$('#title_' + index).attr('contenteditable', true)
		}
	})

	// Upgrade index
	index = index + 1
}

//  Twitch: Lifecycle
// ===================
twitch.onAuthorized(function(auth) {
	// twitch.rig.log('Live on channel', auth.channelId);
})
