const express = require('express');
const router = express.Router();
const baseController = require('../controllers/controller');
const userController = require('../controllers/user.controller');
const eventController = require('../controllers/event.controller')
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('./cloudinary.config');


router.get('/', baseController.base);

//USERS
router.post('/register', upload.single('image'), userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)


//EVENTS

router.get('/events', eventController.list)
router.get('/:id', eventController.get)
router.post('/events', eventController.create)
router.delete('/:id', eventController.delete)



module.exports = router;

