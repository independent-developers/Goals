const goals = {
	'2fc6786314f0c455605d7ec099477222173a19a3': {
		checked: false,
		title: 'Blblblblbl',
	},
	'33abe786ba7cb2e87192d1da3cffce864acf60ef': {
		checked: false,
		title: 'Blblblblbl',
	},
	'44578f3198e40fddddbeaa65421c314e2169c155': {
		checked: false,
		title: 'Blblblblbl',
	},
	'869fa01e12db6154e317c4e8a72767d42e4cac49': {
		checked: false,
		title: 'Blblblblbl',
	},
	'91789abe44c8d326cb42cc5217374f7c02607661': {
		checked: false,
		title: 'Blblblblbl',
	},
	c13213fecf5eeb2e6ed00efeb8217811a7512b5f: {
		checked: false,
		title: 'Blblblblbl',
	},
	c8c48880a7790a9f77633d8fb726a929b140e9c6: {
		checked: false,
		title: 'Blblblblbl',
	},
	d0c8680f302eb34650dd972be75f728c2da29da2: {
		checked: false,
		title: 'Blblblblbl',
	},
	e9fbab10a20d9b1a1902606fe6e44f7145e73dbf: {
		checked: false,
		title: 'Blblblblbl',
	},
}
let result = []
for (const key in goals) {
	gs
	if (goals.hasOwnProperty(key)) {
		const goal = goals[key]
		// console.log(goal, key)
		result.push({
			id: key,
			title: goal.title,
			check: goal.checked,
		})
	}
}
console.log(':: Result', result)
