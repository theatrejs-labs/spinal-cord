import config from "../utils/configImporter"
import { createDirectoryIfNotExistSync } from "../utils/fileSystem"
import { resolve } from "path"

const { options, root } = config

class StoreController {
  saveState(store: string) {
    console.log(store, root)
  }
}

export const storeController = new StoreController()
