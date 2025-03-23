const {Router} = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const fs = require('fs');

const uploadDir = path.resolve(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage })

router.get('/add-blog',(req,res)=>{
  return res.render('addBlog')
})

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('CreatedBy'); 
    const comments = await Comment.find({ blogId: req.params.id }).populate('CreatedBy');
    res.render("blog", { 
      user: req.user,
      blog,
      comments
    });
});

router.post('/comment/:blogId', async (req, res) => {
  const { content } = req.body;
  await Comment.create({
    content,
    blogId: req.params.blogId,
    CreatedBy: req.user._id
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});



router.post('/', upload.single('coverImageUrl'), async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.create({
    title,
    content,
    CreatedBy : req.user._id,
    coverImageUrl: `/uploads/${req.file.filename}`
  });
  return res.redirect(`/blog/${blog._id}`);
});


module.exports = router;