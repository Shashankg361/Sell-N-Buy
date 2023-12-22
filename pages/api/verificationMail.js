var nodemailer = require('nodemailer');
export async function verificationMail(req,res){
    var transporter = nodemailer.createTransport({
        service:'gamil',
        auth:{
            user:'shashankslocal@gmail.com',
            pass:process.env.MAIL_PASS,
        }
    });
    if(req.method === 'POST'){
        const getMail = req.body;





    }
}