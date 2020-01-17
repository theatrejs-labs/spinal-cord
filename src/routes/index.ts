import { Router } from "express"
import { storeController } from "../controllers/StoreController"

const router = Router()

router.post("/state/:store", (req, res) => {
  const { store } = req.params
  const { data } = req.body
  storeController.saveState(store, data)
  res.json({ status: 200 })
})

export default router
