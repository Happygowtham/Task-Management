const nodemailer = require('nodemailer');
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = require('../config');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

exports.sendEmail = (req, res) => {
    User.findById(req.body.to).then(mail => {
        const mailOptions = {
            from: EMAIL_USER,
            to: mail.email,
            subject: req.body.subject,
            html: req.body.email_content,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({
                    statuscode: 500,
                    status: "failed",
                    data: {},
                    error: [{ message: error.message, errorcode: 500 }],
                });
            } else {
                return res.status(200).json({
                    statuscode: 200,
                    status: "success",
                    data: "Email sent successfully!",
                    error: [{ message: "", errorcode: "" }],
                });
            }
        });
    })

};
