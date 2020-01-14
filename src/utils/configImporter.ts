import { sync as findUpSync } from "find-up"
import { readJSONFile } from "./fileSystem"

const CONFIG_FILES = ["spinal.json"]

const config: IConfigObject = {
  path: undefined,
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
}

export default config
