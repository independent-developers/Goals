// https://stackoverflow.com/questions/48246550/returning-array-after-finish-reading-from-firebase
function fetch(firebase, userId) {
	const query = firebase.database().ref(`app/${userId}`)

	let goals = []
	return new Promise((resolve, reject) => {
		query
			.once('value')
			.then(snap => {
				console.log(':: Found goals !')
				snap.forEach(child => {
					console.log(':: formatting goals..')
					let key = child.key
					let data = child.val()
					goals.push({
						key,
						title: data.title,
						isChecked: data.isChecked,
						createdAt: data.createdAt
					})
				})
				resolve(goals)
			})
			.catch(error => {
				console.log('Whoops, an error occurred trying to find goals !')
				reject(error)
			})
			goals.sort((a, b) => a.createdAt - b.createdAt);
		return goals
	})
}

module.exports = fetch
