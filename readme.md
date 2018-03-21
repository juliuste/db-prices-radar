# db-prices-radar

Collect and store Deutsche Bahn price information for a set of important routes.

[![dependency status](https://img.shields.io/david/juliuste/db-prices-radar.svg)](https://david-dm.org/juliuste/db-prices-radar)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/db-prices-radar.svg)](https://david-dm.org/juliuste/db-prices-radar#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/db-prices-radar.svg?style=flat)](LICENSE)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Usage

You need to have [node.js](https://nodejs.org/en/download/package-manager/) 8 or higher installed.

```sh
git clone https://github.com/juliuste/db-prices-radar.git
cd db-prices-radar
```

Adapt `config/default.json5` to your needs, and then run

```
node index.js > data.json
```

to fetch price data for the routes specified in `config/default.json5` to `data.json`. Please note that the tool itself doesn't fetch the data repeatedly on some interval, you need to do that yourself (e.g. by using a cronjob 😄).

## Similar Projects

- [bahn.guru](https://bahn.guru) - DB price calendar
- [db-prices](https://github.com/derhuerst/db-hafas/) - JavaScript client for the DB Sparpreise API.
- [db-hafas](https://github.com/derhuerst/db-hafas/) - JavaScript client for the DB Hafas API.

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/db-prices-radar/issues).
