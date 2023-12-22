var nodemailer = require('nodemailer');
export default async function verificationMail(req,res){
    var transporter = nodemailer.createTransport({
        service:'gamil',
        auth:{
            user:'shashankslocal@gmail.com',
            pass:process.env.MAIL_PASS,
        }
    });
    if(req.method === 'POST'){
        const data = req.body;
        console.log("Mail",data.getMail);
        const mailOptions = {
            from:'shashankslocal@gmail.com',
            to:data.getMail,
            subject:'testing',
            text:'Hii'
        }

        try{
            await transporter.sendMail(mailOptions)
            res.status(200).json({Message:'mail sended'});
        }catch(error){
            res.json({Message:`Error occured while sending mail ${error}`});
        }
        


    }
}