import { Router } from "express"
import { config } from "../utils/configImporter"

const router = Router()

router.get("*", (_, res) => {
  res.json({ status: 200 })
})

export default router
