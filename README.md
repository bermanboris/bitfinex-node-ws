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

## Usage

```
import Bitfinex from 'bitfinex-node-ws';

const bfx = new Bitfinex();

async function main() {
  await bfx.connect();
  bfx.subscribe("tBTCUSD", (message) => {
    // Message is:
    // { bid: 7594.2,
    //  bidSize: 43.50522943,
    //  ask: 7594.3,
    //  askSize: 66.06033297,
    //  dailyChange: 5.8,
    //  dailyChangePerc: 0.0008,
    //  lastPrice: 7594.2,
    //  volume: 8234.07956528,
    //  high: 7685,
    //  low: 7550 }
  })
}

main()
```

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

- [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Billie Thompson** - _Initial work_ - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
