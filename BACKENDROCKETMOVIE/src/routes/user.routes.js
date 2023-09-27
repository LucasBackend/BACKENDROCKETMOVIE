const {Router} = require("express");
const multer = require("multer");
const uploadConfig = require('../configs/upload');

const UserController = require("../Controller/usersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const upload = multer(uploadConfig.MULTER)
const UserAvatarController = require("../Controller/userAvatarController")


const UserCrud = new UserController();
const userAvatarController = new UserAvatarController();

const router = Router()


router.post('/create', UserCrud.create)
router.delete('/delete/:ID',UserCrud.delete)
router.get('/read',ensureAuthenticated,UserCrud.read)
router.put('/update/',ensureAuthenticated,UserCrud.update)
router.patch("/avatar",ensureAuthenticated, upload.single("avatar"),userAvatarController.update)



module.exports = router