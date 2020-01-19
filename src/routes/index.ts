import { Router } from "express"
import { storeController } from "../controllers/StoreController"
import logger from "../utils/logger"

const router = Router()

router.get("/", (_, res) => {
  res.json({
    status: 200,
    message: `Spinal server works properly`
  })
})

router.get("/store/:store", (req, res) => {
  const { store } = req.params
  try {
    const data = storeController.fetchState(store)
    res.json({
      status: 200,
      data
    })
    logger.info(`{yellow ${store}} state fetched`)
  } catch (e) {
    logger.error(`Couldn't find {yellow ${store}} state`)
  }
})

router.post("/store/:store", (req, res) => {
  const { store } = req.params
  const { data } = req.body
  try {
    storeController.saveState(store, data)
    logger.success(`{yellow ${store}} state updated.`)
    res.json({ status: 200 })
  } catch (e) {
    logger.fail(`{yellow ${store}} state failed to update.`)
    res.json({ status: 500 })
  }
})

export default router
