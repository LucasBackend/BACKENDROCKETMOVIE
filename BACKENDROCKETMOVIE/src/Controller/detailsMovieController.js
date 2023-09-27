require("../utils/AppError")
const knex = require('../Database/knex')

class detailsMovieController {

async index(request,response){

  const {id} = request.params;

  const movie = await knex("MOVIE_NOTES").where({id:id}).first()

  const tags = await knex("MOVIE_TAGS").where({note_id:movie.id})

  response.json({movie,tags})

}




}

module.exports = detailsMovieController