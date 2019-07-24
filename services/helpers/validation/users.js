const Joi = require('@hapi/joi')

const usersSchema = Joi.object().keys({
	username: Joi.string(),
})

module.exports = usersSchema
