## Quick Start:

update `webpack.config.js`, switch `entry`, such as `main` or `reddit`,
then:
```bash
./start.sh
open http://localhost:8080
```

## separate apps:

- main
- reddit: change webpack.config.js -> entry -> `reddit`: reddit select-options, which copy from [redux:Reddit API](http://redux.js.org/docs/advanced/ExampleRedditAPI.html)
- 10:   change webpack.config.js -> entry -> `10`: PING-PONG
- 2
- 8


## add new all-inclusive app
add new app's entry to `webpack.config.js` -> entry, then restart `start.sh` will show new app.

## History
See [here](./HISTORY.md)