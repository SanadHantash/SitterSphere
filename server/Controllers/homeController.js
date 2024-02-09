const Home = require('../Models/homeModel.js');

const topratedsitters = async (req, res, next) => {

    try {
      const sitters = await Home.topratedsitters();
      res.status(200).json({ success: true, sitters });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting sitters' });
    }
  };
const allelderliesworkshops = async (req, res, next) => {

    try {
      const courses = await Home.allelderliesworkshops();
      res.status(200).json({ success: true, courses });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting workshops' });
    }
  };


  module.exports = {
    topratedsitters,
    allelderliesworkshops
  }