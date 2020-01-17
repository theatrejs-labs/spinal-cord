import { sync as findUpSync } from "find-up"
import { readJSONFile, createDirectoryIfNotExistSync } from "./fileSystem"
import { resolve } from "path"

const CONFIG_FILES = ["spinal.json"]

const config: IConfigObject = {
  path: "",
  root: "",
  options: {
    output: "./state-storage"
  }
}

extractConfig()

function extractConfig() {
  if (!config.path) {
    const path = findUpSync(CONFIG_FILES, { cwd: process.cwd() })
    if (!path) {
      return
      // TODO: Put error
    }
    config.path = path
  }
  Object.assign(config.options, readJSONFile(config.path))
  config.root = resolve(config.path, "..", config.options.output)
  createDirectoryIfNotExistSync(config.root)
}

export const getSubDirectory = (path: string) => resolve(config.root, path)

export default config
