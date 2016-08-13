SystemJS.config({
  paths: {
    'npm:': 'jspm_packages/npm/',
    'github:': 'jspm_packages/github/',
    'server': 'server/',
    'client': 'client/',
    'common': 'common/'
  },
  devConfig: {
    'map': {
      'plugin-babel': 'npm:systemjs-plugin-babel@0.0.12',
      'babel-plugin-transform-react-jsx': 'npm:babel-plugin-transform-react-jsx@6.8.0'
    },
    'packages': {
      'npm:babel-plugin-transform-react-jsx@6.8.0': {
        'map': {
          'babel-runtime': 'npm:babel-runtime@6.9.2',
          'babel-plugin-syntax-jsx': 'npm:babel-plugin-syntax-jsx@6.8.0',
          'babel-helper-builder-react-jsx': 'npm:babel-helper-builder-react-jsx@6.9.0'
        }
      },
      'npm:babel-runtime@6.9.2': {
        'map': {
          'core-js': 'npm:core-js@2.4.1',
          'regenerator-runtime': 'npm:regenerator-runtime@0.9.5'
        }
      },
      'npm:babel-plugin-syntax-jsx@6.8.0': {
        'map': {
          'babel-runtime': 'npm:babel-runtime@6.9.2'
        }
      },
      'npm:babel-helper-builder-react-jsx@6.9.0': {
        'map': {
          'babel-runtime': 'npm:babel-runtime@6.9.2',
          'babel-types': 'npm:babel-types@6.11.1',
          'esutils': 'npm:esutils@2.0.2',
          'lodash': 'npm:lodash@4.13.1'
        }
      }
    }
  },
  transpiler: 'plugin-babel',
  packages: {
    'server': {
      'meta': {
        '*.js': {
          'loader': 'plugin-babel',
          'babelOptions': {
            'plugins': [
              'babel-plugin-transform-react-jsx'
            ]
          }
        },
        '*.scss': {
          'loader': 'sass'
        },
        '*.json': {
          'loader': 'json'
        }
      }
    },
    'client': {
      'meta': {
        '*.js': {
          'loader': 'plugin-babel',
          'babelOptions': {
            'plugins': [
              'babel-plugin-transform-react-jsx'
            ]
          }
        },
        '*.scss': {
          'loader': 'sass'
        },
        '*.json': {
          'loader': 'json'
        }
      }
    },
    'common': {
      'meta': {
        '*.js': {
          'loader': 'plugin-babel',
          'babelOptions': {
            'plugins': [
              'babel-plugin-transform-react-jsx'
            ]
          }
        },
        '*.scss': {
          'loader': 'sass'
        },
        '*.json': {
          'loader': 'json'
        }
      }
    }
  }
})

SystemJS.config({
  packageConfigPaths: [
    'npm:@*/*.json',
    'npm:*.json',
    'github:*/*.json'
  ],
  map: {
    'assert': 'github:jspm/nodelibs-assert@0.2.0-alpha',
    'babel-plugin-transform-runtime': 'npm:babel-plugin-transform-runtime@6.12.0',
    'babel-preset-es2015': 'npm:babel-preset-es2015@6.9.0',
    'babel-preset-es2017': 'npm:babel-preset-es2017@1.6.1',
    'bcryptjs': 'npm:bcryptjs@2.3.0',
    'buffer': 'github:jspm/nodelibs-buffer@0.2.0-alpha',
    'child_process': 'github:jspm/nodelibs-child_process@0.2.0-alpha',
    'constants': 'github:jspm/nodelibs-constants@0.2.0-alpha',
    'core-js': 'npm:core-js@2.4.1',
    'crypto': 'github:jspm/nodelibs-crypto@0.2.0-alpha',
    'dns': 'github:jspm/nodelibs-dns@0.2.0-alpha',
    'domain': 'github:jspm/nodelibs-domain@0.2.0-alpha',
    'dotenv': 'npm:dotenv@2.0.0',
    'events': 'github:jspm/nodelibs-events@0.2.0-alpha',
    'fs': 'github:jspm/nodelibs-fs@0.2.0-alpha',
    'graceful-fs': 'npm:graceful-fs@4.1.4',
    'http': 'github:jspm/nodelibs-http@0.2.0-alpha',
    'https': 'github:jspm/nodelibs-https@0.2.0-alpha',
    'json': 'github:systemjs/plugin-json@0.1.2',
    'koa': 'npm:koa@2.0.0',
    'koa-bodyparser': 'npm:koa-bodyparser@3.1.0',
    'koa-convert': 'npm:koa-convert@1.2.0',
    'koa-router': 'npm:koa-router@7.0.1',
    'koa-send': 'npm:koa-send@3.2.0',
    'koa-static': 'npm:koa-static@2.0.0',
    'lru-cache': 'npm:lru-cache@4.0.1',
    'module': 'github:jspm/nodelibs-module@0.2.0-alpha',
    'monk': 'npm:monk@3.0.7',
    'net': 'github:jspm/nodelibs-net@0.2.0-alpha',
    'path': 'github:jspm/nodelibs-path@0.2.0-alpha',
    'process': 'github:jspm/nodelibs-process@0.2.0-alpha',
    'querystring': 'github:jspm/nodelibs-querystring@0.2.0-alpha',
    'react': 'npm:react@15.2.1',
    'react-dnd': 'npm:react-dnd@2.1.4',
    'react-dnd-html5-backend': 'npm:react-dnd-html5-backend@2.1.2',
    'react-dom': 'npm:react-dom@15.2.1',
    'react-router': 'npm:react-router@2.6.0',
    'react-tether': 'npm:react-tether@0.5.2',
    'readline': 'github:jspm/nodelibs-readline@0.2.0-alpha',
    'sass': 'github:mobilexag/plugin-sass@0.4.6',
    'stream': 'github:jspm/nodelibs-stream@0.2.0-alpha',
    'string_decoder': 'github:jspm/nodelibs-string_decoder@0.2.0-alpha',
    'systemjs-hot-reloader': 'github:capaj/systemjs-hot-reloader@0.6.0',
    'timers': 'github:jspm/nodelibs-timers@0.2.0-alpha',
    'tls': 'github:jspm/nodelibs-tls@0.2.0-alpha',
    'tty': 'github:jspm/nodelibs-tty@0.2.0-alpha',
    'url': 'github:jspm/nodelibs-url@0.2.0-alpha',
    'util': 'github:jspm/nodelibs-util@0.2.0-alpha',
    'vm': 'github:jspm/nodelibs-vm@0.2.0-alpha',
    'whatwg-fetch': 'npm:whatwg-fetch@1.0.0',
    'zlib': 'github:jspm/nodelibs-zlib@0.2.0-alpha'
  },
  packages: {
    'npm:koa@2.0.0': {
      'map': {
        'debug': 'npm:debug@2.2.0',
        'accepts': 'npm:accepts@1.3.3',
        'content-disposition': 'npm:content-disposition@0.5.1',
        'content-type': 'npm:content-type@1.0.2',
        'depd': 'npm:depd@1.1.0',
        'destroy': 'npm:destroy@1.0.4',
        'escape-html': 'npm:escape-html@1.0.3',
        'http-errors': 'npm:http-errors@1.5.0',
        'is-generator-function': 'npm:is-generator-function@1.0.3',
        'fresh': 'npm:fresh@0.3.0',
        'mime-types': 'npm:mime-types@2.1.11',
        'cookies': 'npm:cookies@0.6.1',
        'on-finished': 'npm:on-finished@2.3.0',
        'parseurl': 'npm:parseurl@1.3.1',
        'statuses': 'npm:statuses@1.3.0',
        'type-is': 'npm:type-is@1.6.13',
        'vary': 'npm:vary@1.1.0',
        'only': 'npm:only@0.0.2',
        'koa-is-json': 'npm:koa-is-json@1.0.0',
        'koa-compose': 'npm:koa-compose@3.1.0',
        'error-inject': 'npm:error-inject@1.0.0',
        'http-assert': 'npm:http-assert@1.2.0',
        'delegates': 'npm:delegates@1.0.0',
        'koa-convert': 'npm:koa-convert@1.2.0'
      }
    },
    'npm:accepts@1.3.3': {
      'map': {
        'mime-types': 'npm:mime-types@2.1.11',
        'negotiator': 'npm:negotiator@0.6.1'
      }
    },
    'npm:http-errors@1.5.0': {
      'map': {
        'statuses': 'npm:statuses@1.3.0',
        'inherits': 'npm:inherits@2.0.1',
        'setprototypeof': 'npm:setprototypeof@1.0.1'
      }
    },
    'npm:debug@2.2.0': {
      'map': {
        'ms': 'npm:ms@0.7.1'
      }
    },
    'npm:cookies@0.6.1': {
      'map': {
        'depd': 'npm:depd@1.1.0',
        'keygrip': 'npm:keygrip@1.0.1'
      }
    },
    'npm:type-is@1.6.13': {
      'map': {
        'mime-types': 'npm:mime-types@2.1.11',
        'media-typer': 'npm:media-typer@0.3.0'
      }
    },
    'npm:mime-types@2.1.11': {
      'map': {
        'mime-db': 'npm:mime-db@1.23.0'
      }
    },
    'npm:http-assert@1.2.0': {
      'map': {
        'http-errors': 'npm:http-errors@1.4.0',
        'deep-equal': 'npm:deep-equal@1.0.1'
      }
    },
    'npm:on-finished@2.3.0': {
      'map': {
        'ee-first': 'npm:ee-first@1.1.1'
      }
    },
    'npm:http-errors@1.4.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'statuses': 'npm:statuses@1.3.0'
      }
    },
    'npm:koa-convert@1.2.0': {
      'map': {
        'koa-compose': 'npm:koa-compose@3.1.0',
        'co': 'npm:co@4.6.0'
      }
    },
    'npm:koa-compose@3.1.0': {
      'map': {
        'any-promise': 'npm:any-promise@1.3.0'
      }
    },
    'github:jspm/nodelibs-stream@0.2.0-alpha': {
      'map': {
        'stream-browserify': 'npm:stream-browserify@2.0.1'
      }
    },
    'npm:stream-browserify@2.0.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'readable-stream': 'npm:readable-stream@2.1.4'
      }
    },
    'github:jspm/nodelibs-url@0.2.0-alpha': {
      'map': {
        'url-browserify': 'npm:url@0.11.0'
      }
    },
    'npm:readable-stream@2.1.4': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'buffer-shims': 'npm:buffer-shims@1.0.0',
        'core-util-is': 'npm:core-util-is@1.0.2',
        'isarray': 'npm:isarray@1.0.0',
        'process-nextick-args': 'npm:process-nextick-args@1.0.7',
        'string_decoder': 'npm:string_decoder@0.10.31',
        'util-deprecate': 'npm:util-deprecate@1.0.2'
      }
    },
    'npm:url@0.11.0': {
      'map': {
        'punycode': 'npm:punycode@1.3.2',
        'querystring': 'npm:querystring@0.2.0'
      }
    },
    'github:jspm/nodelibs-crypto@0.2.0-alpha': {
      'map': {
        'crypto-browserify': 'npm:crypto-browserify@3.11.0'
      }
    },
    'npm:crypto-browserify@3.11.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'browserify-cipher': 'npm:browserify-cipher@1.0.0',
        'browserify-sign': 'npm:browserify-sign@4.0.0',
        'create-hash': 'npm:create-hash@1.1.2',
        'create-ecdh': 'npm:create-ecdh@4.0.0',
        'create-hmac': 'npm:create-hmac@1.1.4',
        'diffie-hellman': 'npm:diffie-hellman@5.0.2',
        'pbkdf2': 'npm:pbkdf2@3.0.4',
        'public-encrypt': 'npm:public-encrypt@4.0.0',
        'randombytes': 'npm:randombytes@2.0.3'
      }
    },
    'npm:browserify-sign@4.0.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'create-hash': 'npm:create-hash@1.1.2',
        'create-hmac': 'npm:create-hmac@1.1.4',
        'bn.js': 'npm:bn.js@4.11.6',
        'browserify-rsa': 'npm:browserify-rsa@4.0.1',
        'elliptic': 'npm:elliptic@6.3.1',
        'parse-asn1': 'npm:parse-asn1@5.0.0'
      }
    },
    'npm:create-hash@1.1.2': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'cipher-base': 'npm:cipher-base@1.0.2',
        'sha.js': 'npm:sha.js@2.4.5',
        'ripemd160': 'npm:ripemd160@1.0.1'
      }
    },
    'npm:browserify-cipher@1.0.0': {
      'map': {
        'browserify-aes': 'npm:browserify-aes@1.0.6',
        'browserify-des': 'npm:browserify-des@1.0.0',
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.0'
      }
    },
    'npm:create-hmac@1.1.4': {
      'map': {
        'create-hash': 'npm:create-hash@1.1.2',
        'inherits': 'npm:inherits@2.0.1'
      }
    },
    'npm:create-ecdh@4.0.0': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.6',
        'elliptic': 'npm:elliptic@6.3.1'
      }
    },
    'npm:diffie-hellman@5.0.2': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.6',
        'randombytes': 'npm:randombytes@2.0.3',
        'miller-rabin': 'npm:miller-rabin@4.0.0'
      }
    },
    'npm:public-encrypt@4.0.0': {
      'map': {
        'parse-asn1': 'npm:parse-asn1@5.0.0',
        'create-hash': 'npm:create-hash@1.1.2',
        'bn.js': 'npm:bn.js@4.11.6',
        'browserify-rsa': 'npm:browserify-rsa@4.0.1',
        'randombytes': 'npm:randombytes@2.0.3'
      }
    },
    'npm:browserify-aes@1.0.6': {
      'map': {
        'create-hash': 'npm:create-hash@1.1.2',
        'inherits': 'npm:inherits@2.0.1',
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.0',
        'cipher-base': 'npm:cipher-base@1.0.2',
        'buffer-xor': 'npm:buffer-xor@1.0.3'
      }
    },
    'npm:browserify-des@1.0.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'cipher-base': 'npm:cipher-base@1.0.2',
        'des.js': 'npm:des.js@1.0.0'
      }
    },
    'npm:evp_bytestokey@1.0.0': {
      'map': {
        'create-hash': 'npm:create-hash@1.1.2'
      }
    },
    'npm:pbkdf2@3.0.4': {
      'map': {
        'create-hmac': 'npm:create-hmac@1.1.4'
      }
    },
    'npm:elliptic@6.3.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'bn.js': 'npm:bn.js@4.11.6',
        'brorand': 'npm:brorand@1.0.5',
        'hash.js': 'npm:hash.js@1.0.3'
      }
    },
    'npm:browserify-rsa@4.0.1': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.6',
        'randombytes': 'npm:randombytes@2.0.3'
      }
    },
    'npm:parse-asn1@5.0.0': {
      'map': {
        'browserify-aes': 'npm:browserify-aes@1.0.6',
        'create-hash': 'npm:create-hash@1.1.2',
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.0',
        'pbkdf2': 'npm:pbkdf2@3.0.4',
        'asn1.js': 'npm:asn1.js@4.8.0'
      }
    },
    'npm:cipher-base@1.0.2': {
      'map': {
        'inherits': 'npm:inherits@2.0.1'
      }
    },
    'npm:sha.js@2.4.5': {
      'map': {
        'inherits': 'npm:inherits@2.0.1'
      }
    },
    'npm:miller-rabin@4.0.0': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.6',
        'brorand': 'npm:brorand@1.0.5'
      }
    },
    'npm:des.js@1.0.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'npm:hash.js@1.0.3': {
      'map': {
        'inherits': 'npm:inherits@2.0.1'
      }
    },
    'npm:asn1.js@4.8.0': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.6',
        'inherits': 'npm:inherits@2.0.1',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'github:jspm/nodelibs-string_decoder@0.2.0-alpha': {
      'map': {
        'string_decoder-browserify': 'npm:string_decoder@0.10.31'
      }
    },
    'github:jspm/nodelibs-buffer@0.2.0-alpha': {
      'map': {
        'buffer-browserify': 'npm:buffer@4.7.1'
      }
    },
    'npm:buffer@4.7.1': {
      'map': {
        'isarray': 'npm:isarray@1.0.0',
        'ieee754': 'npm:ieee754@1.1.6',
        'base64-js': 'npm:base64-js@1.1.2'
      }
    },
    'github:jspm/nodelibs-http@0.2.0-alpha': {
      'map': {
        'http-browserify': 'npm:stream-http@2.3.1'
      }
    },
    'npm:monk@3.0.7': {
      'map': {
        'debug': 'npm:debug@2.2.0',
        'mongodb': 'npm:mongodb@2.2.4'
      }
    },
    'npm:mongodb@2.2.4': {
      'map': {
        'readable-stream': 'npm:readable-stream@1.0.31',
        'mongodb-core': 'npm:mongodb-core@2.0.6',
        'es6-promise': 'npm:es6-promise@3.0.2'
      }
    },
    'npm:readable-stream@1.0.31': {
      'map': {
        'core-util-is': 'npm:core-util-is@1.0.2',
        'isarray': 'npm:isarray@0.0.1',
        'inherits': 'npm:inherits@2.0.1',
        'string_decoder': 'npm:string_decoder@0.10.31'
      }
    },
    'npm:mongodb-core@2.0.6': {
      'map': {
        'require_optional': 'npm:require_optional@1.0.0',
        'bson': 'npm:bson@0.5.2'
      }
    },
    'npm:require_optional@1.0.0': {
      'map': {
        'resolve-from': 'npm:resolve-from@2.0.0',
        'semver': 'npm:semver@5.3.0'
      }
    },
    'github:jspm/nodelibs-timers@0.2.0-alpha': {
      'map': {
        'timers-browserify': 'npm:timers-browserify@1.4.2'
      }
    },
    'npm:timers-browserify@1.4.2': {
      'map': {
        'process': 'npm:process@0.11.5'
      }
    },
    'npm:koa-router@7.0.1': {
      'map': {
        'methods': 'npm:methods@1.1.2',
        'path-to-regexp': 'npm:path-to-regexp@1.5.3',
        'debug': 'npm:debug@2.2.0',
        'http-errors': 'npm:http-errors@1.5.0',
        'koa-compose': 'npm:koa-compose@3.1.0'
      }
    },
    'npm:path-to-regexp@1.5.3': {
      'map': {
        'isarray': 'npm:isarray@0.0.1'
      }
    },
    'npm:koa-static@2.0.0': {
      'map': {
        'debug': 'npm:debug@2.2.0',
        'koa-send': 'npm:koa-send@3.1.1'
      }
    },
    'npm:koa-send@3.1.1': {
      'map': {
        'co': 'npm:co@4.6.0',
        'debug': 'npm:debug@2.2.0',
        'resolve-path': 'npm:resolve-path@1.3.2',
        'mz': 'npm:mz@2.4.0'
      }
    },
    'npm:resolve-path@1.3.2': {
      'map': {
        'http-errors': 'npm:http-errors@1.5.0',
        'path-is-absolute': 'npm:path-is-absolute@1.0.0'
      }
    },
    'npm:mz@2.4.0': {
      'map': {
        'any-promise': 'npm:any-promise@1.3.0',
        'object-assign': 'npm:object-assign@4.1.0',
        'thenify-all': 'npm:thenify-all@1.6.0'
      }
    },
    'npm:thenify-all@1.6.0': {
      'map': {
        'thenify': 'npm:thenify@3.2.0'
      }
    },
    'npm:thenify@3.2.0': {
      'map': {
        'any-promise': 'npm:any-promise@1.3.0'
      }
    },
    'github:jspm/nodelibs-zlib@0.2.0-alpha': {
      'map': {
        'zlib-browserify': 'npm:browserify-zlib@0.1.4'
      }
    },
    'npm:browserify-zlib@0.1.4': {
      'map': {
        'pako': 'npm:pako@0.2.9',
        'readable-stream': 'npm:readable-stream@2.1.4'
      }
    },
    'npm:co-body@4.2.0': {
      'map': {
        'qs': 'npm:qs@4.0.0',
        'raw-body': 'npm:raw-body@2.1.7',
        'type-is': 'npm:type-is@1.6.13',
        'inflation': 'npm:inflation@2.0.0'
      }
    },
    'npm:raw-body@2.1.7': {
      'map': {
        'bytes': 'npm:bytes@2.4.0',
        'iconv-lite': 'npm:iconv-lite@0.4.13',
        'unpipe': 'npm:unpipe@1.0.0'
      }
    },
    'npm:koa-bodyparser@3.1.0': {
      'map': {
        'co-body': 'npm:co-body@4.2.0'
      }
    },
    'npm:react@15.2.1': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.2.0',
        'fbjs': 'npm:fbjs@0.8.3',
        'object-assign': 'npm:object-assign@4.1.0'
      }
    },
    'npm:react-router@2.6.0': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.2.0',
        'invariant': 'npm:invariant@2.2.1',
        'warning': 'npm:warning@3.0.0',
        'hoist-non-react-statics': 'npm:hoist-non-react-statics@1.2.0',
        'history': 'npm:history@2.1.2'
      }
    },
    'npm:fbjs@0.8.3': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.2.0',
        'object-assign': 'npm:object-assign@4.1.0',
        'isomorphic-fetch': 'npm:isomorphic-fetch@2.2.1',
        'promise': 'npm:promise@7.1.1',
        'ua-parser-js': 'npm:ua-parser-js@0.7.10',
        'core-js': 'npm:core-js@1.2.7',
        'immutable': 'npm:immutable@3.8.1'
      }
    },
    'npm:invariant@2.2.1': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.2.0'
      }
    },
    'npm:warning@3.0.0': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.2.0'
      }
    },
    'npm:loose-envify@1.2.0': {
      'map': {
        'js-tokens': 'npm:js-tokens@1.0.3'
      }
    },
    'npm:isomorphic-fetch@2.2.1': {
      'map': {
        'node-fetch': 'npm:node-fetch@1.6.0',
        'whatwg-fetch': 'npm:whatwg-fetch@1.0.0'
      }
    },
    'npm:promise@7.1.1': {
      'map': {
        'asap': 'npm:asap@2.0.4'
      }
    },
    'npm:encoding@0.1.12': {
      'map': {
        'iconv-lite': 'npm:iconv-lite@0.4.13'
      }
    },
    'github:jspm/nodelibs-domain@0.2.0-alpha': {
      'map': {
        'domain-browserify': 'npm:domain-browser@1.1.7'
      }
    },
    'npm:history@2.1.2': {
      'map': {
        'warning': 'npm:warning@2.1.0',
        'invariant': 'npm:invariant@2.2.1',
        'deep-equal': 'npm:deep-equal@1.0.1',
        'query-string': 'npm:query-string@3.0.3'
      }
    },
    'npm:warning@2.1.0': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.2.0'
      }
    },
    'npm:query-string@3.0.3': {
      'map': {
        'strict-uri-encode': 'npm:strict-uri-encode@1.1.0'
      }
    },
    'github:capaj/systemjs-hot-reloader@0.6.0': {
      'map': {
        'debug': 'npm:debug@2.2.0',
        'weakee': 'npm:weakee@1.0.0',
        'socket.io-client': 'github:socketio/socket.io-client@1.4.8'
      }
    },
    'npm:koa-send@3.2.0': {
      'map': {
        'debug': 'npm:debug@2.2.0',
        'co': 'npm:co@4.6.0',
        'mz': 'npm:mz@2.4.0',
        'resolve-path': 'npm:resolve-path@1.3.2'
      }
    },
    'github:mobilexag/plugin-sass@0.4.6': {
      'map': {
        'autoprefixer': 'npm:autoprefixer@6.3.7',
        'sass.js': 'npm:sass.js@0.9.11',
        'postcss': 'npm:postcss@5.1.0',
        'lodash': 'npm:lodash@4.14.0',
        'fs': 'github:jspm/nodelibs-fs@0.1.2',
        'path': 'github:jspm/nodelibs-path@0.1.0',
        'url': 'github:jspm/nodelibs-url@0.1.0',
        'reqwest': 'github:ded/reqwest@2.0.5'
      }
    },
    'npm:autoprefixer@6.3.7': {
      'map': {
        'postcss': 'npm:postcss@5.1.0',
        'caniuse-db': 'npm:caniuse-db@1.0.30000507',
        'browserslist': 'npm:browserslist@1.3.5',
        'num2fraction': 'npm:num2fraction@1.2.2',
        'normalize-range': 'npm:normalize-range@0.1.2',
        'postcss-value-parser': 'npm:postcss-value-parser@3.3.0'
      }
    },
    'npm:postcss@5.1.0': {
      'map': {
        'source-map': 'npm:source-map@0.5.6',
        'supports-color': 'npm:supports-color@3.1.2',
        'js-base64': 'npm:js-base64@2.1.9'
      }
    },
    'npm:browserslist@1.3.5': {
      'map': {
        'caniuse-db': 'npm:caniuse-db@1.0.30000507'
      }
    },
    'npm:supports-color@3.1.2': {
      'map': {
        'has-flag': 'npm:has-flag@1.0.0'
      }
    },
    'github:jspm/nodelibs-path@0.1.0': {
      'map': {
        'path-browserify': 'npm:path-browserify@0.0.0'
      }
    },
    'github:jspm/nodelibs-url@0.1.0': {
      'map': {
        'url': 'npm:url@0.10.3'
      }
    },
    'npm:url@0.10.3': {
      'map': {
        'punycode': 'npm:punycode@1.3.2',
        'querystring': 'npm:querystring@0.2.0'
      }
    },
    'npm:babel-plugin-transform-runtime@6.12.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-runtime@6.11.6': {
      'map': {
        'regenerator-runtime': 'npm:regenerator-runtime@0.9.5',
        'core-js': 'npm:core-js@2.4.1'
      }
    },
    'npm:babel-types@6.11.1': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'esutils': 'npm:esutils@2.0.2',
        'lodash': 'npm:lodash@4.14.1',
        'to-fast-properties': 'npm:to-fast-properties@1.0.2',
        'babel-traverse': 'npm:babel-traverse@6.12.0'
      }
    },
    'npm:babel-code-frame@6.11.0': {
      'map': {
        'esutils': 'npm:esutils@2.0.2',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'js-tokens': 'npm:js-tokens@2.0.0',
        'chalk': 'npm:chalk@1.1.3'
      }
    },
    'npm:babel-messages@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:chalk@1.1.3': {
      'map': {
        'ansi-styles': 'npm:ansi-styles@2.2.1',
        'escape-string-regexp': 'npm:escape-string-regexp@1.0.5',
        'has-ansi': 'npm:has-ansi@2.0.0',
        'strip-ansi': 'npm:strip-ansi@3.0.1',
        'supports-color': 'npm:supports-color@2.0.0'
      }
    },
    'npm:has-ansi@2.0.0': {
      'map': {
        'ansi-regex': 'npm:ansi-regex@2.0.0'
      }
    },
    'npm:strip-ansi@3.0.1': {
      'map': {
        'ansi-regex': 'npm:ansi-regex@2.0.0'
      }
    },
    'npm:babylon@6.8.4': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-preset-es2017@1.6.1': {
      'map': {
        'babel-plugin-syntax-object-rest-spread': 'npm:babel-plugin-syntax-object-rest-spread@6.8.0',
        'babel-plugin-syntax-async-functions': 'npm:babel-plugin-syntax-async-functions@6.8.0',
        'babel-plugin-transform-es2015-destructuring': 'npm:babel-plugin-transform-es2015-destructuring@6.9.0',
        'core-js': 'npm:core-js@2.4.1',
        'babel-plugin-transform-es2015-sticky-regex': 'npm:babel-plugin-transform-es2015-sticky-regex@6.8.0',
        'babel-plugin-transform-exponentiation-operator': 'npm:babel-plugin-transform-exponentiation-operator@6.8.0',
        'babel-plugin-transform-es2015-unicode-regex': 'npm:babel-plugin-transform-es2015-unicode-regex@6.11.0',
        'babel-plugin-transform-es2015-parameters': 'npm:babel-plugin-transform-es2015-parameters@6.11.4',
        'babel-plugin-transform-es2015-modules-commonjs': 'npm:babel-plugin-transform-es2015-modules-commonjs@6.11.5',
        'babel-plugin-transform-strict-mode': 'npm:babel-plugin-transform-strict-mode@6.11.3',
        'babel-plugin-transform-object-rest-spread': 'npm:babel-plugin-transform-object-rest-spread@6.8.0',
        'babel-plugin-transform-async-to-generator': 'npm:babel-plugin-transform-async-to-generator@6.8.0',
        'babel-plugin-array-includes': 'npm:babel-plugin-array-includes@2.0.3',
        'babel-plugin-syntax-trailing-function-commas': 'npm:babel-plugin-syntax-trailing-function-commas@6.8.0',
        'babel-plugin-transform-flow-strip-types': 'npm:babel-plugin-transform-flow-strip-types@6.8.0'
      }
    },
    'npm:babel-plugin-syntax-object-rest-spread@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-syntax-async-functions@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-transform-es2015-destructuring@6.9.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-transform-es2015-sticky-regex@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-helper-regex': 'npm:babel-helper-regex@6.9.0'
      }
    },
    'npm:babel-plugin-transform-exponentiation-operator@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-plugin-syntax-exponentiation-operator': 'npm:babel-plugin-syntax-exponentiation-operator@6.8.0',
        'babel-helper-builder-binary-assignment-operator-visitor': 'npm:babel-helper-builder-binary-assignment-operator-visitor@6.8.0'
      }
    },
    'npm:babel-plugin-transform-es2015-unicode-regex@6.11.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-helper-regex': 'npm:babel-helper-regex@6.9.0',
        'regexpu-core': 'npm:regexpu-core@2.0.0'
      }
    },
    'npm:babel-plugin-transform-es2015-parameters@6.11.4': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-helper-call-delegate': 'npm:babel-helper-call-delegate@6.8.0',
        'babel-template': 'npm:babel-template@6.9.0',
        'babel-helper-get-function-arity': 'npm:babel-helper-get-function-arity@6.8.0',
        'babel-traverse': 'npm:babel-traverse@6.12.0'
      }
    },
    'npm:babel-plugin-transform-es2015-modules-commonjs@6.11.5': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-plugin-transform-strict-mode': 'npm:babel-plugin-transform-strict-mode@6.11.3',
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-template': 'npm:babel-template@6.9.0'
      }
    },
    'npm:babel-plugin-transform-strict-mode@6.11.3': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1'
      }
    },
    'npm:babel-plugin-transform-object-rest-spread@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-plugin-syntax-object-rest-spread': 'npm:babel-plugin-syntax-object-rest-spread@6.8.0'
      }
    },
    'npm:babel-helper-regex@6.9.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1',
        'lodash': 'npm:lodash@4.14.1'
      }
    },
    'npm:babel-plugin-transform-async-to-generator@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-plugin-syntax-async-functions': 'npm:babel-plugin-syntax-async-functions@6.8.0',
        'babel-helper-remap-async-to-generator': 'npm:babel-helper-remap-async-to-generator@6.11.2'
      }
    },
    'npm:babel-helper-builder-binary-assignment-operator-visitor@6.8.0': {
      'map': {
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-helper-explode-assignable-expression': 'npm:babel-helper-explode-assignable-expression@6.8.0'
      }
    },
    'npm:babel-helper-call-delegate@6.8.0': {
      'map': {
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-traverse': 'npm:babel-traverse@6.12.0',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-helper-hoist-variables': 'npm:babel-helper-hoist-variables@6.8.0'
      }
    },
    'npm:babel-template@6.9.0': {
      'map': {
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-traverse': 'npm:babel-traverse@6.12.0',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babylon': 'npm:babylon@6.8.4',
        'lodash': 'npm:lodash@4.14.1'
      }
    },
    'npm:babel-helper-get-function-arity@6.8.0': {
      'map': {
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-syntax-exponentiation-operator@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-traverse@6.12.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1',
        'babylon': 'npm:babylon@6.8.4',
        'babel-code-frame': 'npm:babel-code-frame@6.11.0',
        'babel-messages': 'npm:babel-messages@6.8.0',
        'globals': 'npm:globals@8.18.0',
        'lodash': 'npm:lodash@4.14.1',
        'invariant': 'npm:invariant@2.2.1',
        'debug': 'npm:debug@2.2.0'
      }
    },
    'npm:regexpu-core@2.0.0': {
      'map': {
        'regjsparser': 'npm:regjsparser@0.1.5',
        'regjsgen': 'npm:regjsgen@0.2.0',
        'regenerate': 'npm:regenerate@1.3.1'
      }
    },
    'npm:babel-plugin-syntax-trailing-function-commas@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-transform-flow-strip-types@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-plugin-syntax-flow': 'npm:babel-plugin-syntax-flow@6.8.0'
      }
    },
    'npm:babel-helper-explode-assignable-expression@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-traverse': 'npm:babel-traverse@6.12.0',
        'babel-types': 'npm:babel-types@6.11.1'
      }
    },
    'npm:babel-helper-hoist-variables@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1'
      }
    },
    'npm:regjsparser@0.1.5': {
      'map': {
        'jsesc': 'npm:jsesc@0.5.0'
      }
    },
    'npm:babel-helper-remap-async-to-generator@6.11.2': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-template': 'npm:babel-template@6.9.0',
        'babel-traverse': 'npm:babel-traverse@6.12.0',
        'babel-helper-function-name': 'npm:babel-helper-function-name@6.8.0'
      }
    },
    'npm:babel-helper-function-name@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-helper-get-function-arity': 'npm:babel-helper-get-function-arity@6.8.0',
        'babel-traverse': 'npm:babel-traverse@6.12.0',
        'babel-template': 'npm:babel-template@6.9.0'
      }
    },
    'npm:babel-plugin-syntax-flow@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-preset-es2015@6.9.0': {
      'map': {
        'babel-plugin-transform-es2015-arrow-functions': 'npm:babel-plugin-transform-es2015-arrow-functions@6.8.0',
        'babel-plugin-transform-es2015-for-of': 'npm:babel-plugin-transform-es2015-for-of@6.8.0',
        'babel-plugin-transform-es2015-literals': 'npm:babel-plugin-transform-es2015-literals@6.8.0',
        'babel-plugin-transform-es2015-block-scoped-functions': 'npm:babel-plugin-transform-es2015-block-scoped-functions@6.8.0',
        'babel-plugin-check-es2015-constants': 'npm:babel-plugin-check-es2015-constants@6.8.0',
        'babel-plugin-transform-es2015-template-literals': 'npm:babel-plugin-transform-es2015-template-literals@6.8.0',
        'babel-plugin-transform-es2015-function-name': 'npm:babel-plugin-transform-es2015-function-name@6.9.0',
        'babel-plugin-transform-es2015-typeof-symbol': 'npm:babel-plugin-transform-es2015-typeof-symbol@6.8.0',
        'babel-plugin-transform-es2015-sticky-regex': 'npm:babel-plugin-transform-es2015-sticky-regex@6.8.0',
        'babel-plugin-transform-es2015-modules-commonjs': 'npm:babel-plugin-transform-es2015-modules-commonjs@6.11.5',
        'babel-plugin-transform-regenerator': 'npm:babel-plugin-transform-regenerator@6.11.4',
        'babel-plugin-transform-es2015-block-scoping': 'npm:babel-plugin-transform-es2015-block-scoping@6.10.1',
        'babel-plugin-transform-es2015-spread': 'npm:babel-plugin-transform-es2015-spread@6.8.0',
        'babel-plugin-transform-es2015-shorthand-properties': 'npm:babel-plugin-transform-es2015-shorthand-properties@6.8.0',
        'babel-plugin-transform-es2015-unicode-regex': 'npm:babel-plugin-transform-es2015-unicode-regex@6.11.0',
        'babel-plugin-transform-es2015-computed-properties': 'npm:babel-plugin-transform-es2015-computed-properties@6.8.0',
        'babel-plugin-transform-es2015-classes': 'npm:babel-plugin-transform-es2015-classes@6.9.0',
        'babel-plugin-transform-es2015-object-super': 'npm:babel-plugin-transform-es2015-object-super@6.8.0',
        'babel-plugin-transform-es2015-duplicate-keys': 'npm:babel-plugin-transform-es2015-duplicate-keys@6.8.0',
        'babel-plugin-transform-es2015-destructuring': 'npm:babel-plugin-transform-es2015-destructuring@6.9.0',
        'babel-plugin-transform-es2015-parameters': 'npm:babel-plugin-transform-es2015-parameters@6.11.4'
      }
    },
    'npm:babel-plugin-transform-es2015-function-name@6.9.0': {
      'map': {
        'babel-helper-function-name': 'npm:babel-helper-function-name@6.8.0',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1'
      }
    },
    'npm:babel-plugin-transform-regenerator@6.11.4': {
      'map': {
        'babel-plugin-transform-es2015-for-of': 'npm:babel-plugin-transform-es2015-for-of@6.8.0',
        'babel-plugin-transform-es2015-block-scoping': 'npm:babel-plugin-transform-es2015-block-scoping@6.10.1',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1',
        'babylon': 'npm:babylon@6.8.4',
        'private': 'npm:private@0.1.6',
        'babel-plugin-syntax-async-functions': 'npm:babel-plugin-syntax-async-functions@6.8.0',
        'babel-traverse': 'npm:babel-traverse@6.12.0',
        'babel-core': 'npm:babel-core@6.11.4'
      }
    },
    'npm:babel-plugin-transform-es2015-block-scoping@6.10.1': {
      'map': {
        'babel-template': 'npm:babel-template@6.9.0',
        'lodash': 'npm:lodash@4.14.1',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-traverse': 'npm:babel-traverse@6.12.0'
      }
    },
    'npm:babel-plugin-transform-es2015-computed-properties@6.8.0': {
      'map': {
        'babel-template': 'npm:babel-template@6.9.0',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-helper-define-map': 'npm:babel-helper-define-map@6.9.0'
      }
    },
    'npm:babel-plugin-transform-es2015-classes@6.9.0': {
      'map': {
        'babel-helper-function-name': 'npm:babel-helper-function-name@6.8.0',
        'babel-template': 'npm:babel-template@6.9.0',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-helper-define-map': 'npm:babel-helper-define-map@6.9.0',
        'babel-messages': 'npm:babel-messages@6.8.0',
        'babel-helper-optimise-call-expression': 'npm:babel-helper-optimise-call-expression@6.8.0',
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-helper-replace-supers': 'npm:babel-helper-replace-supers@6.8.0',
        'babel-traverse': 'npm:babel-traverse@6.12.0'
      }
    },
    'npm:babel-plugin-transform-es2015-arrow-functions@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-transform-es2015-for-of@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-transform-es2015-literals@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-transform-es2015-block-scoped-functions@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-check-es2015-constants@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-transform-es2015-template-literals@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-transform-es2015-typeof-symbol@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-transform-es2015-spread@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:babel-plugin-transform-es2015-shorthand-properties@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1'
      }
    },
    'npm:babel-plugin-transform-es2015-object-super@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-helper-replace-supers': 'npm:babel-helper-replace-supers@6.8.0'
      }
    },
    'npm:babel-plugin-transform-es2015-duplicate-keys@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1'
      }
    },
    'npm:babel-helper-define-map@6.9.0': {
      'map': {
        'babel-helper-function-name': 'npm:babel-helper-function-name@6.8.0',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'lodash': 'npm:lodash@4.14.1',
        'babel-types': 'npm:babel-types@6.11.1'
      }
    },
    'npm:babel-helper-optimise-call-expression@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1'
      }
    },
    'npm:babel-helper-replace-supers@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-messages': 'npm:babel-messages@6.8.0',
        'babel-template': 'npm:babel-template@6.9.0',
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-helper-optimise-call-expression': 'npm:babel-helper-optimise-call-expression@6.8.0',
        'babel-traverse': 'npm:babel-traverse@6.12.0'
      }
    },
    'npm:babel-core@6.11.4': {
      'map': {
        'babel-code-frame': 'npm:babel-code-frame@6.11.0',
        'babel-messages': 'npm:babel-messages@6.8.0',
        'babel-template': 'npm:babel-template@6.9.0',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1',
        'babylon': 'npm:babylon@6.8.4',
        'debug': 'npm:debug@2.2.0',
        'lodash': 'npm:lodash@4.14.1',
        'babel-traverse': 'npm:babel-traverse@6.12.0',
        'private': 'npm:private@0.1.6',
        'path-exists': 'npm:path-exists@1.0.0',
        'slash': 'npm:slash@1.0.0',
        'shebang-regex': 'npm:shebang-regex@1.0.0',
        'babel-register': 'npm:babel-register@6.11.6',
        'path-is-absolute': 'npm:path-is-absolute@1.0.0',
        'minimatch': 'npm:minimatch@3.0.2',
        'convert-source-map': 'npm:convert-source-map@1.3.0',
        'source-map': 'npm:source-map@0.5.6',
        'json5': 'npm:json5@0.4.0',
        'babel-generator': 'npm:babel-generator@6.11.4',
        'babel-helpers': 'npm:babel-helpers@6.8.0'
      }
    },
    'npm:babel-register@6.11.6': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'core-js': 'npm:core-js@2.4.1',
        'lodash': 'npm:lodash@4.14.1',
        'babel-core': 'npm:babel-core@6.11.4',
        'path-exists': 'npm:path-exists@1.0.0',
        'home-or-tmp': 'npm:home-or-tmp@1.0.0',
        'mkdirp': 'npm:mkdirp@0.5.1',
        'source-map-support': 'npm:source-map-support@0.2.10'
      }
    },
    'npm:minimatch@3.0.2': {
      'map': {
        'brace-expansion': 'npm:brace-expansion@1.1.6'
      }
    },
    'npm:source-map-support@0.2.10': {
      'map': {
        'source-map': 'npm:source-map@0.1.32'
      }
    },
    'npm:babel-generator@6.11.4': {
      'map': {
        'babel-messages': 'npm:babel-messages@6.8.0',
        'babel-runtime': 'npm:babel-runtime@6.11.6',
        'babel-types': 'npm:babel-types@6.11.1',
        'lodash': 'npm:lodash@4.14.1',
        'source-map': 'npm:source-map@0.5.6',
        'detect-indent': 'npm:detect-indent@3.0.1'
      }
    },
    'npm:home-or-tmp@1.0.0': {
      'map': {
        'os-tmpdir': 'npm:os-tmpdir@1.0.1',
        'user-home': 'npm:user-home@1.1.1'
      }
    },
    'npm:mkdirp@0.5.1': {
      'map': {
        'minimist': 'npm:minimist@0.0.8'
      }
    },
    'npm:brace-expansion@1.1.6': {
      'map': {
        'concat-map': 'npm:concat-map@0.0.1',
        'balanced-match': 'npm:balanced-match@0.4.2'
      }
    },
    'npm:source-map@0.1.32': {
      'map': {
        'amdefine': 'npm:amdefine@1.0.0'
      }
    },
    'npm:babel-helpers@6.8.0': {
      'map': {
        'babel-template': 'npm:babel-template@6.9.0',
        'babel-runtime': 'npm:babel-runtime@6.11.6'
      }
    },
    'npm:detect-indent@3.0.1': {
      'map': {
        'minimist': 'npm:minimist@1.2.0',
        'get-stdin': 'npm:get-stdin@4.0.1',
        'repeating': 'npm:repeating@1.1.3'
      }
    },
    'npm:repeating@1.1.3': {
      'map': {
        'is-finite': 'npm:is-finite@1.0.1'
      }
    },
    'npm:is-finite@1.0.1': {
      'map': {
        'number-is-nan': 'npm:number-is-nan@1.0.0'
      }
    },
    'npm:stream-http@2.3.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'readable-stream': 'npm:readable-stream@2.1.4',
        'xtend': 'npm:xtend@4.0.1',
        'to-arraybuffer': 'npm:to-arraybuffer@1.0.1',
        'builtin-status-codes': 'npm:builtin-status-codes@2.0.0'
      }
    },
    'npm:react-tether@0.5.2': {
      'map': {
        'tether': 'npm:tether@1.3.4'
      }
    },
    'npm:node-fetch@1.6.0': {
      'map': {
        'is-stream': 'npm:is-stream@1.1.0',
        'encoding': 'npm:encoding@0.1.12'
      }
    },
    'npm:react-dnd@2.1.4': {
      'map': {
        'invariant': 'npm:invariant@2.2.1',
        'lodash': 'npm:lodash@4.14.1',
        'dnd-core': 'npm:dnd-core@2.0.2',
        'disposables': 'npm:disposables@1.0.1'
      }
    },
    'npm:react-dnd-html5-backend@2.1.2': {
      'map': {
        'lodash': 'npm:lodash@4.14.1'
      }
    },
    'npm:dnd-core@2.0.2': {
      'map': {
        'invariant': 'npm:invariant@2.2.1',
        'lodash': 'npm:lodash@4.14.1',
        'asap': 'npm:asap@2.0.4',
        'redux': 'npm:redux@3.5.2'
      }
    },
    'npm:redux@3.5.2': {
      'map': {
        'lodash': 'npm:lodash@4.14.1',
        'loose-envify': 'npm:loose-envify@1.2.0',
        'symbol-observable': 'npm:symbol-observable@0.2.4',
        'lodash-es': 'npm:lodash-es@4.14.1'
      }
    },
    'npm:lru-cache@4.0.1': {
      'map': {
        'pseudomap': 'npm:pseudomap@1.0.2',
        'yallist': 'npm:yallist@2.0.0'
      }
    }
  }
})
