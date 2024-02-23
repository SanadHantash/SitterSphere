const Reaction = require('../models/reactionsModel');

const addrate = async (req, res) => {
 
    try {

     const { role } = req.user;

    if (role !== 'user') {
      return res.status(403).json({ success: false, message: 'Access denied. Only families are allowed.' });
    }
        const {rate} = req.body;
        const sitterID = req.params.id;
        const userID = req.user.userId;
        await Reaction.addrate(sitterID, userID, rate);
        res.status(200).json({ success: true, message: 'your rate added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const addcomment = async (req, res) => {
//     const {comment} = req.body;
//     const productId = req.params.id;
//     const userID = req.user.userId;
//     try{
//         await Reaction.addcomment(productId,userID,comment);
//         res.status(200).json({ success: true, message: 'your comment added successfully' });
//     }catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// const getcomments = async (req, res) => {
//     const productId = req.params.id;
//     try {
//       const comments = await Reaction.getcomments(productId);
//       res.status(200).json(comments);
//     }catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, error: 'Error in getting comments' });
//     }
//   };

module.exports = {
    addrate,
    // addcomment,
    // getcomments
};