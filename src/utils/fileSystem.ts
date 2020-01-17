import { mkdirSync, writeFileSync, readdirSync, readFileSync } from "fs"
import { resolve } from "path"

export const createDirectoryIfNotExistSync = (path: string) => {
  try {
    mkdirSync(path, { recursive: true })
  } catch (e) {
    /* Do nothing if directory exists */
  }
}

export const createOrUpdateFileSync = (path: string, data: string) => {
  writeFileSync(path, data, {
    encoding: "utf-8",
    flag: "w"
  })
}

export const exportAllStores = (rootPath: string) => {
  const allStores = readdirSync(rootPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dir => dir.name)
  const imports = allStores.map(store => {
    return `const ${store} = require('./${store}/data.json');`
  })
  createOrUpdateFileSync(
    resolve(rootPath, "index.js"),
    `${imports.join("\n")}\n\nmodule.exports = { ${allStores.join(", ")} }`
  )
}

export const readJSONFile = (path: string) => {
  const content = readFileSync(path, { encoding: "utf-8" })
  return JSON.parse(content)
}
