const nodemailer=require("nodemailer")

const sendMaile=async(option)=>{

    const trasproter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })

    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:option.email,
        subject:option.subject,
        message:option.message
    }

    await trasproter.sendMail(mailOptions)
}

module.exports=sendMaile