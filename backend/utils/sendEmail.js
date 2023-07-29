const nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for 587
    service: "gmail",
    auth: {
        user: "prodone13@gmail.com",
        pass: "uthbqigankcdzngh"
    }
})
const sendEmail = async (options) => {
    const mailOptions = {
        from: "prodone13@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail




