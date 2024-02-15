const Sitter = require("../Models/sitterModel");




const addmydetails = async (req, res) => {
    try {
        const userID = req.user.userId;
        const { education, description, drivers_license, non_smoker, cooking, draw, first_aid,experience_level } = req.body;
        
        await Sitter.addmydetails(userID, education, description, drivers_license, non_smoker, cooking, draw, first_aid,experience_level);

        res.status(201).json({ success: true, message: "Your details added successfully" });
    } catch (err) {
        console.error("Error adding details:", err);
        res.status(500).json({ success: false, error: "Your details failed" });
    }
}



const allsitters = async(req,res)=>{
    try{
        const sitters = await Sitter.allsitters();
        res.status(200).json({ success: true, sitters });
    }   catch (err) {
        console.error("Error adding details:", err);
        res.status(500).json({ success: false, error: "Sitters get failed" });
    }
}

const detail = async (req,res)=>{
    try{
        const sitterID = req.params.id;
        const sitter = await Sitter.detail(sitterID);
        res.status(200).json({ success: true, sitter });
    }
    catch (err) {
        console.error("Error adding details:", err);
        res.status(500).json({ success: false, error: "sitter info get failed" });
    }

}



module.exports = {
    addmydetails,
    allsitters,
    detail
  };
  