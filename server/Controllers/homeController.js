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
const recentrequests = async (req, res, next) => {

    try {
      const requests = await Home.recentrequests();
      res.status(200).json({ success: true, requests });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting requests' });
    }
  };


  module.exports = {
    topratedsitters,
    recentrequests
  }