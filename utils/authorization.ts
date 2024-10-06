import * as jose from 'jose';

// const encodedSecret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
const encodedSecret = new TextEncoder().encode('qiuwenjing_secert');

export const createAccessToken = async (payload: any)=> {
  const signedToken = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(encodedSecret);
  if (!signedToken) {
    return Promise.reject('创建token失败');
  }
  return signedToken;
};

export const verifyToken = async (req: any) => {
  let token = req.headers.get('authorization') || req.headers.get('Authorization')
  if (token) {
    try {
      if (token.startsWith('Bearer')) {
        token = token.replace('Bearer ', '')
      }

      const decoded = await jose.jwtVerify(token, encodedSecret)
      // console.log('decoded', decoded)
      if (decoded.payload?.id) {
        return true
      } else {
        return false
      }
    } catch (err: any) {
      return Promise.reject(err.message)
    }
  } else {
    return false
  }
}