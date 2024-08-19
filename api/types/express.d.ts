import { JwtPayload } from 'jsonwebtoken'

interface UserPayload extends JwtPayload {
  _id: string
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload
  }
}
