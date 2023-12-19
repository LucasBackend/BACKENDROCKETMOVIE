const UserCreateService = require('./UserCreateService')
const UserRepositoryinMemory = require('../repositories/UserRepositoryinMemory')
const AppError = require('../utils/AppError')


describe("UserCreateService",()=>{
  let userRepositoryinMemory = null
  let userCreateService = null

  beforeEach(()=>{
    userRepositoryinMemory = new UserRepositoryinMemory();
    userCreateService = new UserCreateService(userRepositoryinMemory)
  })


  it("user should be create", async ()=>{
    const user = {
      name:"User Test",
      email:"user@test.com",
      password:"123"
    }
    
    const userCreated = await userCreateService.execute(user)
  
    expect(userCreated).toHaveProperty("id")
  });

  it("user not should be create with exists email",async ()=>{
    const user1 = {
      name: "User Test 1",
      email: "user@test.com",
      password:"123"

    };

    const user2 = {
      name: "User Test 2",
      email: "user@test.com",
      password:"456"

    }

    await userCreateService.execute(user1)

    expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este email já esta em uso"))

  });


})

