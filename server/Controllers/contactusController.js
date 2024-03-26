const nodemailer = require('nodemailer');

const mail = async (req, res) => {
  try {
    const { email,title,message } = req.body;

  

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sittersphere5@gmail.com',
        pass: 'iyzcqvbtdczixtro',
      },
    });

    await transporter.sendMail({
      to: 'sittersphere5@gmail.com',
      subject: title,
      text: `from ${email}\n${message}`,
    });
    await transporter.sendMail({
      to: email,
      subject: "SitterSphere",
      text: "thank you to contact us we will contact you soon",
    });

    res.json({
      success: true,
      message: 'Your email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while sending the email',
      error: error.message,
    });
  }
};

module.exports = {mail};


