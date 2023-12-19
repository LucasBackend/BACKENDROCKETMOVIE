const knex = require('../Database/knex')

class UserRepository {
  async findByUser(email){
    const user = await knex("Users").where({email}).first()
    return user
  }

  async create({name,email,password}){
    const userId = await knex("Users").insert({name,email,password})

    return {id:userId}
  }
}

module.exports = UserRepository