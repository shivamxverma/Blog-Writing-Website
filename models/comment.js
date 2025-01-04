const { Schema, model } = require("mongoose");

const commentShema = new Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:'blog'
    },
    CreatedBy:{
        type:Schema.Types.ObjectId,
        ref:'user',
    }
},{timestamps:true});


const Comment = model('comment',commentShema);

module.exports = Comment;