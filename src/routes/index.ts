import { Router } from "express"
import { storeController } from "../controllers/StoreController"
import logger from "../utils/logger"

const router = Router()

router.post("/state/:store", (req, res) => {
  const { store } = req.params
  const { data } = req.body
  try {
    storeController.saveState(store, data)
    logger.success(`"${store}" state updated.`)
    res.json({ status: 200 })
  } catch (e) {
    logger.fail(`"${store}" state failed to update.`)
    res.json({ status: 500 })
  }
})

router.get("/state/:store", (req, res) => {
  const { store } = req.params
  try {
    const data = storeController.fetchState(store)
    res.json({
      status: 200,
      data
    })
    logger.info(`${store} state fetched`)
  } catch (e) {
    logger.error(`Couldn't find ${store} state`)
  }
})

export default router
