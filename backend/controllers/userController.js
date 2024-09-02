const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '365d',
    });
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
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


module.exports = {
    registerUser
}
    
    

