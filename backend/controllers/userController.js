const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '365d',
    });
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
          success: false,
          message: 'Please provide all required fields: username, email, and password'
      });
  }
    const userExists = await User.findOne({ email });
    if(userExists){
        return{
            success : false,
            message : "User Already exists"
        }
    }
    const user = await User.create({
        username,
        email,
        password
    });

    if (user) {
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ message: 'Invalid user data'});;
        // throw new Error('Invalid user data');
      }
    }


  
    const loginUser = async (req, res) => {
      console.log(req.body);
      const { email, password } = req.body;
    
      const user = await User.findOne({ email });
    
      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
        // throw new Error('Invalid email or password');
      }
    };


module.exports = {
    registerUser , 
    loginUser
}
    
    

