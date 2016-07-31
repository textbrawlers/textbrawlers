import 'core-js/fn/object/entries'

async function parsePrefixes() {
  const allItems = []
  const setBonuses = {}

  const prefixesConfig = await System.import('common/json/prefixes.json')
  const prefixFiles = {}

  // load all individual prefix files
  await Promise.all(Object.entries(prefixesConfig.prefixes).map(([prefixType, file]) => {
    return System.import(file).then(config => prefixFiles[prefixType] = config)
  }))

  return { prefixes: prefixFiles, possible: prefixesConfig.possible }
}

export default async function() {
  return await parsePrefixes()
}
