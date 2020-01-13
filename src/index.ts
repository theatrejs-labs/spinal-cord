#!/usr/bin/env node

import bodyParser from 'body-parser'
import express from 'express'
import { resolve } from 'path'
import { readdirSync } from 'fs'
import { createDirectoryIfNotExistSync, createOrUpdateFileSync } from './utils/fileSystem'

const app = express()
const port = 3030

app.use(bodyParser.json())

const options = {
  path: resolve(__dirname, '../examples/browser/ignore-this'),
}

const exportAllStores = (rootPath: string) => {
  const allStores = readdirSync(rootPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dir => dir.name)
  const imports = allStores.map(store => {
    return `const ${store} = require('./${store}/data.json');`
  })
  createOrUpdateFileSync(
    resolve(rootPath, 'index.js'),
    `${imports.join('\n')}\n\nmodule.exports = { ${allStores.join(', ')} }`,
  )
}

createDirectoryIfNotExistSync(options.path)

app.post('/update/:store', (req, res) => {
  console.log(req.body)
  const { store } = req.params
  const storeDir = resolve(options.path, store)
  const jsonStore = resolve(storeDir, `data.json`)
  try {
    createDirectoryIfNotExistSync(storeDir)
    createOrUpdateFileSync(jsonStore, JSON.stringify(req.body.data))
    exportAllStores(options.path)
    res.json({
      status: 200,
    })
  } catch (e) {
    res.json({
      status: 500,
    })
  }
})

app.listen(port, () => console.log(`Spinal listening on port ${port}!`))
