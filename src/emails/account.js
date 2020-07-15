const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

sgMail.send({
    to: 'nikhil8950356744@gmail.com',
    from: 'nikhil8950356744@gmail.com',
    subject: 'sending my first email',
    text: 'Thankyou !! it\'s been a great day.'
})
const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'nikhil8950356744@gmail.com',
        subject: 'Thanks for joining in ',
        text: `Welcome to the app, ${name}`  
    })
}
const sendCancellingEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'nikhil8950356744@gmail.com',
        subject: 'Good Bye :( ',
        text: `We heard you are leaving the app, ${name} . Is there anything we could do to keep you as our customer :)`  
    })
}
module.exports={
    sendWelcomeEmail, sendCancellingEmail
}