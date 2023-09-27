const {Router} = require("express")

const userRoutes = require("./user.routes")
const movieRoutes = require("./movie.routes")
const sessionsRoutes = require('./sessions.routes')

const router = Router()

router.use('/users',userRoutes)
router.use('/sessions',sessionsRoutes)
router.use('/movie',movieRoutes)





module.exports = router