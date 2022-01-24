import Dialog from "./Dialog/Dialog.js"
import intermediateDialog from "./intermediateDialog.js"
import Message from "./Message/Message.js"
import User from "./User/User.js"

class MessageController {
    async SendMessage(req, res) {
        try {
            const { body, dialog, user, usercompanion } = req.body
            const findUser = await User.findOne({ _id: user })
            const findUserCompanion = await User.findOne({ _id: usercompanion })
            if (!findUserCompanion) {
                return res.status(500).json('Пользователь не найден')
            }
            if (!findUser) {
                return res.status(500).json('Пользователь не найдет')
            }
            const fingDialog = await Dialog.findOne({ id: dialog })
            if (!fingDialog) {
                const newDialog = new Dialog({ userOne: findUser._id, userTwo: findUserCompanion._id })
                newDialog.save()
                const newMessage = await new Message({ body, user: findUser._id, dialog: newDialog._id })
                newMessage.save()
                return res.status(200).json(newMessage)
            }
            const newMessage = await new Message({ body, user: findUser._id, dialog: fingDialog._id })
            newMessage.save()
            return res.status(200).json(newMessage)
        } catch (e) {
            res.status(500)
        }
    }
    async GetMessage(req, res) {
        try {
            const { user, usercompanion} = req.body
            const findUser = await User.findOne({ _id: user })
            const findUserCompanion = await User.findOne({ _id: usercompanion })
            let fingDialog = await Dialog.findOne({ userOne: user,userTwo: findUserCompanion})
            if(!fingDialog){
                fingDialog = await Dialog.findOne({ userOne: findUserCompanion._id,userTwo: findUser._id})
            }
            if (!fingDialog) {
                const newDialog = new Dialog({ userOne: findUser._id, userTwo: findUserCompanion._id })
                newDialog.save()
                return res.status(200).json({messages:[],newDialog})
            }
           const messages = await Message.find({dialog:fingDialog._id})
           return res.status(200).json({messages})
        } catch (e) {

        }
    }
}

export default new MessageController()