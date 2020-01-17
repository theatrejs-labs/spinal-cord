import { getSubDirectory } from "../utils/configImporter"
import {
  createDirectoryIfNotExistSync,
  createOrUpdateFileSync,
  exportAllStores
} from "../utils/fileSystem"

class StoreController {
  saveState(store: string, data: any) {
    const storeDir = getSubDirectory(store)
    createDirectoryIfNotExistSync(storeDir)
    createOrUpdateFileSync(storeDir, "data.json", JSON.stringify(data))
    exportAllStores()
  }
}

export const storeController = new StoreController()
