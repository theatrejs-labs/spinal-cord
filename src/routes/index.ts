import { Router } from "express"

const router = Router()

router.get("*", (_, res) => {
  res.json({ status: 200 })
})

export default router
