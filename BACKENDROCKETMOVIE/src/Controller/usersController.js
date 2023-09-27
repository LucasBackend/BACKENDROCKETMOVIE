const knex = require('../Database/knex')
const AppError = require('../utils/AppError')
const {hash, compare} = require("bcryptjs")

class UsersController{

async create(request,response){

 

const {name,email,password} = request.body

const user = await knex("Users").where({email}).first()

if(!name){
  throw new AppError("Nome é obrigatório")
}

if(user){
  throw new AppError("Este email já esta em uso")
}

const securityPassWord = await hash(password,8)

await knex("Users").insert({name,email,password:securityPassWord})




return response.status(200).json()

}

async delete(request,response){
  const user_id = request.params.ID

  const user = await knex("Users").where({id:user_id}).first().delete()

  return response.json()

}

async read(request,response){

 const users = await knex("Users").orderBy("name")
 

  return response.status(200).json(users)
}

async update(request,response){

  const user_id = request.user.id
  const {name,email,oldpassword,password} = request.body

  const userId = await knex("Users")
  .where({id:user_id}).first()

  const UserEmail = await knex("Users")
  .where({email}).first()

  if(!userId){
    throw new AppError("Usuário não encontrado!")
  }

  if(UserEmail && userId.id !== UserEmail.id){
    throw new AppError("Já existe um usuário com este email")
  }

  userId.name = name || userId.name
  userId.email = email || userId.email

  if(password && !oldpassword){
    throw new AppError("Digite sua senha antiga")
  }

 
  if(password && oldpassword){
    const compareKey = await compare(oldpassword,userId.password)
  
    if(!compareKey){
      throw new AppError("A senha antiga digitada está incorreta!")
    }

    const newPassword = await hash(password,8)
    userId.password = newPassword
  }
  


  await knex("Users").update({name:userId.name,email:userId.email,password:userId.password,update_at:knex.fn.now()})
  .where({id:user_id})

  return response.status(200).json()

  




}



}

module.exports = UsersController