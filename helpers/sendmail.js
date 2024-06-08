import nodemailer from "nodemailer";
import fs from "fs";
process.loadEnvFile();
const {USER_EMAIL, USER_PASSWORD, USER_SERVICE} = process.env;

console.log(USER_EMAIL, USER_PASSWORD, USER_SERVICE);

let transporter = nodemailer.createTransport({
    service: USER_SERVICE,
    auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD
    }
});

export const send = async (monto, descripcion, roommate) => {
    const correos = JSON.parse(fs.readFileSync("./data/roommates.json", "utf-8")).roommates.map((r) => r.email);
    let mailOptions = {
        from: USER_EMAIL,
        to: [USER_EMAIL].concat(correos),
        subject: `Gasto de ${roommate} por ${descripcion}`,
        text: `El gasto de ${roommate} por ${descripcion} fue de ${monto}`
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
    }

};