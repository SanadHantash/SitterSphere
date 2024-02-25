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

const applysitter = async(req,res)=>{
    try{
        const { role } = req.user;

        if (role !== 'user') {
          return res.status(403).json({ success: false, message: 'Access denied. Only families are allowed.' });
        }
            const sitterID = req.params.id;
            const userID= req.user.userId; 
            const{childern_count,months_0_12,years_1_2,years_2_3,years_3_5,years_5,start_time,site}=req.body;

            const isApplied = await Sitter.isapplied(userID, sitterID);
    
            if (isApplied) {
              return res.status(400).json({ success: false, error: "you are already applied for this babysitter" });
            }

            await Sitter.applysitter(sitterID,userID,childern_count,months_0_12,years_1_2,years_2_3,years_3_5,years_5,start_time,site) ;
            res.status(201).json({ success: true, message: "Your application added successfully" });

    } catch (err) {
        console.error("Error adding details:", err);
        res.status(500).json({ success: false, error: "Your application added failed" });
    }
}

module.exports = {
    addmydetails,
    allsitters,
    detail,
    applysitter
  };
  