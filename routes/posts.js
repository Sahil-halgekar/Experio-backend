const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");


router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  const category = req.query.category;
  try {
    let posts;
    if (!category) {
      posts = await Post.find().sort({_id: -1});
    } else {
      posts = await Post.find({category}).sort({_id: -1});
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let posts;
    if (!username) {
      posts = await Post.find().sort({_id: -1});
    } else {
      posts = await Post.find({username}).sort({_id: -1});
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.put('/like/:id',async(req,res)=>{
      try {
        const likedby=req.body.likedby
        console.log(likedby)
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $push: {like:{likedby},
          }},
          { new: true }
        );
        res.status(200).json(updatedPost)
      } catch (err) {
        res.status(500).json(err);
      }
})
router.put('/comment/:id',async(req,res)=>{
  try {
    const text=req.body.text
    const username=req.body.username
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {comments:{text,username},
      }},
      { new: true }
    );
    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
