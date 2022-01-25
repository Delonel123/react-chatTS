import { Router } from 'express'
import MessageController from '../MessageController.js'
import UserController from './UserController.js'

const router = new Router()

// Authorisation
router.post('/registration', UserController.registration)
router.post('/logIn', UserController.logIn)
router.get('/logOut', UserController.logOut)
router.get('/getUsers', UserController.getUsers)
router.get('/refresh', UserController.refresh)
// Message
router.post('/sendMessage',MessageController.SendMessage)
router.post('/getMessages', MessageController.GetMessage)
router.post('/readMessages', MessageController.ReadMessage)

export default router