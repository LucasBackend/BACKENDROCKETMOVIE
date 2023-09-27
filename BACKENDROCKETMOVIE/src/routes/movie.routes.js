const {Router} = require("express")

const movieController = require("../Controller/moviesController")
const movieCrud = new movieController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const detailMovieController =  require('../Controller/detailsMovieController');
const DetailMovieController = new detailMovieController();

const router = Router()

router.use(ensureAuthenticated)


router.post('/create/', movieCrud.created)
router.delete('/delete/:note_id', movieCrud.delete)
router.post('/show/', movieCrud.show)
router.get('/details/:id',DetailMovieController.index)




module.exports = router