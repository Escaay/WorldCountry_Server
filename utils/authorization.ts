import jwt, { JwtPayload } from 'jsonwebtoken'
const SECERT = "secert_qiuwenjing"
export const verifyToken = async (req) => {
  try {
    const token = req.headers.get('authorization')
    const decoded = jwt.verify(token, SECERT)
    const id = decoded.id
    return true
  } catch (error) {
   return Promise.reject('token验证不通过')
  }
}

export const createAccessToken = (payload: JwtPayload) => {
  return jwt.sign(payload, SECERT, {
    expiresIn: '1d',
  })
}