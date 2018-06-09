# Bitfinex Node.js Library (for WebSocket Public Channels)

Written in TypeScript, has type annotations, messages normalization to JSON, error handling, and more.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Node.js 8+
```

### Installing

A step by step series of examples that tell you how to get a development env running

```
npm install bitfinex-node-ws
```

or if you're using yarn:

```
yarn add bitfinex-node-ws
```

End with an example of getting some data out of the system or using it for a little demo

## Usage using ES6 modules

```js
import Bitfinex from "bitfinex-node-ws";

const bfx = new Bitfinex();

async function main() {
  await bfx.connect();
  bfx.ticker("tBTCUSD", message => {
    console.log(message);
    /*
    {
      bid: 7594.2,
      bidSize: 43.50522943,
      ask: 7594.3,
      askSize: 66.06033297,
      dailyChange: 5.8,
      dailyChangePerc: 0.0008,
      lastPrice: 7594.2,
      volume: 8234.07956528,
      high: 7685,
      low: 7550
     }
    */
  });
}

main();
```

# Usage via CommonJS modules

```js
const { Bitfinex } = require("bitfinex-node-ws");

const bfx = new Bitfinex();

bfx.connect().then(() => {
  bfx.ticker("tBTCUSD", message => {
    console.log(message);
    /*
    {
      bid: 7594.2,
      bidSize: 43.50522943,
      ask: 7594.3,
      askSize: 66.06033297,
      dailyChange: 5.8,
      dailyChangePerc: 0.0008,
      lastPrice: 7594.2,
      volume: 8234.07956528,
      high: 7685,
      low: 7550
     }
    */
  });
});
```

## Built With

- [ws](https://www.npmjs.com/package/ws) - WebSocket Module For Node.js

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/bermanboris/bitfinex-node-ws/tags).

## Authors

- **Berman Boris** - _Initial work_ - [bermanboris](https://github.com/bermanboris)

See also the list of [contributors](https://github.com/bermanboris/bitfinex-node-ws/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Not Implemented Yet

- Public channel other than Ticker
