'use strict'

const config = require('config')
const ndjson = require('ndjson')
const map = require('through2-map').obj
const fetchRoute = require('./route')

const stream = () => map(x => x) // … xD

const main = async () => {
	const results = stream()
	results.pipe(ndjson.stringify()).pipe(process.stdout)

	for(let route of config.routes){
		let routeResults = (await (fetchRoute(route).catch(console.error))) || []
		routeResults.forEach(res => results.write(res))
	}

	results.end()
}

main()
.catch(console.error)

module.exports = main
