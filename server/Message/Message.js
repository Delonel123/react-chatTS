import mongoose from 'mongoose'

const Message = new mongoose.Schema({
    body:{type:String, required:true},
    user:{type:mongoose.Schema.Types.ObjectId,required:true},
    dialog:{type:mongoose.Schema.Types.ObjectId, required:true},
    isRead:{type:Boolean, default:false}
})

export default mongoose.model('Message',Message)