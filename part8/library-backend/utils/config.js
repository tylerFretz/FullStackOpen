/* eslint-disable no-undef */
require('dotenv').config()

const { PORT, MONGODB_URI, SECRET, USER_PASSWORD } = process.env


module.exports = {
	PORT,
	MONGODB_URI,
	SECRET,
	USER_PASSWORD
}