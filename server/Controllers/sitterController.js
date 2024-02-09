const Sitter = require("../Models/sitterModel");




const addmydetails = async (req, res) => {
    try {
        const userID = req.user.userId;
        const { education, description, ages, drivers_license, non_smoker, cooking, draw, first_aid,experince_level } = req.body;
        
        await Sitter.addmydetails(userID, education, description, ages, drivers_license, non_smoker, cooking, draw, first_aid,experince_level);

        res.status(201).json({ success: true, message: "Your details added successfully" });
    } catch (err) {
        console.error("Error adding details:", err);
        res.status(500).json({ success: false, error: "Your details failed" });
    }
}


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
    addmydetails,
    mydetails
  };
  