module.exports = (req, res) => {
	const { headers, url, method, statusCode, cookies, query, body } = req
	console.log({ headers, url, method, statusCode, cookies, query, body })
	switch (req.method) {
		case 'POST':
			res.send('POST')
			break
		case 'GET':
			res.send('GET')
			break
		case 'PUT':
			res.send('PUT')
			break
		case 'DELETE':
			res.send('DELETE')
			break

		default:
			break
	}
}
