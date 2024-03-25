const Sitter = require("../Models/sitterModel");
const Dashboard = require("../Models/dashboardModel")



const addmydetails = async (req, res) => {
    try {
        const userID = req.user.userId;
        const {description,months_0_12,years_1_2,years_2_3,years_3_5,years_5,can_drive, non_smoker, cooking, draw, first_aid,reading,has_car,music,experience_level,salary } = req.body;
        const isFound = await Sitter.mydetail(userID);
    
        if (isFound) {
          return res.status(400).json({ success: false, error: "you  already added your Info" });
        }

        await Sitter.addmydetails(userID,description,months_0_12,years_1_2,years_2_3,years_3_5,years_5,can_drive, non_smoker, cooking, draw, first_aid,reading,has_car,music,experience_level,salary);

        res.status(201).json({ success: true, message: "Your details added successfully" });
    } catch (err) {
        console.error("Error adding details:", err);
        res.status(500).json({ success: false, error: "Your details failed" });
    }
}



const allsitters = async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 9;
        const sitters = await Sitter.allsitters();
        const totalCount = await Dashboard.countrequests(page, pageSize);
        const totalPages = Math.ceil(totalCount / pageSize);
        res.status(200).json({ success: true, sitters,totalCount, totalPages });
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
        console.error("Error get details:", err);
        res.status(500).json({ success: false, error: "sitter info get failed" });
    }

}

const applysitter = async(req,res)=>{
    try{
        const { role } = req.user;
        if (role == 'sitter') {
          return res.status(403).json({ success: false, message: 'Access denied. Only families are allowed.' });
        }
            const sitterID = req.params.id;
            const userID= req.user.userId; 
            const{childern_count,months_0_12,years_1_2,years_2_3,years_3_5,years_5,start_time,site,salary,period}=req.body;

            const isApplied = await Sitter.isapplied(userID, sitterID);
    
            if (isApplied) {
              return res.status(400).json({ success: false, error: "you are already applied for this babysitter" });
            }

            await Sitter.applysitter(sitterID,userID,childern_count,months_0_12,years_1_2,years_2_3,years_3_5,years_5,start_time,site,salary,period) ;
            res.status(201).json({ success: true, message: "Your application added successfully" });

    } catch (err) {
        console.error("Error adding details:", err);
        res.status(500).json({ success: false, error: "Your application added failed" });
    }
}

const mydetail = async(req,res)=>{
    try{
        const userID= req.user.userId; 
        const mydetail = await Sitter.mydetail(userID)
        res.status(200).json({ success: true, mydetail });
    }
    catch (err) {
        console.error("Error get details:", err);
        res.status(500).json({ success: false, error: "my detail get failed" });
    }
}

module.exports = {
    addmydetails,
    allsitters,
    detail,
    applysitter,
    mydetail
  };
  