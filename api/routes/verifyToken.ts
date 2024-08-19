import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { UserPayload } from '../types/express'

function verify(req: Request, res: Response, next: NextFunction) {
  const token = req.header('token')
  if (!token) return res.status(401).send('Access Denied')
  try {
    const verified = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as UserPayload
    req.user = verified
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

export default verify
