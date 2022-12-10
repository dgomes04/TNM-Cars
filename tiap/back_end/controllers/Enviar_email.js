const nodemailer = require('nodemailer')
const { smtp } = require('../env')

const configuracoes = {
    service: smtp.service,
    auth: {
      user: smtp.user,
      pass: smtp.pass
    }
}

exports.disparar = async ({ para, assunto, texto, ehHtml = false}) => {

  const transportador = nodemailer.createTransport(configuracoes);

  const mailOptions = {
    from: smtp.user,
    to: para,
    subject: assunto
  };

  if (!ehHtml) {
    mailOptions.text = texto
  }else {
    mailOptions.html = texto
  }

  transportador.sendMail(mailOptions, function(erro, info){
    if (erro) {
      console.log(erro);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}
