module.exports = (req, res) => {
	console.log(':: Request', req)
	res.send(`Welcome in goals ${new Date().toString()}`)
}
