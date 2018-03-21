'use strict'

const config = require('config')
const fetchRoute = require('./route')
const moment = require('moment')
const ndjson = require('ndjson')
const map = require('through2-map').obj

const stream = () => map(x => x) // … xD

const main = async () => {
	const results = stream()
	results.pipe(ndjson.stringify()).pipe(process.stdout)

	for(let route of config.routes){
		// fetch data for route
		let routeResults = await (fetchRoute(route).catch(console.error))
		for(let res of (routeResults || [])) results.write(res)

		// (opt) fetch data for return route
		if(config.returnTrips){
			route = {origin: route.destination, destination: route.origin}
			let routeResults = await (fetchRoute(route).catch(console.error))
			for(let res of (routeResults || [])) results.write(res)
		}
	}

	results.end()
}

main().catch(console.error)

module.exports = main
