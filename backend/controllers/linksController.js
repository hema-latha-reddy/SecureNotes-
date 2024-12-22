import Link from '../models/link.js';
import User from '../models/user.js';
import { encryptData, decryptData } from '../middleware/encryption.js';
import bcrypt from 'bcrypt';

const saveLink = async (req, res) => {
  //console.log("Req",req.user)
  const { content } = req.body;
  try {
    const encryptedLink = encryptData(content);
    //console.log(encryptedLink)
    const link = new Link({ userId: req.user._id ,content: encryptedLink.encryptedData, iv: encryptedLink.iv,}); // Associate link with user
    await link.save();
    return res.json({ success:true,message: 'Link saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLinks = async (req, res) => {
  try {
    // Retrieve only the links of the authenticated user
    
    const links = await Link.find({ userId: req.user._id });
  
    //console.log(links)
    if (!links || links.length === 0) {
      return res.status(404).json({ message: "No links found" });
    }
    
    const decryptedLinks = links.map(link => {
   
      const decryptedData = decryptData(link.content, link.iv);
      //console.log(decryptedData);
      return {...link.toObject(),decryptedData}
      //content: decryptData(link.content,link.iv),
    });
    
    res.status(200).json(decryptedLinks); 
    


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const decryptLinks = async (req, res) => {
  //const { username,password } = req.body;

  try {
    const { username,password } = req.body;
    const user = await User.findOne({username}); 
    // Find the user by ID
    console.log("users",user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password with bcrypt
    //const hashedpassword = await bcrypt.hash(password, 10);
    console.log("p",password)
    console.log("up",user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Decrypt links if password matches
    const links = await Link.find({ userId: req.user._id });

    if (!links || links.length === 0) {
      return res.status(404).json({ message: "No links found" });
    }

    const decryptedLinks = links.map(link => {
      const decryptedData = decryptData(link.content, link.iv);
      return { ...link.toObject(), decryptedData };
    });

    res.status(200).json({ success: true, decryptedLinks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { saveLink, getLinks, decryptLinks };

