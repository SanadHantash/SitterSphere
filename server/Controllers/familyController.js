const Family = require("../Models/familyModel");
const multer = require("multer");
const { admin } = require("../firebase");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");


const addrequest = async (req, res) => {
    try {

  
      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ success: false, error: err.message });
        }
            const userID = req.user.userId
        const {
            title,description,children_count,ages,requirements,start_time,end_time
        } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;
  
        const imageUrl = await uploadImageToFirebase(imageBuffer);
  
  
        await Family.addrequest(
            userID,title,description,children_count,ages,requirements,imageUrl,start_time,end_time
        );
  
        res
          .status(201)
          .json({ success: true, message: "Course added successfully" });
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: "Course added failed" });
    }
  };
  

  const uploadImageToFirebase = async (imageBuffer) => {
    const bucket = admin.storage().bucket();
  
    const folderPath = "requests/";
  
    const uniqueFilename = "image-" + Date.now() + ".png";
  
    const filePath = folderPath + uniqueFilename;
  
    const file = bucket.file(filePath);
  
    await file.createWriteStream().end(imageBuffer);
  
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
  
    return imageUrl;
  };
  


const mydetails = async (req,res)=>{
    try{
        const userID = req.user.userId;
        const mydetails = await Sitter.mydetails(userID);
        res.status(201).json({ success: true, mydetails });
    }
    catch (err) {
        console.error("Error adding details:", err);
        res.status(500).json({ success: false, error: "Your details get failed" });
    }

}




module.exports = {
    addrequest,
    mydetails
  };
  