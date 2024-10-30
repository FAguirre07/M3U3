var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

router.get("/", function (req, res, next) {
  res.render("layout");
});

/* GET home page. */
router.post('/contacto', async function (req, res, next)  {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var ciudad = req.body.ciudad
  
  console.log(req.body)
  
  var obj = {
    to: 'fabriciolaguirre@gmail.com',
    subject: 'Contacto desde la web',
    html:` ${nombre} ${apellido} Se contacto a traves de la página y quiere mas informacion del producto`
  }
  
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });
  
  var info = await transport.sendMail(obj);
  
  res.render('index', {
    message: 'Mensaje enviado satisfactoriamente',
  });
});


module.exports = router;
