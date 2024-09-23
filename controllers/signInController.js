
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../sequelize"); // Assuming Sequelize model is defined here

const SECRET_KEY = "gunmeet"; // Replace with your actual secret key


async function signInApi(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const userData = await user.findOne({ where: { email: email } });
    if (!userData) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" }); 
    }
    let data = {
    signInTime: Date.now(),
    userData,
  }

    const token = jwt.sign(data, SECRET_KEY, { expiresIn: "12h" });
    const message = "success";
    res.setHeader('Authorization', `${token}`);
   return  res.status(200).json({  token , message, userData});
  } catch (error) {
    res.status(500).json({ error: "Error signing in...." });
  }
}
async function createUser(req, res) {
  const { name,email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const userData = await user.findOne({ where: { email: email } });
    if (userData) {
      return res.status(400).json({ error: "User Already Exist" });
    }

  const {hash} = bcrypt;
  const pass = await hash(password,10);
    
  try {
    const newUser = await user.create({
      email: email,
      password: pass,
      name:name
    });

    if (!newUser) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const message = "success";

    return res.status(200).json({newUser,message});
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = { signInApi, createUser};
