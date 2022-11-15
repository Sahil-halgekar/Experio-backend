const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema.Types;
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    category:{
      type:String
    },
    like:[{
      likedby:{type:{ObjectId},ref:"User"},
    }],
    comments:[{
      text:String,
      username:String
  }]
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
