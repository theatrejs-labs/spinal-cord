import { Router } from "express"
import { storeController } from "../controllers/StoreController"

const router = Router()

router.post("/state/:store", (req, res) => {
  const { store } = req.params
  storeController.saveState(store)
  res.json({ status: 200 })
})

export default router
