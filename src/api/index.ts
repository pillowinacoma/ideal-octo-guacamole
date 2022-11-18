import express from "express"

const router = express.Router()

router.get("/", async (_req, res) => {
  return res.send("HELLO")
})

export default router
