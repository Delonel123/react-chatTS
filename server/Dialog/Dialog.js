import mongoose from 'mongoose'

const Dialog = mongoose.Schema({
    userOne:{type:mongoose.Schema.Types.ObjectId,require:true},
    userTwo:{type:mongoose.Schema.Types.ObjectId,require:true}
})
export default mongoose.model('Dialog',Dialog)