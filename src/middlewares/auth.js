import JWT from "jsonwebtoken"

export const Auth = {
 private: async (req, res, next) => {
  let success = false
  if (req.headers.authorization) {
   const [AuthType, token] = req.headers.authorization.split(' ')
   if (AuthType === "Bearer") {
    try {
     JWT.verify(token, process.env.JWT_SECRET_KEY)
     success = true
    } catch (err) {
    }
   }
  }
  if (success) {
   next()
  } else {
   res.status(403)// não permitido
   res.json({ error: "Não autorizado" })
  }
 }
}
