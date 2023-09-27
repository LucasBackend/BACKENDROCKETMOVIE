const {verify} = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require('../configs/auth')

function ensureAuthenticated(request,response,next){
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("JWT Token não informado",401)
  }

  const [,token] = authHeader.split(" ");

  try {
    /**A VARIÁVEL ABAIXO É O SUB OU SEJA OQUE ESTA DENTRO DO TOKEN, OQUE FOI PASSADO NO CORPO, NESTE CASO O ID */
    const {sub:user_id} = verify(token,authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    }
  }catch{
    throw new AppError("JWT Token inválido",401)
  }

  return next()
 
}

module.exports = ensureAuthenticated