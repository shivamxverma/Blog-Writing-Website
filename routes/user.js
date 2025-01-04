const {Router} = require('express');
const router = Router();
const User = require('../models/user');

router.get('/signin',(_,res)=>{
  return res.render('signin');
})

router.post('/signin',async(req,res)=>{
  const {email,password} = req.body;
  try{
    const token = await User.matchPasswordandcreatetoken(email,password);
    return res.cookie('token',token).redirect('/');
  }
  catch(error){
    return res.render('signin',{
      error:'Incorrect Email and Password',
    });
  }
})

router.get('/signup',(_,res)=>{
  return res.render('signup');
})

router.post('/signup',async (req,res)=>{
  const {fullName,email,password} = req.body;
  await User.create({
    fullName, email, password,
  });
  return res.redirect('/');
})

router.get('/login',(req,res)=>{
  res.clearCookie('token').redirect('/');
})

module.exports = router;