const nodemailer = require("nodemailer");

exports.passwordEmail = async (nombre, correo, token) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.SMTP_USER, // generated ethereal user
              pass: process.env.SMTP_PASSWORD, // generated ethereal password
            },
          });

    // mensaje
    let message = `Hola, ${nombre}<br>`;
    message += "Has solicitado restaurar tu contraseña, "; 
    message += `<a href ="http://localhost:3000/recover-password/${token}">Haz click aquí</a><br><br>`;
    message += "El enlace es valido por una hora.";

    let info = await transporter.sendMail({
      from: `Marco Antonio <${process.env.SMTP_USER}>`, // sender address
      to: correo, // list of receivers
      subject: "Recuperación de contraseña", // Subject line
      html: message, // html body
    });

      console.log("Message sent: %s", info.messageId);

      return true;
    }   catch (error) {
        console.log(error);
        return false;
    }
}