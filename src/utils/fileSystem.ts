import { mkdirSync, writeFileSync, readdirSync, readFileSync } from "fs"
import { resolve } from "path"
import config from "./configImporter"

export const createDirectoryIfNotExistSync = (path: string) => {
  try {
    mkdirSync(path, { recursive: true })
  } catch (e) {
    /* Do nothing if directory exists */
  }
}

export const createOrUpdateFileSync = (
  path: string,
  filename: string,
  data: string
) => {
  writeFileSync(resolve(path, filename), data, {
    encoding: "utf-8",
    flag: "w"
  })
}

export const getAllSubDirectories = (path: string) =>
  readdirSync(path, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dir => dir.name)

export const exportAllStores = () => {
  const allStores = getAllSubDirectories(config.root)
  const imports = allStores.map(store => {
    return `const ${store} = require('./${store}/data.json');`
  })
  createOrUpdateFileSync(
    config.root,
    "index.js",
    `${imports.join("\n")}\n\nmodule.exports = { ${allStores.join(", ")} }`
  )
}

export const readJSONFile = (path: string) => {
  const content = readFileSync(path, { encoding: "utf-8" })
  return JSON.parse(content)
}
