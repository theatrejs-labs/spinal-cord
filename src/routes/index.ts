import { Router } from "express"
import { storeController } from "../controllers/StoreController"
import chalk from "chalk"

import logger from "../utils/logger"
import { json } from "./responseNormalizer"

const router = Router()

router.get("/", (_, res) => {
  json(res, {
    status: 200,
    message: `Spinal server works properly`,
    data: {}
  })
})

router.get("/store/:store", (req, res) => {
  const { store } = req.params
  try {
    const data = storeController.fetchState(store)
    json(res, {
      status: 200,
      data
    })
    logger.info(chalk`{yellow ${store}} state fetched`)
  } catch (e) {
    logger.error(chalk`Couldn't find {yellow ${store}} state`)
  }
})

router.post("/store/:store", (req, res) => {
  const { store } = req.params
  const { data } = req.body
  try {
    storeController.saveState(store, data)
    logger.success(chalk`{yellow ${store}} state updated.`)
    json(res, {
      status: 200,
      data: {}
    })
  } catch (e) {
    logger.fail(chalk`{yellow ${store}} state failed to update.`)
    json(res, {
      status: 500,
      data: {}
    })
  }
})

router.post("/store/:store/assign", (req, res) => {
  const { store } = req.params
  const { data } = req.body
  // TODO: add asign
})

export default router
