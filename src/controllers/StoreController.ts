import { getSubDirectory } from "../utils/configImporter"
import {
  createDirectoryIfNotExistSync,
  createOrUpdateFileSync,
  exportAllStores,
  readJSONFile
} from "../utils/fileSystem"
import { resolve } from "path"

class StoreController {
  saveState(store: string, data: any) {
    const storeDir = getSubDirectory(store)
    createDirectoryIfNotExistSync(storeDir)
    createOrUpdateFileSync(storeDir, "data.json", JSON.stringify(data))
    exportAllStores()
  }
  fetchState(store: string) {
    const storeDir = getSubDirectory(store)
    const jsonData = readJSONFile(
      getSubDirectory(resolve(storeDir, "data.json"))
    )
    return jsonData
  }
}

export const storeController = new StoreController()
