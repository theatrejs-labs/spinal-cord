import { mkdirSync, writeFileSync } from 'fs'

export const createDirectoryIfNotExistSync = (path: string) => {
  try {
    mkdirSync(path)
  } catch (e) {
    /* Do nothing if directory exists */
  }
}
export const createOrUpdateFileSync = (path: string, data: string) => {
  writeFileSync(path, data, {
    encoding: 'utf-8',
    flag: 'w',
  })
}
