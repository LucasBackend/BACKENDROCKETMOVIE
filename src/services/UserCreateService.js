const {hash} = require("bcryptjs")
const AppError = require('../utils/AppError')

class UserCreateService{
  constructor(userRepository){
    this.userRepository = userRepository
  }

async execute({name,email,password}){

  const user = await this.userRepository.findByUser(email)
  
  if(!name){
  throw new AppError("Nome é obrigatório")
  }

  if(user){
    throw new AppError("Este email já esta em uso")
  }

  const securityPassWord = await hash(password,8)

  const userCreated = await this.userRepository.create({name,email,password:securityPassWord})

  return userCreated;
}
}
module.exports = UserCreateService