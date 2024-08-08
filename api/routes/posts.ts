import express from 'express'
const router = express.Router()

import verify from './verifyToken'

router.get('/', verify, (req, res) => {
  res.send(req.user)
})

export default router
