var nodemailer = require('nodemailer');
export default async function verificationMail(req,res){

    var transporter = nodemailer.createTransport({
        host:'smtp-relay.sendinblue.com',
        port:587,
        service:'gamil',
        auth:{
            user:'shashankslocal@gmail.com',
            pass:process.env.MAIL_PASS,
        }
    });

    if(req.method === 'POST'){
        const data = req.body;
        console.log("Mail",data.Email);
        const link = `http://localhost:3000/VerificationPg?id=${data.Email}`;
        const mailOptions = {
            from:'shashankslocal@gmail.com',
            to:data.Email,
            subject:'Verification mail by AaOo',
            html : `<html>
                    <body>
                        <h1>Verify your email </h1>
                        <a href="${link}" style="style="text-decoration: none; padding: 10px 20px; background-color: #007bff; color: #ffffff; border-radius: 5px;">
                        <button>Click</button>
                        <a>
                    </body>
                    </html>`
        }

        try{
            await transporter.sendMail(mailOptions)
            res.status(200).json({Message:'mail sended'});
        }catch(error){
            res.json({Message:`Error occured while sending mail ${error}`});
        }
    }
}