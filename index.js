'use strict'

const config = require('config')
const route = require('./route')
const moment = require('moment')
const pWrite = require('fs-writefile-promise')

const write = (trip) => (result) => {
	const filename = config.outputPath+trip.from+'-'+trip.to+'_'+moment(result.date).format('DD.MM.YYYY-HH:mm')+'.json'
	return pWrite(filename, JSON.stringify(result))
}

const main = () => {
	const jobs = []
	for(let r of config.routes){
		// process route
		jobs.push(route(r).then(write(r)).then((path) => console.log('Written to: '+path)))

		// (opt) process return trip
		if(config.returnTrips){
			r = {from: r.to, to: r.from}
			jobs.push(route(r).then(write(r)).then((path) => console.log('Written to: '+path)))
		}
	}
	return Promise.all(jobs)
}

main().then((done) => console.log('Done')).catch((err) => {throw new Error(err)})

module.exports = main