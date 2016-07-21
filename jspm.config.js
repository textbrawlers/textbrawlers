SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "retardarenan/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.12"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "retardarenan": {
      "main": "retardarenan.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
    "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
    "dns": "github:jspm/nodelibs-dns@0.2.0-alpha",
    "dotenv": "npm:dotenv@2.0.0",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "graceful-fs": "npm:graceful-fs@4.1.4",
    "http": "github:jspm/nodelibs-http@0.2.0-alpha",
    "koa": "npm:koa@2.0.0",
    "koa-bodyparser": "npm:koa-bodyparser@3.1.0",
    "koa-convert": "npm:koa-convert@1.2.0",
    "koa-router": "npm:koa-router@7.0.1",
    "koa-static": "npm:koa-static@2.0.0",
    "module": "github:jspm/nodelibs-module@0.2.0-alpha",
    "monk": "npm:monk@3.0.7",
    "net": "github:jspm/nodelibs-net@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "querystring": "github:jspm/nodelibs-querystring@0.2.0-alpha",
    "readline": "github:jspm/nodelibs-readline@0.2.0-alpha",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
    "timers": "github:jspm/nodelibs-timers@0.2.0-alpha",
    "tls": "github:jspm/nodelibs-tls@0.2.0-alpha",
    "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "vm": "github:jspm/nodelibs-vm@0.2.0-alpha",
    "zlib": "github:jspm/nodelibs-zlib@0.2.0-alpha"
  },
  packages: {
    "npm:koa@2.0.0": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "accepts": "npm:accepts@1.3.3",
        "content-disposition": "npm:content-disposition@0.5.1",
        "content-type": "npm:content-type@1.0.2",
        "depd": "npm:depd@1.1.0",
        "destroy": "npm:destroy@1.0.4",
        "escape-html": "npm:escape-html@1.0.3",
        "http-errors": "npm:http-errors@1.5.0",
        "is-generator-function": "npm:is-generator-function@1.0.3",
        "fresh": "npm:fresh@0.3.0",
        "mime-types": "npm:mime-types@2.1.11",
        "cookies": "npm:cookies@0.6.1",
        "on-finished": "npm:on-finished@2.3.0",
        "parseurl": "npm:parseurl@1.3.1",
        "statuses": "npm:statuses@1.3.0",
        "type-is": "npm:type-is@1.6.13",
        "vary": "npm:vary@1.1.0",
        "only": "npm:only@0.0.2",
        "koa-is-json": "npm:koa-is-json@1.0.0",
        "koa-compose": "npm:koa-compose@3.1.0",
        "error-inject": "npm:error-inject@1.0.0",
        "http-assert": "npm:http-assert@1.2.0",
        "delegates": "npm:delegates@1.0.0",
        "koa-convert": "npm:koa-convert@1.2.0"
      }
    },
    "npm:accepts@1.3.3": {
      "map": {
        "mime-types": "npm:mime-types@2.1.11",
        "negotiator": "npm:negotiator@0.6.1"
      }
    },
    "npm:http-errors@1.5.0": {
      "map": {
        "statuses": "npm:statuses@1.3.0",
        "inherits": "npm:inherits@2.0.1",
        "setprototypeof": "npm:setprototypeof@1.0.1"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:cookies@0.6.1": {
      "map": {
        "depd": "npm:depd@1.1.0",
        "keygrip": "npm:keygrip@1.0.1"
      }
    },
    "npm:type-is@1.6.13": {
      "map": {
        "mime-types": "npm:mime-types@2.1.11",
        "media-typer": "npm:media-typer@0.3.0"
      }
    },
    "npm:mime-types@2.1.11": {
      "map": {
        "mime-db": "npm:mime-db@1.23.0"
      }
    },
    "npm:http-assert@1.2.0": {
      "map": {
        "http-errors": "npm:http-errors@1.4.0",
        "deep-equal": "npm:deep-equal@1.0.1"
      }
    },
    "npm:on-finished@2.3.0": {
      "map": {
        "ee-first": "npm:ee-first@1.1.1"
      }
    },
    "npm:http-errors@1.4.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "statuses": "npm:statuses@1.3.0"
      }
    },
    "npm:koa-convert@1.2.0": {
      "map": {
        "koa-compose": "npm:koa-compose@3.1.0",
        "co": "npm:co@4.6.0"
      }
    },
    "npm:koa-compose@3.1.0": {
      "map": {
        "any-promise": "npm:any-promise@1.3.0"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.1.4"
      }
    },
    "github:jspm/nodelibs-url@0.2.0-alpha": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "npm:readable-stream@2.1.4": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "isarray": "npm:isarray@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "github:jspm/nodelibs-crypto@0.2.0-alpha": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hmac": "npm:create-hmac@1.1.4",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "bn.js": "npm:bn.js@4.11.5",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "elliptic": "npm:elliptic@6.3.1",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "cipher-base": "npm:cipher-base@1.0.2",
        "sha.js": "npm:sha.js@2.4.5",
        "ripemd160": "npm:ripemd160@1.0.1"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.5",
        "elliptic": "npm:elliptic@6.3.1"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.5",
        "randombytes": "npm:randombytes@2.0.3",
        "miller-rabin": "npm:miller-rabin@4.0.0"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "bn.js": "npm:bn.js@4.11.5",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.1",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "cipher-base": "npm:cipher-base@1.0.2",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "cipher-base": "npm:cipher-base@1.0.2",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:pbkdf2@3.0.4": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:elliptic@6.3.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "bn.js": "npm:bn.js@4.11.5",
        "brorand": "npm:brorand@1.0.5",
        "hash.js": "npm:hash.js@1.0.3"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.5",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "asn1.js": "npm:asn1.js@4.8.0"
      }
    },
    "npm:cipher-base@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:sha.js@2.4.5": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.5",
        "brorand": "npm:brorand@1.0.5"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:asn1.js@4.8.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.5",
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.7.1"
      }
    },
    "npm:buffer@4.7.1": {
      "map": {
        "isarray": "npm:isarray@1.0.0",
        "ieee754": "npm:ieee754@1.1.6",
        "base64-js": "npm:base64-js@1.1.2"
      }
    },
    "github:jspm/nodelibs-http@0.2.0-alpha": {
      "map": {
        "http-browserify": "npm:stream-http@2.3.0"
      }
    },
    "npm:stream-http@2.3.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.1.4",
        "xtend": "npm:xtend@4.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0"
      }
    },
    "npm:monk@3.0.7": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "mongodb": "npm:mongodb@2.2.4"
      }
    },
    "npm:mongodb@2.2.4": {
      "map": {
        "readable-stream": "npm:readable-stream@1.0.31",
        "mongodb-core": "npm:mongodb-core@2.0.6",
        "es6-promise": "npm:es6-promise@3.0.2"
      }
    },
    "npm:readable-stream@1.0.31": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "isarray": "npm:isarray@0.0.1",
        "inherits": "npm:inherits@2.0.1",
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:mongodb-core@2.0.6": {
      "map": {
        "require_optional": "npm:require_optional@1.0.0",
        "bson": "npm:bson@0.5.2"
      }
    },
    "npm:require_optional@1.0.0": {
      "map": {
        "resolve-from": "npm:resolve-from@2.0.0",
        "semver": "npm:semver@5.3.0"
      }
    },
    "github:jspm/nodelibs-timers@0.2.0-alpha": {
      "map": {
        "timers-browserify": "npm:timers-browserify@1.4.2"
      }
    },
    "npm:timers-browserify@1.4.2": {
      "map": {
        "process": "npm:process@0.11.5"
      }
    },
    "npm:koa-router@7.0.1": {
      "map": {
        "methods": "npm:methods@1.1.2",
        "path-to-regexp": "npm:path-to-regexp@1.5.3",
        "debug": "npm:debug@2.2.0",
        "http-errors": "npm:http-errors@1.5.0",
        "koa-compose": "npm:koa-compose@3.1.0"
      }
    },
    "npm:path-to-regexp@1.5.3": {
      "map": {
        "isarray": "npm:isarray@0.0.1"
      }
    },
    "npm:koa-static@2.0.0": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "koa-send": "npm:koa-send@3.1.1"
      }
    },
    "npm:koa-send@3.1.1": {
      "map": {
        "co": "npm:co@4.6.0",
        "debug": "npm:debug@2.2.0",
        "resolve-path": "npm:resolve-path@1.3.2",
        "mz": "npm:mz@2.4.0"
      }
    },
    "npm:resolve-path@1.3.2": {
      "map": {
        "http-errors": "npm:http-errors@1.5.0",
        "path-is-absolute": "npm:path-is-absolute@1.0.0"
      }
    },
    "npm:mz@2.4.0": {
      "map": {
        "any-promise": "npm:any-promise@1.3.0",
        "object-assign": "npm:object-assign@4.1.0",
        "thenify-all": "npm:thenify-all@1.6.0"
      }
    },
    "npm:thenify-all@1.6.0": {
      "map": {
        "thenify": "npm:thenify@3.2.0"
      }
    },
    "npm:thenify@3.2.0": {
      "map": {
        "any-promise": "npm:any-promise@1.3.0"
      }
    },
    "github:jspm/nodelibs-zlib@0.2.0-alpha": {
      "map": {
        "zlib-browserify": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "pako": "npm:pako@0.2.9",
        "readable-stream": "npm:readable-stream@2.1.4"
      }
    },
    "npm:co-body@4.2.0": {
      "map": {
        "qs": "npm:qs@4.0.0",
        "raw-body": "npm:raw-body@2.1.7",
        "type-is": "npm:type-is@1.6.13",
        "inflation": "npm:inflation@2.0.0"
      }
    },
    "npm:raw-body@2.1.7": {
      "map": {
        "bytes": "npm:bytes@2.4.0",
        "iconv-lite": "npm:iconv-lite@0.4.13",
        "unpipe": "npm:unpipe@1.0.0"
      }
    },
    "npm:koa-bodyparser@3.1.0": {
      "map": {
        "co-body": "npm:co-body@4.2.0"
      }
    }
  }
});
