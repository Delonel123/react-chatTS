import mongoose from 'mongoose'


const User = new mongoose.Schema({
    login: { type: String, unique:true, required:true },
    password: { type: String, required:true },
    email: { type: String},
    online:{type:Boolean, default:false}
})
export default mongoose.model('User', User)