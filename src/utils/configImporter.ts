import { sync as findUpSync } from "find-up"

const CONFIG_FILES = ["spinal.json"]

export const config: IConfigObject = {
  path: undefined,
  options: {}
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
}
