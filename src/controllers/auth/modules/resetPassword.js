const createToken = require("@src/utils/create-token");
const mailer = require("@src/utils/mailer");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

const validateToken = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) throw { status: 400, message: "Token não informado!" };
    const decoded = await jwt.verify(token, process.env.SECRET);
    if (!decoded.resetPassword)
      throw { status: 400, message: "Token inválido!" };
    res.status(200).json({ success: true, message: "Token válido!" });
  } catch (e) {
    let status = e.status || 500;
    let message = e.message || "Internal Server Error";
    res.status(status).json({ success: false, message: message, error: e });
  }
};
const sendToken = async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) throw { status: 400, message: "Email não informado!" };
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) throw { status: 200, message: "Email enviado com sucesso" };

    const transporter = await mailer();
    const token = await createToken(
      { resetPassword: true, user: user.id },
      "1h"
    );

    let html = await new Promise((resolve, reject) =>
      fs.readFile(
        "src/assets/mail/resetPassword.html",
        "utf8",
        function (err, data) {
          if (err) reject(err);
          resolve(data);
        }
      )
    );

    html = html.replace(
      "{{url}}",
      `${process.env.APP_URL}/reset-password?token=${token}`
    );
    html = html.replace("{{expirationTime}}", "1h");

    let info = await transporter.sendMail({
      from: '"Sabazius Mailer" <foo@example.com>', // sender address
      to: userEmail, // list of receivers
      subject: "Reset Password", // Subject line
      text: token, // plain text body
      html: html, // html body
    });
    let url = nodemailer.getTestMessageUrl(info);

    res
      .status(200)
      .json({ success: true, message: "Email enviado com sucesso", url });
  } catch (e) {
    let status = e.status || 500;
    let message = e.message || "Internal Server Error";

    let random = Math.random() * 2 + 3;
    console.log(random);
    await new Promise((resolve) => setTimeout(resolve, random * 1000));

    res.status(status).json({ success: true, message: message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token) throw { status: 400, message: "Token não informado!" };
    if (!password) throw { status: 400, message: "Senha não informada!" };

    const decoded = await jwt.verify(token, process.env.SECRET);
    if (!decoded.resetPassword)
      throw { status: 400, message: "Token inválido!" };

    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.update({
      where: {
        id: decoded.user,
      },
      data: {
        password: hashPassword,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Senha alterada com sucesso!" });
  } catch (e) {
    let status = e.status || 500;
    let message = e.message || "Internal Server Error";
    res.status(status).json({ success: false, message: message, error: e });
  }
};

module.exports = { sendToken, changePassword, validateToken };
