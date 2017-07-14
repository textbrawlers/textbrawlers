SystemJS.config({
  paths: {
    'npm:': 'jspm_packages/npm/',
    'github:': 'jspm_packages/github/',
    'textbrawlers/': 'src/'
  },
  browserConfig: {
    'baseURL': '/'
  },
  devConfig: {
    'map': {
      'plugin-babel': 'npm:systemjs-plugin-babel@0.0.21',
      'systemjs-hot-reloader': 'npm:systemjs-hot-reloader@1.1.0',
      'babel-plugin-transform-react-jsx': 'npm:babel-plugin-transform-react-jsx@6.24.1',
      'core-js': 'npm:core-js@2.4.1'
    },
    'packages': {
      'npm:systemjs-hot-reloader@1.1.0': {
        'map': {
          'systemjs-hmr': 'npm:systemjs-hmr@2.0.9'
        }
      },
      'npm:babel-plugin-transform-react-jsx@6.24.1': {
        'map': {
          'babel-plugin-syntax-jsx': 'npm:babel-plugin-syntax-jsx@6.18.0',
          'babel-runtime': 'npm:babel-runtime@6.23.0',
          'babel-helper-builder-react-jsx': 'npm:babel-helper-builder-react-jsx@6.24.1'
        }
      },
      'npm:babel-helper-builder-react-jsx@6.24.1': {
        'map': {
          'babel-runtime': 'npm:babel-runtime@6.23.0',
          'esutils': 'npm:esutils@2.0.2',
          'babel-types': 'npm:babel-types@6.24.1'
        }
      }
    }
  },
  transpiler: 'plugin-babel',
  packages: {
    'client': {
      'main': 'index.js',
      'meta': {
        '*.json': {
          'loader': 'json'
        },
        '*.js': {
          'loader': 'plugin-babel',
          'babelOptions': {
            'plugins': [
              'babel-plugin-transform-react-jsx',
              'babel-plugin-styled-components'
            ]
          }
        }
      }
    },
    'server': {
      'meta': {
        '*.json': {
          'loader': 'json'
        },
        '*.js': {
          'loader': 'plugin-babel'
        }
      }
    },
    'common': {
      'meta': {
        '*.json': {
          'loader': 'json'
        },
        '*.js': {
          'loader': 'plugin-babel'
        }
      }
    }
  },
  map: {
    '@hot': '@empty'
  }
});

SystemJS.config({
  packageConfigPaths: [
    'npm:@*/*.json',
    'npm:*.json',
    'github:*/*.json'
  ],
  map: {
    'ajv': 'npm:ajv@5.0.1',
    'assert': 'npm:jspm-nodelibs-assert@0.2.1',
    'babel-plugin-styled-components': 'npm:babel-plugin-styled-components@1.1.7',
    'babel-types': 'npm:babel-types@6.24.1',
    'bcryptjs': 'npm:bcryptjs@2.4.3',
    'buffer': 'npm:jspm-nodelibs-buffer@0.2.3',
    'child_process': 'npm:jspm-nodelibs-child_process@0.2.1',
    'constants': 'npm:jspm-nodelibs-constants@0.2.1',
    'crypto': 'npm:jspm-nodelibs-crypto@0.2.1',
    'dns': 'npm:jspm-nodelibs-dns@0.2.1',
    'domain': 'npm:jspm-nodelibs-domain@0.2.1',
    'dotenv': 'npm:dotenv@4.0.0',
    'eslint': 'npm:eslint@3.19.0',
    'eslint-plugin-import': 'npm:eslint-plugin-import@2.2.0',
    'eslint-plugin-node': 'npm:eslint-plugin-node@4.2.2',
    'eslint-plugin-promise': 'npm:eslint-plugin-promise@3.5.0',
    'eslint-plugin-standard': 'npm:eslint-plugin-standard@3.0.1',
    'events': 'npm:jspm-nodelibs-events@0.2.2',
    'fs': 'npm:jspm-nodelibs-fs@0.2.1',
    'graceful-fs': 'npm:graceful-fs@4.1.11',
    'history': 'npm:history@4.6.1',
    'http': 'npm:jspm-nodelibs-http@0.2.0',
    'https': 'npm:jspm-nodelibs-https@0.2.2',
    'image': 'github:systemjs/plugin-image@0.1.0',
    'json': 'github:systemjs/plugin-json@0.3.0',
    'koa': 'npm:koa@2.2.0',
    'koa-bodyparser': 'npm:koa-bodyparser@4.2.0',
    'koa-conditional-get': 'npm:koa-conditional-get@2.0.0',
    'koa-convert': 'npm:koa-convert@1.2.0',
    'koa-etag': 'npm:koa-etag@3.0.0',
    'koa-router': 'npm:koa-router@7.1.1',
    'koa-send': 'npm:koa-send@4.1.0',
    'koa-static': 'npm:koa-static@3.0.0',
    'lodash': 'npm:lodash@4.17.4',
    'lru-cache': 'npm:lru-cache@4.0.2',
    'module': 'npm:jspm-nodelibs-module@0.2.1',
    'monk': 'npm:monk@4.0.0',
    'net': 'npm:jspm-nodelibs-net@0.2.1',
    'os': 'npm:jspm-nodelibs-os@0.2.1',
    'path': 'npm:jspm-nodelibs-path@0.2.3',
    'process': 'npm:jspm-nodelibs-process@0.2.1',
    'querystring': 'npm:jspm-nodelibs-querystring@0.2.2',
    'react': 'npm:react@16.0.0-alpha.12',
    'react-dom': 'npm:react-dom@16.0.0-alpha.12',
    'react-redux': 'npm:react-redux@5.0.4',
    'react-router': 'npm:react-router@4.1.1',
    'react-router-dom': 'npm:react-router-dom@4.1.1',
    'react-router-redux': 'npm:react-router-redux@next',
    'readline': 'npm:jspm-nodelibs-readline@0.2.1',
    'redux': 'npm:redux@3.6.0',
    'redux-devtools-extension': 'npm:redux-devtools-extension@2.13.2',
    'redux-logger': 'npm:redux-logger@3.0.1',
    'redux-thunk': 'npm:redux-thunk@2.2.0',
    'stream': 'npm:jspm-nodelibs-stream@0.2.1',
    'string_decoder': 'npm:jspm-nodelibs-string_decoder@0.2.1',
    'styled-components': 'npm:styled-components@2.1.1',
    'tls': 'npm:jspm-nodelibs-tls@0.2.1',
    'tty': 'npm:jspm-nodelibs-tty@0.2.1',
    'uglify-js': 'npm:uglify-js@2.8.24',
    'uglify-to-browserify': 'npm:uglify-to-browserify@1.0.2',
    'url': 'npm:jspm-nodelibs-url@0.2.1',
    'utf-8-validate': 'npm:utf-8-validate@3.0.1',
    'util': 'npm:jspm-nodelibs-util@0.2.2',
    'vm': 'npm:jspm-nodelibs-vm@0.2.1',
    'whatwg-fetch': 'npm:whatwg-fetch@2.0.3',
    'ws': 'npm:ws@1.1.4',
    'zlib': 'npm:jspm-nodelibs-zlib@0.2.3'
  },
  packages: {
    'npm:fbjs@0.8.12': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.1',
        'object-assign': 'npm:object-assign@4.1.1',
        'promise': 'npm:promise@7.3.1',
        'core-js': 'npm:core-js@1.2.7',
        'isomorphic-fetch': 'npm:isomorphic-fetch@2.2.1',
        'setimmediate': 'npm:setimmediate@1.0.5',
        'ua-parser-js': 'npm:ua-parser-js@0.7.13'
      }
    },
    'npm:loose-envify@1.3.1': {
      'map': {
        'js-tokens': 'npm:js-tokens@3.0.2'
      }
    },
    'npm:prop-types@15.5.10': {
      'map': {
        'fbjs': 'npm:fbjs@0.8.12',
        'loose-envify': 'npm:loose-envify@1.3.1'
      }
    },
    'npm:isomorphic-fetch@2.2.1': {
      'map': {
        'whatwg-fetch': 'npm:whatwg-fetch@2.0.3',
        'node-fetch': 'npm:node-fetch@1.7.1'
      }
    },
    'npm:encoding@0.1.12': {
      'map': {
        'iconv-lite': 'npm:iconv-lite@0.4.18'
      }
    },
    'npm:jspm-nodelibs-stream@0.2.1': {
      'map': {
        'stream-browserify': 'npm:stream-browserify@2.0.1'
      }
    },
    'npm:stream-browserify@2.0.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'readable-stream': 'npm:readable-stream@2.3.3'
      }
    },
    'npm:jspm-nodelibs-domain@0.2.1': {
      'map': {
        'domain-browser': 'npm:domain-browser@1.1.7'
      }
    },
    'npm:readable-stream@2.2.9': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'buffer-shims': 'npm:buffer-shims@1.0.0',
        'core-util-is': 'npm:core-util-is@1.0.2',
        'process-nextick-args': 'npm:process-nextick-args@1.0.7',
        'isarray': 'npm:isarray@1.0.0',
        'string_decoder': 'npm:string_decoder@1.0.1',
        'util-deprecate': 'npm:util-deprecate@1.0.2'
      }
    },
    'npm:string_decoder@1.0.0': {
      'map': {
        'buffer-shims': 'npm:buffer-shims@1.0.0'
      }
    },
    'npm:jspm-nodelibs-buffer@0.2.3': {
      'map': {
        'buffer': 'npm:buffer@5.0.6'
      }
    },
    'npm:buffer@5.0.6': {
      'map': {
        'ieee754': 'npm:ieee754@1.1.8',
        'base64-js': 'npm:base64-js@1.2.1'
      }
    },
    'npm:jspm-nodelibs-string_decoder@0.2.1': {
      'map': {
        'string_decoder': 'npm:string_decoder@0.10.31'
      }
    },
    'npm:jspm-nodelibs-crypto@0.2.1': {
      'map': {
        'crypto-browserify': 'npm:crypto-browserify@3.11.1'
      }
    },
    'npm:jspm-nodelibs-os@0.2.1': {
      'map': {
        'os-browserify': 'npm:os-browserify@0.2.1'
      }
    },
    'npm:jspm-nodelibs-url@0.2.1': {
      'map': {
        'url': 'npm:url@0.11.0'
      }
    },
    'npm:jspm-nodelibs-zlib@0.2.3': {
      'map': {
        'browserify-zlib': 'npm:browserify-zlib@0.1.4'
      }
    },
    'npm:browserify-zlib@0.1.4': {
      'map': {
        'readable-stream': 'npm:readable-stream@2.3.3',
        'pako': 'npm:pako@0.2.9'
      }
    },
    'npm:browserify-sign@4.0.4': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'create-hash': 'npm:create-hash@1.1.3',
        'create-hmac': 'npm:create-hmac@1.1.6',
        'bn.js': 'npm:bn.js@4.11.7',
        'browserify-rsa': 'npm:browserify-rsa@4.0.1',
        'elliptic': 'npm:elliptic@6.4.0',
        'parse-asn1': 'npm:parse-asn1@5.1.0'
      }
    },
    'npm:jspm-nodelibs-http@0.2.0': {
      'map': {
        'http-browserify': 'npm:stream-http@2.7.2'
      }
    },
    'npm:create-hash@1.1.3': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'cipher-base': 'npm:cipher-base@1.0.4',
        'ripemd160': 'npm:ripemd160@2.0.1',
        'sha.js': 'npm:sha.js@2.4.8'
      }
    },
    'npm:url@0.11.0': {
      'map': {
        'querystring': 'npm:querystring@0.2.0',
        'punycode': 'npm:punycode@1.3.2'
      }
    },
    'npm:browserify-cipher@1.0.0': {
      'map': {
        'browserify-aes': 'npm:browserify-aes@1.0.6',
        'browserify-des': 'npm:browserify-des@1.0.0',
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.0'
      }
    },
    'npm:create-hmac@1.1.6': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'create-hash': 'npm:create-hash@1.1.3',
        'cipher-base': 'npm:cipher-base@1.0.4',
        'ripemd160': 'npm:ripemd160@2.0.1',
        'sha.js': 'npm:sha.js@2.4.8',
        'safe-buffer': 'npm:safe-buffer@5.1.1'
      }
    },
    'npm:create-ecdh@4.0.0': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.7',
        'elliptic': 'npm:elliptic@6.4.0'
      }
    },
    'npm:diffie-hellman@5.0.2': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.7',
        'randombytes': 'npm:randombytes@2.0.5',
        'miller-rabin': 'npm:miller-rabin@4.0.0'
      }
    },
    'npm:public-encrypt@4.0.0': {
      'map': {
        'parse-asn1': 'npm:parse-asn1@5.1.0',
        'bn.js': 'npm:bn.js@4.11.7',
        'browserify-rsa': 'npm:browserify-rsa@4.0.1',
        'create-hash': 'npm:create-hash@1.1.3',
        'randombytes': 'npm:randombytes@2.0.5'
      }
    },
    'npm:browserify-aes@1.0.6': {
      'map': {
        'cipher-base': 'npm:cipher-base@1.0.4',
        'inherits': 'npm:inherits@2.0.3',
        'create-hash': 'npm:create-hash@1.1.3',
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.0',
        'buffer-xor': 'npm:buffer-xor@1.0.3'
      }
    },
    'npm:browserify-des@1.0.0': {
      'map': {
        'cipher-base': 'npm:cipher-base@1.0.4',
        'inherits': 'npm:inherits@2.0.3',
        'des.js': 'npm:des.js@1.0.0'
      }
    },
    'npm:pbkdf2@3.0.12': {
      'map': {
        'ripemd160': 'npm:ripemd160@2.0.1',
        'sha.js': 'npm:sha.js@2.4.8',
        'create-hash': 'npm:create-hash@1.1.3',
        'create-hmac': 'npm:create-hmac@1.1.6',
        'safe-buffer': 'npm:safe-buffer@5.1.1'
      }
    },
    'npm:evp_bytestokey@1.0.0': {
      'map': {
        'create-hash': 'npm:create-hash@1.1.3'
      }
    },
    'npm:elliptic@6.4.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'bn.js': 'npm:bn.js@4.11.7',
        'hmac-drbg': 'npm:hmac-drbg@1.0.1',
        'brorand': 'npm:brorand@1.1.0',
        'hash.js': 'npm:hash.js@1.1.3',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0',
        'minimalistic-crypto-utils': 'npm:minimalistic-crypto-utils@1.0.1'
      }
    },
    'npm:browserify-rsa@4.0.1': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.7',
        'randombytes': 'npm:randombytes@2.0.5'
      }
    },
    'npm:parse-asn1@5.1.0': {
      'map': {
        'browserify-aes': 'npm:browserify-aes@1.0.6',
        'create-hash': 'npm:create-hash@1.1.3',
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.0',
        'pbkdf2': 'npm:pbkdf2@3.0.12',
        'asn1.js': 'npm:asn1.js@4.9.1'
      }
    },
    'npm:ripemd160@2.0.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'hash-base': 'npm:hash-base@2.0.2'
      }
    },
    'npm:sha.js@2.4.8': {
      'map': {
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:miller-rabin@4.0.0': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.7',
        'brorand': 'npm:brorand@1.1.0'
      }
    },
    'npm:des.js@1.0.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'npm:hmac-drbg@1.0.1': {
      'map': {
        'hash.js': 'npm:hash.js@1.1.3',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0',
        'minimalistic-crypto-utils': 'npm:minimalistic-crypto-utils@1.0.1'
      }
    },
    'npm:asn1.js@4.9.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'bn.js': 'npm:bn.js@4.11.7',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'npm:hash-base@2.0.2': {
      'map': {
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:react-router-dom@4.1.1': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.1',
        'history': 'npm:history@4.6.1',
        'prop-types': 'npm:prop-types@15.5.10',
        'react-router': 'npm:react-router@4.1.1'
      }
    },
    'npm:history@4.6.1': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.1',
        'invariant': 'npm:invariant@2.2.2',
        'resolve-pathname': 'npm:resolve-pathname@2.1.0',
        'warning': 'npm:warning@3.0.0',
        'value-equal': 'npm:value-equal@0.2.1'
      }
    },
    'npm:react-router@4.1.1': {
      'map': {
        'history': 'npm:history@4.6.1',
        'loose-envify': 'npm:loose-envify@1.3.1',
        'prop-types': 'npm:prop-types@15.5.10',
        'invariant': 'npm:invariant@2.2.2',
        'warning': 'npm:warning@3.0.0',
        'hoist-non-react-statics': 'npm:hoist-non-react-statics@1.2.0',
        'path-to-regexp': 'npm:path-to-regexp@1.7.0'
      }
    },
    'npm:invariant@2.2.2': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.1'
      }
    },
    'npm:warning@3.0.0': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.1'
      }
    },
    'npm:path-to-regexp@1.7.0': {
      'map': {
        'isarray': 'npm:isarray@0.0.1'
      }
    },
    'npm:redux@3.6.0': {
      'map': {
        'symbol-observable': 'npm:symbol-observable@1.0.4',
        'lodash-es': 'npm:lodash-es@4.17.4',
        'lodash': 'npm:lodash@4.17.4',
        'loose-envify': 'npm:loose-envify@1.3.1'
      }
    },
    'npm:react-dom@16.0.0-alpha.12': {
      'map': {
        'fbjs': 'npm:fbjs@0.8.12',
        'loose-envify': 'npm:loose-envify@1.3.1',
        'object-assign': 'npm:object-assign@4.1.1',
        'prop-types': 'npm:prop-types@15.5.10'
      }
    },
    'npm:react-redux@5.0.4': {
      'map': {
        'create-react-class': 'npm:create-react-class@15.5.3',
        'hoist-non-react-statics': 'npm:hoist-non-react-statics@1.2.0',
        'loose-envify': 'npm:loose-envify@1.3.1',
        'lodash': 'npm:lodash@4.17.4',
        'lodash-es': 'npm:lodash-es@4.17.4',
        'prop-types': 'npm:prop-types@15.5.10',
        'invariant': 'npm:invariant@2.2.2'
      }
    },
    'npm:create-react-class@15.5.3': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.1',
        'fbjs': 'npm:fbjs@0.8.12',
        'object-assign': 'npm:object-assign@4.1.1'
      }
    },
    'npm:redux-logger@3.0.1': {
      'map': {
        'deep-diff': 'npm:deep-diff@0.3.4'
      }
    },
    'npm:react-router-redux@next': {
      'map': {
        'prop-types': 'npm:prop-types@15.5.10',
        'react-router': 'npm:react-router@4.1.1',
        'history': 'npm:history@4.6.1'
      }
    },
    'npm:react@16.0.0-alpha.12': {
      'map': {
        'create-react-class': 'npm:create-react-class@15.6.0',
        'fbjs': 'npm:fbjs@0.8.12',
        'loose-envify': 'npm:loose-envify@1.3.1',
        'object-assign': 'npm:object-assign@4.1.1',
        'prop-types': 'npm:prop-types@15.5.10'
      }
    },
    'npm:koa@2.2.0': {
      'map': {
        'content-disposition': 'npm:content-disposition@0.5.2',
        'accepts': 'npm:accepts@1.3.3',
        'content-type': 'npm:content-type@1.0.2',
        'destroy': 'npm:destroy@1.0.4',
        'depd': 'npm:depd@1.1.0',
        'delegates': 'npm:delegates@1.0.0',
        'escape-html': 'npm:escape-html@1.0.3',
        'fresh': 'npm:fresh@0.5.0',
        'http-errors': 'npm:http-errors@1.6.1',
        'is-generator-function': 'npm:is-generator-function@1.0.6',
        'on-finished': 'npm:on-finished@2.3.0',
        'error-inject': 'npm:error-inject@1.0.0',
        'http-assert': 'npm:http-assert@1.3.0',
        'parseurl': 'npm:parseurl@1.3.1',
        'vary': 'npm:vary@1.1.1',
        'type-is': 'npm:type-is@1.6.15',
        'statuses': 'npm:statuses@1.3.1',
        'debug': 'npm:debug@2.6.6',
        'cookies': 'npm:cookies@0.7.0',
        'koa-is-json': 'npm:koa-is-json@1.0.0',
        'only': 'npm:only@0.0.2',
        'mime-types': 'npm:mime-types@2.1.15',
        'koa-compose': 'npm:koa-compose@3.2.1',
        'koa-convert': 'npm:koa-convert@1.2.0'
      }
    },
    'npm:http-errors@1.6.1': {
      'map': {
        'depd': 'npm:depd@1.1.0',
        'statuses': 'npm:statuses@1.3.1',
        'setprototypeof': 'npm:setprototypeof@1.0.3',
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:http-assert@1.3.0': {
      'map': {
        'http-errors': 'npm:http-errors@1.6.1',
        'deep-equal': 'npm:deep-equal@1.0.1'
      }
    },
    'npm:accepts@1.3.3': {
      'map': {
        'negotiator': 'npm:negotiator@0.6.1',
        'mime-types': 'npm:mime-types@2.1.15'
      }
    },
    'npm:type-is@1.6.15': {
      'map': {
        'media-typer': 'npm:media-typer@0.3.0',
        'mime-types': 'npm:mime-types@2.1.15'
      }
    },
    'npm:on-finished@2.3.0': {
      'map': {
        'ee-first': 'npm:ee-first@1.1.1'
      }
    },
    'npm:cookies@0.7.0': {
      'map': {
        'depd': 'npm:depd@1.1.0',
        'keygrip': 'npm:keygrip@1.0.1'
      }
    },
    'npm:debug@2.6.6': {
      'map': {
        'ms': 'npm:ms@0.7.3'
      }
    },
    'npm:mime-types@2.1.15': {
      'map': {
        'mime-db': 'npm:mime-db@1.27.0'
      }
    },
    'npm:koa-compose@3.2.1': {
      'map': {
        'any-promise': 'npm:any-promise@1.3.0'
      }
    },
    'npm:koa-convert@1.2.0': {
      'map': {
        'koa-compose': 'npm:koa-compose@3.2.1',
        'co': 'npm:co@4.6.0'
      }
    },
    'npm:koa-router@7.1.1': {
      'map': {
        'http-errors': 'npm:http-errors@1.6.1',
        'methods': 'npm:methods@1.1.2',
        'koa-compose': 'npm:koa-compose@3.2.1',
        'debug': 'npm:debug@2.6.6',
        'path-to-regexp': 'npm:path-to-regexp@1.7.0'
      }
    },
    'npm:koa-static@3.0.0': {
      'map': {
        'debug': 'npm:debug@2.6.6',
        'koa-send': 'npm:koa-send@3.3.0'
      }
    },
    'npm:koa-send@3.3.0': {
      'map': {
        'debug': 'npm:debug@2.6.6',
        'mz': 'npm:mz@2.6.0',
        'resolve-path': 'npm:resolve-path@1.3.3',
        'co': 'npm:co@4.6.0'
      }
    },
    'npm:mz@2.6.0': {
      'map': {
        'any-promise': 'npm:any-promise@1.3.0',
        'thenify-all': 'npm:thenify-all@1.6.0',
        'object-assign': 'npm:object-assign@4.1.1'
      }
    },
    'npm:resolve-path@1.3.3': {
      'map': {
        'http-errors': 'npm:http-errors@1.5.1',
        'path-is-absolute': 'npm:path-is-absolute@1.0.1'
      }
    },
    'npm:thenify-all@1.6.0': {
      'map': {
        'thenify': 'npm:thenify@3.2.1'
      }
    },
    'npm:thenify@3.2.1': {
      'map': {
        'any-promise': 'npm:any-promise@1.3.0'
      }
    },
    'npm:http-errors@1.5.1': {
      'map': {
        'statuses': 'npm:statuses@1.3.1',
        'setprototypeof': 'npm:setprototypeof@1.0.2',
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:koa-bodyparser@4.2.0': {
      'map': {
        'co-body': 'npm:co-body@5.1.1',
        'copy-to': 'npm:copy-to@2.0.1'
      }
    },
    'npm:co-body@5.1.1': {
      'map': {
        'qs': 'npm:qs@6.4.0',
        'raw-body': 'npm:raw-body@2.2.0',
        'inflation': 'npm:inflation@2.0.0',
        'type-is': 'npm:type-is@1.6.15'
      }
    },
    'npm:raw-body@2.2.0': {
      'map': {
        'unpipe': 'npm:unpipe@1.0.0',
        'iconv-lite': 'npm:iconv-lite@0.4.15',
        'bytes': 'npm:bytes@2.4.0'
      }
    },
    'npm:koa-send@4.1.0': {
      'map': {
        'debug': 'npm:debug@2.6.6',
        'mz': 'npm:mz@2.6.0',
        'http-errors': 'npm:http-errors@1.6.1',
        'resolve-path': 'npm:resolve-path@1.3.3'
      }
    },
    'npm:monk@4.0.0': {
      'map': {
        'debug': 'npm:debug@2.6.6',
        'mongodb': 'npm:mongodb@2.2.26'
      }
    },
    'npm:mongodb@2.2.26': {
      'map': {
        'es6-promise': 'npm:es6-promise@3.2.1',
        'readable-stream': 'npm:readable-stream@2.2.7',
        'mongodb-core': 'npm:mongodb-core@2.1.10'
      }
    },
    'npm:readable-stream@2.2.7': {
      'map': {
        'buffer-shims': 'npm:buffer-shims@1.0.0',
        'isarray': 'npm:isarray@1.0.0',
        'core-util-is': 'npm:core-util-is@1.0.2',
        'process-nextick-args': 'npm:process-nextick-args@1.0.7',
        'inherits': 'npm:inherits@2.0.3',
        'util-deprecate': 'npm:util-deprecate@1.0.2',
        'string_decoder': 'npm:string_decoder@1.0.0'
      }
    },
    'npm:mongodb-core@2.1.10': {
      'map': {
        'bson': 'npm:bson@1.0.4',
        'require_optional': 'npm:require_optional@1.0.0'
      }
    },
    'npm:require_optional@1.0.0': {
      'map': {
        'resolve-from': 'npm:resolve-from@2.0.0',
        'semver': 'npm:semver@5.3.0'
      }
    },
    'npm:lru-cache@4.0.2': {
      'map': {
        'pseudomap': 'npm:pseudomap@1.0.2',
        'yallist': 'npm:yallist@2.1.2'
      }
    },
    'npm:utf-8-validate@3.0.1': {
      'map': {
        'nan': 'npm:nan@2.5.1',
        'bindings': 'npm:bindings@1.2.1',
        'prebuild-install': 'npm:prebuild-install@2.1.2'
      }
    },
    'npm:prebuild-install@2.1.2': {
      'map': {
        'node-abi': 'npm:node-abi@2.0.2',
        'pump': 'npm:pump@1.0.2',
        'minimist': 'npm:minimist@1.2.0',
        'npmlog': 'npm:npmlog@4.1.0',
        'expand-template': 'npm:expand-template@1.0.3',
        'rc': 'npm:rc@1.2.1',
        'xtend': 'npm:xtend@4.0.1',
        'tunnel-agent': 'npm:tunnel-agent@0.4.3',
        'os-homedir': 'npm:os-homedir@1.0.2',
        'tar-fs': 'npm:tar-fs@1.15.2',
        'mkdirp': 'npm:mkdirp@0.5.1',
        'simple-get': 'npm:simple-get@1.4.3',
        'noop-logger': 'npm:noop-logger@0.1.1',
        'github-from-package': 'npm:github-from-package@0.0.0'
      }
    },
    'npm:rc@1.2.1': {
      'map': {
        'minimist': 'npm:minimist@1.2.0',
        'ini': 'npm:ini@1.3.4',
        'deep-extend': 'npm:deep-extend@0.4.2',
        'strip-json-comments': 'npm:strip-json-comments@2.0.1'
      }
    },
    'npm:tar-fs@1.15.2': {
      'map': {
        'mkdirp': 'npm:mkdirp@0.5.1',
        'pump': 'npm:pump@1.0.2',
        'chownr': 'npm:chownr@1.0.1',
        'tar-stream': 'npm:tar-stream@1.5.4'
      }
    },
    'npm:pump@1.0.2': {
      'map': {
        'end-of-stream': 'npm:end-of-stream@1.4.0',
        'once': 'npm:once@1.4.0'
      }
    },
    'npm:npmlog@4.1.0': {
      'map': {
        'console-control-strings': 'npm:console-control-strings@1.1.0',
        'are-we-there-yet': 'npm:are-we-there-yet@1.1.4',
        'set-blocking': 'npm:set-blocking@2.0.0',
        'gauge': 'npm:gauge@2.7.4'
      }
    },
    'npm:mkdirp@0.5.1': {
      'map': {
        'minimist': 'npm:minimist@0.0.8'
      }
    },
    'npm:simple-get@1.4.3': {
      'map': {
        'xtend': 'npm:xtend@4.0.1',
        'once': 'npm:once@1.4.0',
        'unzip-response': 'npm:unzip-response@1.0.2',
        'node-unzip-response': 'npm:unzip-response@1.0.2'
      }
    },
    'npm:end-of-stream@1.4.0': {
      'map': {
        'once': 'npm:once@1.4.0'
      }
    },
    'npm:gauge@2.7.4': {
      'map': {
        'console-control-strings': 'npm:console-control-strings@1.1.0',
        'strip-ansi': 'npm:strip-ansi@3.0.1',
        'has-unicode': 'npm:has-unicode@2.0.1',
        'object-assign': 'npm:object-assign@4.1.1',
        'aproba': 'npm:aproba@1.1.1',
        'wide-align': 'npm:wide-align@1.1.2',
        'string-width': 'npm:string-width@1.0.2',
        'signal-exit': 'npm:signal-exit@3.0.2'
      }
    },
    'npm:are-we-there-yet@1.1.4': {
      'map': {
        'delegates': 'npm:delegates@1.0.0',
        'readable-stream': 'npm:readable-stream@2.2.9'
      }
    },
    'npm:once@1.4.0': {
      'map': {
        'wrappy': 'npm:wrappy@1.0.2'
      }
    },
    'npm:tar-stream@1.5.4': {
      'map': {
        'readable-stream': 'npm:readable-stream@2.2.9',
        'xtend': 'npm:xtend@4.0.1',
        'end-of-stream': 'npm:end-of-stream@1.4.0',
        'bl': 'npm:bl@1.2.1'
      }
    },
    'npm:wide-align@1.1.2': {
      'map': {
        'string-width': 'npm:string-width@1.0.2'
      }
    },
    'npm:string-width@1.0.2': {
      'map': {
        'strip-ansi': 'npm:strip-ansi@3.0.1',
        'is-fullwidth-code-point': 'npm:is-fullwidth-code-point@1.0.0',
        'code-point-at': 'npm:code-point-at@1.1.0'
      }
    },
    'npm:strip-ansi@3.0.1': {
      'map': {
        'ansi-regex': 'npm:ansi-regex@2.1.1'
      }
    },
    'npm:bl@1.2.1': {
      'map': {
        'readable-stream': 'npm:readable-stream@2.2.9'
      }
    },
    'npm:is-fullwidth-code-point@1.0.0': {
      'map': {
        'number-is-nan': 'npm:number-is-nan@1.0.1'
      }
    },
    'npm:eslint-plugin-node@4.2.2': {
      'map': {
        'object-assign': 'npm:object-assign@4.1.1',
        'semver': 'npm:semver@5.3.0',
        'minimatch': 'npm:minimatch@3.0.4',
        'resolve': 'npm:resolve@1.3.3',
        'ignore': 'npm:ignore@3.3.0'
      }
    },
    'npm:eslint@3.19.0': {
      'map': {
        'debug': 'npm:debug@2.6.6',
        'esutils': 'npm:esutils@2.0.2',
        'lodash': 'npm:lodash@4.17.4',
        'mkdirp': 'npm:mkdirp@0.5.1',
        'strip-json-comments': 'npm:strip-json-comments@2.0.1',
        'globals': 'npm:globals@9.17.0',
        'user-home': 'npm:user-home@2.0.0',
        'babel-code-frame': 'npm:babel-code-frame@6.22.0',
        'esquery': 'npm:esquery@1.0.0',
        'is-resolvable': 'npm:is-resolvable@1.0.0',
        'path-is-inside': 'npm:path-is-inside@1.0.2',
        'require-uncached': 'npm:require-uncached@1.0.3',
        'strip-bom': 'npm:strip-bom@3.0.0',
        'natural-compare': 'npm:natural-compare@1.4.0',
        'json-stable-stringify': 'npm:json-stable-stringify@1.0.1',
        'text-table': 'npm:text-table@0.2.0',
        'file-entry-cache': 'npm:file-entry-cache@2.0.0',
        'levn': 'npm:levn@0.3.0',
        'progress': 'npm:progress@1.1.8',
        'imurmurhash': 'npm:imurmurhash@0.1.4',
        'pluralize': 'npm:pluralize@1.2.1',
        'concat-stream': 'npm:concat-stream@1.6.0',
        'doctrine': 'npm:doctrine@2.0.0',
        'escope': 'npm:escope@3.6.0',
        'estraverse': 'npm:estraverse@4.2.0',
        'optionator': 'npm:optionator@0.8.2',
        'ignore': 'npm:ignore@3.3.0',
        'is-my-json-valid': 'npm:is-my-json-valid@2.16.0',
        'table': 'npm:table@3.8.3',
        'js-yaml': 'npm:js-yaml@3.8.4',
        'shelljs': 'npm:shelljs@0.7.7',
        'chalk': 'npm:chalk@1.1.3',
        'espree': 'npm:espree@3.4.3',
        'inquirer': 'npm:inquirer@0.12.0',
        'glob': 'npm:glob@7.1.1'
      }
    },
    'npm:eslint-plugin-import@2.2.0': {
      'map': {
        'debug': 'npm:debug@2.6.6',
        'minimatch': 'npm:minimatch@3.0.4',
        'eslint-module-utils': 'npm:eslint-module-utils@2.0.0',
        'builtin-modules': 'npm:builtin-modules@1.1.1',
        'eslint-import-resolver-node': 'npm:eslint-import-resolver-node@0.2.3',
        'has': 'npm:has@1.0.1',
        'pkg-up': 'npm:pkg-up@1.0.0',
        'contains-path': 'npm:contains-path@0.1.0',
        'lodash.cond': 'npm:lodash.cond@4.5.2',
        'doctrine': 'npm:doctrine@1.5.0'
      }
    },
    'npm:babel-code-frame@6.22.0': {
      'map': {
        'esutils': 'npm:esutils@2.0.2',
        'js-tokens': 'npm:js-tokens@3.0.1',
        'chalk': 'npm:chalk@1.1.3'
      }
    },
    'npm:user-home@2.0.0': {
      'map': {
        'os-homedir': 'npm:os-homedir@1.0.2'
      }
    },
    'npm:esquery@1.0.0': {
      'map': {
        'estraverse': 'npm:estraverse@4.2.0'
      }
    },
    'npm:require-uncached@1.0.3': {
      'map': {
        'resolve-from': 'npm:resolve-from@1.0.1',
        'caller-path': 'npm:caller-path@0.1.0'
      }
    },
    'npm:eslint-import-resolver-node@0.2.3': {
      'map': {
        'debug': 'npm:debug@2.6.6',
        'object-assign': 'npm:object-assign@4.1.1',
        'resolve': 'npm:resolve@1.3.3'
      }
    },
    'npm:pkg-up@1.0.0': {
      'map': {
        'find-up': 'npm:find-up@1.1.2'
      }
    },
    'npm:file-entry-cache@2.0.0': {
      'map': {
        'object-assign': 'npm:object-assign@4.1.1',
        'flat-cache': 'npm:flat-cache@1.2.2'
      }
    },
    'npm:minimatch@3.0.4': {
      'map': {
        'brace-expansion': 'npm:brace-expansion@1.1.7'
      }
    },
    'npm:eslint-module-utils@2.0.0': {
      'map': {
        'debug': 'npm:debug@2.2.0',
        'pkg-dir': 'npm:pkg-dir@1.0.0'
      }
    },
    'npm:concat-stream@1.6.0': {
      'map': {
        'readable-stream': 'npm:readable-stream@2.2.9',
        'inherits': 'npm:inherits@2.0.3',
        'typedarray': 'npm:typedarray@0.0.6'
      }
    },
    'npm:doctrine@2.0.0': {
      'map': {
        'esutils': 'npm:esutils@2.0.2',
        'isarray': 'npm:isarray@1.0.0'
      }
    },
    'npm:doctrine@1.5.0': {
      'map': {
        'esutils': 'npm:esutils@2.0.2',
        'isarray': 'npm:isarray@1.0.0'
      }
    },
    'npm:escope@3.6.0': {
      'map': {
        'estraverse': 'npm:estraverse@4.2.0',
        'es6-map': 'npm:es6-map@0.1.5',
        'esrecurse': 'npm:esrecurse@4.1.0',
        'es6-weak-map': 'npm:es6-weak-map@2.0.2'
      }
    },
    'npm:find-up@1.1.2': {
      'map': {
        'path-exists': 'npm:path-exists@2.1.0',
        'pinkie-promise': 'npm:pinkie-promise@2.0.1'
      }
    },
    'npm:optionator@0.8.2': {
      'map': {
        'levn': 'npm:levn@0.3.0',
        'prelude-ls': 'npm:prelude-ls@1.1.2',
        'type-check': 'npm:type-check@0.3.2',
        'deep-is': 'npm:deep-is@0.1.3',
        'wordwrap': 'npm:wordwrap@1.0.0',
        'fast-levenshtein': 'npm:fast-levenshtein@2.0.6'
      }
    },
    'npm:rimraf@2.6.1': {
      'map': {
        'glob': 'npm:glob@7.1.1'
      }
    },
    'npm:is-my-json-valid@2.16.0': {
      'map': {
        'xtend': 'npm:xtend@4.0.1',
        'generate-object-property': 'npm:generate-object-property@1.2.0',
        'generate-function': 'npm:generate-function@2.0.0',
        'jsonpointer': 'npm:jsonpointer@4.0.1'
      }
    },
    'npm:table@3.8.3': {
      'map': {
        'lodash': 'npm:lodash@4.17.4',
        'chalk': 'npm:chalk@1.1.3',
        'string-width': 'npm:string-width@2.0.0',
        'slice-ansi': 'npm:slice-ansi@0.0.4',
        'ajv-keywords': 'npm:ajv-keywords@1.5.1',
        'ajv': 'npm:ajv@4.11.8'
      }
    },
    'npm:shelljs@0.7.7': {
      'map': {
        'glob': 'npm:glob@7.1.1',
        'rechoir': 'npm:rechoir@0.6.2',
        'interpret': 'npm:interpret@1.0.3'
      }
    },
    'npm:is-resolvable@1.0.0': {
      'map': {
        'tryit': 'npm:tryit@1.0.3'
      }
    },
    'npm:has@1.0.1': {
      'map': {
        'function-bind': 'npm:function-bind@1.1.0'
      }
    },
    'npm:path-exists@2.1.0': {
      'map': {
        'pinkie-promise': 'npm:pinkie-promise@2.0.1'
      }
    },
    'npm:resolve@1.3.3': {
      'map': {
        'path-parse': 'npm:path-parse@1.0.5'
      }
    },
    'npm:json-stable-stringify@1.0.1': {
      'map': {
        'jsonify': 'npm:jsonify@0.0.0'
      }
    },
    'npm:inquirer@0.12.0': {
      'map': {
        'ansi-regex': 'npm:ansi-regex@2.1.1',
        'lodash': 'npm:lodash@4.17.4',
        'string-width': 'npm:string-width@1.0.2',
        'strip-ansi': 'npm:strip-ansi@3.0.1',
        'chalk': 'npm:chalk@1.1.3',
        'cli-cursor': 'npm:cli-cursor@1.0.2',
        'cli-width': 'npm:cli-width@2.1.0',
        'readline2': 'npm:readline2@1.0.1',
        'ansi-escapes': 'npm:ansi-escapes@1.4.0',
        'run-async': 'npm:run-async@0.1.0',
        'figures': 'npm:figures@1.7.0',
        'through': 'npm:through@2.3.8',
        'rx-lite': 'npm:rx-lite@3.1.2'
      }
    },
    'npm:levn@0.3.0': {
      'map': {
        'prelude-ls': 'npm:prelude-ls@1.1.2',
        'type-check': 'npm:type-check@0.3.2'
      }
    },
    'npm:glob@7.1.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'once': 'npm:once@1.4.0',
        'path-is-absolute': 'npm:path-is-absolute@1.0.1',
        'minimatch': 'npm:minimatch@3.0.4',
        'fs.realpath': 'npm:fs.realpath@1.0.0',
        'inflight': 'npm:inflight@1.0.6'
      }
    },
    'npm:chalk@1.1.3': {
      'map': {
        'supports-color': 'npm:supports-color@2.0.0',
        'strip-ansi': 'npm:strip-ansi@3.0.1',
        'ansi-styles': 'npm:ansi-styles@2.2.1',
        'has-ansi': 'npm:has-ansi@2.0.0',
        'escape-string-regexp': 'npm:escape-string-regexp@1.0.5'
      }
    },
    'npm:brace-expansion@1.1.7': {
      'map': {
        'balanced-match': 'npm:balanced-match@0.4.2',
        'concat-map': 'npm:concat-map@0.0.1'
      }
    },
    'npm:pkg-dir@1.0.0': {
      'map': {
        'find-up': 'npm:find-up@1.1.2'
      }
    },
    'npm:string-width@2.0.0': {
      'map': {
        'strip-ansi': 'npm:strip-ansi@3.0.1',
        'is-fullwidth-code-point': 'npm:is-fullwidth-code-point@2.0.0'
      }
    },
    'npm:type-check@0.3.2': {
      'map': {
        'prelude-ls': 'npm:prelude-ls@1.1.2'
      }
    },
    'npm:flat-cache@1.2.2': {
      'map': {
        'graceful-fs': 'npm:graceful-fs@4.1.11',
        'circular-json': 'npm:circular-json@0.3.1',
        'del': 'npm:del@2.2.2',
        'write': 'npm:write@0.2.1'
      }
    },
    'npm:js-yaml@3.8.4': {
      'map': {
        'argparse': 'npm:argparse@1.0.9',
        'esprima': 'npm:esprima@3.1.3'
      }
    },
    'npm:debug@2.2.0': {
      'map': {
        'ms': 'npm:ms@0.7.1'
      }
    },
    'npm:espree@3.4.3': {
      'map': {
        'acorn-jsx': 'npm:acorn-jsx@3.0.1',
        'acorn': 'npm:acorn@5.0.3'
      }
    },
    'npm:esrecurse@4.1.0': {
      'map': {
        'estraverse': 'npm:estraverse@4.1.1',
        'object-assign': 'npm:object-assign@4.1.1'
      }
    },
    'npm:readline2@1.0.1': {
      'map': {
        'code-point-at': 'npm:code-point-at@1.1.0',
        'is-fullwidth-code-point': 'npm:is-fullwidth-code-point@1.0.0',
        'mute-stream': 'npm:mute-stream@0.0.5'
      }
    },
    'npm:rechoir@0.6.2': {
      'map': {
        'resolve': 'npm:resolve@1.3.3'
      }
    },
    'npm:run-async@0.1.0': {
      'map': {
        'once': 'npm:once@1.4.0'
      }
    },
    'npm:caller-path@0.1.0': {
      'map': {
        'callsites': 'npm:callsites@0.2.0'
      }
    },
    'npm:pinkie-promise@2.0.1': {
      'map': {
        'pinkie': 'npm:pinkie@2.0.4'
      }
    },
    'npm:figures@1.7.0': {
      'map': {
        'object-assign': 'npm:object-assign@4.1.1',
        'escape-string-regexp': 'npm:escape-string-regexp@1.0.5'
      }
    },
    'npm:inflight@1.0.6': {
      'map': {
        'once': 'npm:once@1.4.0',
        'wrappy': 'npm:wrappy@1.0.2'
      }
    },
    'npm:has-ansi@2.0.0': {
      'map': {
        'ansi-regex': 'npm:ansi-regex@2.1.1'
      }
    },
    'npm:acorn-jsx@3.0.1': {
      'map': {
        'acorn': 'npm:acorn@3.3.0'
      }
    },
    'npm:generate-object-property@1.2.0': {
      'map': {
        'is-property': 'npm:is-property@1.0.2'
      }
    },
    'npm:es6-map@0.1.5': {
      'map': {
        'd': 'npm:d@1.0.0',
        'es6-iterator': 'npm:es6-iterator@2.0.1',
        'es6-set': 'npm:es6-set@0.1.5',
        'es6-symbol': 'npm:es6-symbol@3.1.1',
        'event-emitter': 'npm:event-emitter@0.3.5',
        'es5-ext': 'npm:es5-ext@0.10.16'
      }
    },
    'npm:es6-weak-map@2.0.2': {
      'map': {
        'd': 'npm:d@1.0.0',
        'es6-iterator': 'npm:es6-iterator@2.0.1',
        'es6-symbol': 'npm:es6-symbol@3.1.1',
        'es5-ext': 'npm:es5-ext@0.10.16'
      }
    },
    'npm:cli-cursor@1.0.2': {
      'map': {
        'restore-cursor': 'npm:restore-cursor@1.0.1'
      }
    },
    'npm:argparse@1.0.9': {
      'map': {
        'sprintf-js': 'npm:sprintf-js@1.0.3'
      }
    },
    'npm:del@2.2.2': {
      'map': {
        'object-assign': 'npm:object-assign@4.1.1',
        'pinkie-promise': 'npm:pinkie-promise@2.0.1',
        'rimraf': 'npm:rimraf@2.6.1',
        'is-path-in-cwd': 'npm:is-path-in-cwd@1.0.0',
        'is-path-cwd': 'npm:is-path-cwd@1.0.0',
        'pify': 'npm:pify@2.3.0',
        'globby': 'npm:globby@5.0.0'
      }
    },
    'npm:write@0.2.1': {
      'map': {
        'mkdirp': 'npm:mkdirp@0.5.1'
      }
    },
    'npm:es6-iterator@2.0.1': {
      'map': {
        'd': 'npm:d@1.0.0',
        'es6-symbol': 'npm:es6-symbol@3.1.1',
        'es5-ext': 'npm:es5-ext@0.10.16'
      }
    },
    'npm:es6-set@0.1.5': {
      'map': {
        'd': 'npm:d@1.0.0',
        'es6-iterator': 'npm:es6-iterator@2.0.1',
        'es6-symbol': 'npm:es6-symbol@3.1.1',
        'event-emitter': 'npm:event-emitter@0.3.5',
        'es5-ext': 'npm:es5-ext@0.10.16'
      }
    },
    'npm:kind-of@3.2.0': {
      'map': {
        'is-buffer': 'npm:is-buffer@1.1.5'
      }
    },
    'npm:es6-symbol@3.1.1': {
      'map': {
        'd': 'npm:d@1.0.0',
        'es5-ext': 'npm:es5-ext@0.10.16'
      }
    },
    'npm:event-emitter@0.3.5': {
      'map': {
        'd': 'npm:d@1.0.0',
        'es5-ext': 'npm:es5-ext@0.10.16'
      }
    },
    'npm:d@1.0.0': {
      'map': {
        'es5-ext': 'npm:es5-ext@0.10.16'
      }
    },
    'npm:es5-ext@0.10.16': {
      'map': {
        'es6-iterator': 'npm:es6-iterator@2.0.1',
        'es6-symbol': 'npm:es6-symbol@3.1.1'
      }
    },
    'npm:restore-cursor@1.0.1': {
      'map': {
        'exit-hook': 'npm:exit-hook@1.1.1',
        'onetime': 'npm:onetime@1.1.0'
      }
    },
    'npm:globby@5.0.0': {
      'map': {
        'arrify': 'npm:arrify@1.0.1',
        'object-assign': 'npm:object-assign@4.1.1',
        'glob': 'npm:glob@7.1.1',
        'pify': 'npm:pify@2.3.0',
        'pinkie-promise': 'npm:pinkie-promise@2.0.1',
        'array-union': 'npm:array-union@1.0.2'
      }
    },
    'npm:ajv@5.0.1': {
      'map': {
        'co': 'npm:co@4.6.0',
        'json-stable-stringify': 'npm:json-stable-stringify@1.0.1'
      }
    },
    'npm:ajv@4.11.8': {
      'map': {
        'co': 'npm:co@4.6.0',
        'json-stable-stringify': 'npm:json-stable-stringify@1.0.1'
      }
    },
    'npm:uglify-js@2.8.24': {
      'map': {
        'yargs': 'npm:yargs@3.10.0',
        'source-map': 'npm:source-map@0.5.6'
      }
    },
    'npm:is-path-in-cwd@1.0.0': {
      'map': {
        'is-path-inside': 'npm:is-path-inside@1.0.0'
      }
    },
    'npm:yargs@3.10.0': {
      'map': {
        'camelcase': 'npm:camelcase@1.2.1',
        'cliui': 'npm:cliui@2.1.0',
        'decamelize': 'npm:decamelize@1.2.0',
        'window-size': 'npm:window-size@0.1.0'
      }
    },
    'npm:is-path-inside@1.0.0': {
      'map': {
        'path-is-inside': 'npm:path-is-inside@1.0.2'
      }
    },
    'npm:cliui@2.1.0': {
      'map': {
        'wordwrap': 'npm:wordwrap@0.0.2',
        'center-align': 'npm:center-align@0.1.3',
        'right-align': 'npm:right-align@0.1.3'
      }
    },
    'npm:array-union@1.0.2': {
      'map': {
        'array-uniq': 'npm:array-uniq@1.0.3'
      }
    },
    'npm:center-align@0.1.3': {
      'map': {
        'align-text': 'npm:align-text@0.1.4',
        'lazy-cache': 'npm:lazy-cache@1.0.4'
      }
    },
    'npm:right-align@0.1.3': {
      'map': {
        'align-text': 'npm:align-text@0.1.4'
      }
    },
    'npm:align-text@0.1.4': {
      'map': {
        'kind-of': 'npm:kind-of@3.2.0',
        'repeat-string': 'npm:repeat-string@1.6.1',
        'longest': 'npm:longest@1.0.1'
      }
    },
    'npm:ws@1.1.4': {
      'map': {
        'options': 'npm:options@0.0.6',
        'bufferutil': 'npm:bufferutil@1.2.1',
        'ultron': 'npm:ultron@1.0.2',
        'utf-8-validate': 'npm:utf-8-validate@1.2.2'
      }
    },
    'npm:utf-8-validate@1.2.2': {
      'map': {
        'nan': 'npm:nan@2.4.0',
        'bindings': 'npm:bindings@1.2.1'
      }
    },
    'npm:bufferutil@1.2.1': {
      'map': {
        'nan': 'npm:nan@2.6.2',
        'bindings': 'npm:bindings@1.2.1'
      }
    },
    'npm:koa-etag@3.0.0': {
      'map': {
        'mz': 'npm:mz@2.6.0',
        'etag': 'npm:etag@1.8.0'
      }
    },
    'npm:supports-color@3.2.3': {
      'map': {
        'has-flag': 'npm:has-flag@1.0.0'
      }
    },
    'npm:string_decoder@1.0.1': {
      'map': {
        'safe-buffer': 'npm:safe-buffer@5.0.1'
      }
    },
    'npm:babel-runtime@6.23.0': {
      'map': {
        'core-js': 'npm:core-js@2.4.1',
        'regenerator-runtime': 'npm:regenerator-runtime@0.10.5'
      }
    },
    'npm:babel-types@6.24.1': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.23.0',
        'esutils': 'npm:esutils@2.0.2',
        'to-fast-properties': 'npm:to-fast-properties@1.0.3',
        'lodash': 'npm:lodash@4.17.4'
      }
    },
    'npm:babel-plugin-styled-components@1.1.7': {
      'map': {
        'stylis': 'npm:stylis@3.2.3'
      }
    },
    'npm:styled-components@2.1.1': {
      'map': {
        'is-plain-object': 'npm:is-plain-object@2.0.4',
        'prop-types': 'npm:prop-types@15.5.10',
        'buffer': 'npm:buffer@5.0.6',
        'supports-color': 'npm:supports-color@3.2.3',
        'stylis': 'npm:stylis@3.2.3',
        'fbjs': 'npm:fbjs@0.8.12',
        'hoist-non-react-statics': 'npm:hoist-non-react-statics@1.2.0',
        'is-function': 'npm:is-function@1.0.1',
        'css-to-react-native': 'npm:css-to-react-native@2.0.4'
      }
    },
    'npm:is-plain-object@2.0.4': {
      'map': {
        'isobject': 'npm:isobject@3.0.1'
      }
    },
    'npm:create-react-class@15.6.0': {
      'map': {
        'fbjs': 'npm:fbjs@0.8.12',
        'loose-envify': 'npm:loose-envify@1.3.1',
        'object-assign': 'npm:object-assign@4.1.1'
      }
    },
    'npm:promise@7.3.1': {
      'map': {
        'asap': 'npm:asap@2.0.6'
      }
    },
    'npm:crypto-browserify@3.11.1': {
      'map': {
        'create-ecdh': 'npm:create-ecdh@4.0.0',
        'browserify-sign': 'npm:browserify-sign@4.0.4',
        'create-hash': 'npm:create-hash@1.1.3',
        'create-hmac': 'npm:create-hmac@1.1.6',
        'inherits': 'npm:inherits@2.0.3',
        'diffie-hellman': 'npm:diffie-hellman@5.0.2',
        'public-encrypt': 'npm:public-encrypt@4.0.0',
        'pbkdf2': 'npm:pbkdf2@3.0.12',
        'randombytes': 'npm:randombytes@2.0.5',
        'browserify-cipher': 'npm:browserify-cipher@1.0.0'
      }
    },
    'npm:css-to-react-native@2.0.4': {
      'map': {
        'fbjs': 'npm:fbjs@0.8.12',
        'css-color-keywords': 'npm:css-color-keywords@1.0.0',
        'postcss-value-parser': 'npm:postcss-value-parser@3.3.0'
      }
    },
    'npm:node-fetch@1.7.1': {
      'map': {
        'encoding': 'npm:encoding@0.1.12',
        'is-stream': 'npm:is-stream@1.1.0'
      }
    },
    'npm:randombytes@2.0.5': {
      'map': {
        'safe-buffer': 'npm:safe-buffer@5.1.1'
      }
    },
    'npm:cipher-base@1.0.4': {
      'map': {
        'safe-buffer': 'npm:safe-buffer@5.1.1',
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:stream-http@2.7.2': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'builtin-status-codes': 'npm:builtin-status-codes@3.0.0',
        'to-arraybuffer': 'npm:to-arraybuffer@1.0.1',
        'xtend': 'npm:xtend@4.0.1',
        'readable-stream': 'npm:readable-stream@2.3.3'
      }
    },
    'npm:hash.js@1.1.3': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'npm:readable-stream@2.3.3': {
      'map': {
        'string_decoder': 'npm:string_decoder@1.0.3',
        'inherits': 'npm:inherits@2.0.3',
        'safe-buffer': 'npm:safe-buffer@5.1.1',
        'util-deprecate': 'npm:util-deprecate@1.0.2',
        'core-util-is': 'npm:core-util-is@1.0.2',
        'process-nextick-args': 'npm:process-nextick-args@1.0.7',
        'isarray': 'npm:isarray@1.0.0'
      }
    },
    'npm:string_decoder@1.0.3': {
      'map': {
        'safe-buffer': 'npm:safe-buffer@5.1.1'
      }
    }
  }
});
