# [![Text Brawlers][logo]](http://retardarenan.henrik.ninja)

[![Circle CI][shield-circle-ci]](https://circleci.com/gh/ineentho/textspel/)

## Starting a development server

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm run monitor

# 3. In a separate shell run chokidar-socket-emitter which automatically reloads the browser for you
npm run socket-emitter
```

## Configuration

The server is configured through environment variables, which can either be set as normal, or specified in a .env file listing all variables. For example:

```
MONGODB=user:password@domain/database
```

## Code linting
We use [standard](https://github.com/feross/standard) to check code syntax and enforce our code style. To check and even fix some problems; automatically inStall standard locally:

```
# Inställning standard
npm i -g standard

# Check syntax
standard

# Autofix some issues
standard --fix
```


[logo]: http://retardarenan.henrik.ninja/client/png/interface/title.png
[shield-circle-ci]: https://img.shields.io/circleci/project/ineentho/textspel.svg?style=flat-square
