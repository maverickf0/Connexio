import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: process.env.SMTP_ENDPOINT,
    auth:{
        user:process.env.SMTP_USERNAME,
        pass:process.env.SMTP_PASSWORD
    }
})

export async function sendEmail (to:string, body:string){
    // send out the email to user
    await transport.sendMail({
        from: "manavtiwari1407@gmail.com",
        to: to,
        subject:"Hello from Zapier",
        text:body,
    })

    console.log("Mail sent")
       
}