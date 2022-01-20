import mongoose from "mongoose"

const IntermediaDialog = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, required:true},
    dialog:{type:mongoose.Schema.Types.ObjectId, required:true}
})
export default mongoose.model('intermediaDialog',IntermediaDialog)