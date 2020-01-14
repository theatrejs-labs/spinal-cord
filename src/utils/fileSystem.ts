import { mkdirSync, writeFileSync, readdirSync } from "fs"
import { resolve } from "path"

export const createDirectoryIfNotExistSync = (path: string) => {
  try {
    mkdirSync(path)
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
