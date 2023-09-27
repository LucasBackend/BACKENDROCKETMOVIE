const AppError = require("../utils/AppError")

require("../utils/AppError")
const knex = require('../Database/knex')

class moviesController{

async created(request,response){

  const user_id = request.user.id 
  const {title, description,rating,links} = request.body

  if(rating<0 || rating>5){
    throw new AppError("Nota somente de 0 a 5.")
  }

  const [note_id] = await knex("MOVIE_NOTES").insert({title,description,rating,user_id})

  const linksMovie = links.map(tag => {

    return {
      name:tag,
      user_id,
      note_id
    }

  })

  await knex("MOVIE_TAGS").insert(linksMovie)


  return response.json()



}

async delete(request,response){

  const {note_id} = request.params

  await knex("MOVIE_NOTES").where({id:note_id}).delete()

  return response.status(200).json()

}

async show(request, response){

const {title,tags} = request.body
const user_id = request.user.id
let notes

if(tags){

  const tagsFilter = tags.split(',').map(tag => tag.trim())

  notes = await knex("MOVIE_TAGS")
  .select(
    "MOVIE_NOTES.id",
    "MOVIE_TAGS.name",
    "MOVIE_NOTES.title",
    "MOVIE_NOTES.description"
   
  )
  .where({"MOVIE_TAGS.user_id":user_id})
  .whereIn("MOVIE_TAGS.name",tagsFilter)
  .whereLike("MOVIE_NOTES.title",`%${title}%`)
  .innerJoin("MOVIE_NOTES","MOVIE_NOTES.id","MOVIE_TAGS.note_id")
  .orderBy("MOVIE_NOTES.title")
    

} else{

notes = await knex("MOVIE_NOTES")
.where({user_id})
.whereLike("title",`%${title}%`)
.orderBy("title")

}

const alltags = await knex("MOVIE_TAGS")
.where({user_id})

const allNotes = notes.map(note => {
const tagsNote = alltags.filter(tag=> tag.note_id ===note.id)

return {
  ...note,
  tags:tagsNote
}



})


return response.json(allNotes)










}








}

module.exports = moviesController