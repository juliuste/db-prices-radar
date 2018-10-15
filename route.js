'use strict'

const moment = require('moment-timezone')
const prices = require('db-prices')
const timeout = require('p-timeout')
const retry = require('p-retry')
const config = require('config')

const dates = (days) => {
	const startDate = moment.tz('Europe/Berlin')
	const dateList = []
	for(let i = 0; i<days; i++){
		dateList.push(moment.tz(startDate, 'Europe/Berlin').add(i, 'days').startOf('day').toDate())
	}
	return dateList
}

const request = (origin, destination, when, options) =>
	retry(
		() => timeout(prices(origin, destination, when, options || {}), 10000),
		{retries: 3}
	).catch(console.error)

const fetchRoute = async (route) => {
	const dateList = dates(config.days)
	const data = []
	for(let date of dateList){
		const result = await request(route.origin, route.destination, date, config.apiOptions)
		if(result) data.push({
			route,
			requestDate: moment.tz('Europe/Berlin').toISOString(),
			data: result
		})
	}
	return data
}

module.exports = fetchRoute
