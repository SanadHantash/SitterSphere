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
            title,description,children_count,months_0_12,years_1_2,years_2_3,years_3_5,years_5,can_drive,non_smoker,cooking,draw,first_aid,has_car,reading,music,time,pay
        } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;
  
        const imageUrl = await uploadImageToFirebase(imageBuffer);
  
  
        await Family.addrequest(
          userID,
          title,
          description,
          children_count,
          months_0_12,
          years_1_2,
          years_2_3,
          years_3_5,
          years_5,
          can_drive,
          non_smoker,
          cooking,
          draw,
          first_aid,
          has_car,
          reading,
          music,
          imageUrl,
          time,
          pay
        );
  
        res
          .status(201)
          .json({ success: true, message: "Request added successfully" });
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: "Request added failed" });
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
  




const allrequests = async (req, res, next) => {

  try {
    const requests = await Family.allrequests();
    res.status(200).json({ success: true, requests });
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error in getting requests' });
  }
};

const detail = async (req,res)=>{
  try{
      const requestID = req.params.id;
      const request = await Family.detail(requestID);
      res.status(200).json({ success: true, request });
  }
  catch (err) {
      console.error("Error adding details:", err);
      res.status(500).json({ success: false, error: "request detail get failed" });
  }

}


const applyrequest = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== 'sitter') {
      return res.status(403).json({ success: false, message: 'Access denied. Only families are allowed.' });
    }

    const requestID = req.params.id;
    const userID = req.user.userId;

    const isApplied = await Family.isapplied(userID, requestID);
    
    if (isApplied) {
      return res.status(400).json({ success: false, error: "you are already applied for this request" });
    }

    await Family.applyrequest(requestID, userID);
    res.status(201).json({ success: true, message: "your apply added successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: "your apply added failed" });
  }
}

module.exports = {
    addrequest,
    allrequests,
    detail,
    applyrequest
  };
  