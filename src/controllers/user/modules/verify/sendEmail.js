const createToken = require("@src/utils/create-token");
const mailer = require("@src/utils/mailer");
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    if (!user) throw { status: 404, message: "Usuário não encontrado" };
    if (user.emailVerified) throw { status: 400, message: "Email já verificado" };

    const transporter = await mailer();
    const token = await createToken(
      { validate: "email", user: user.id },
      "24h"
    );

    let info = await transporter.sendMail({
      from: '"Sabazius Mailer" <foo@example.com>', // sender address
      to: user.email, // list of receivers
      subject: "Confirme seu email", // Subject line
      text: token, // plain text body
      html: `<a href="${process.env.APP_URL}/validate-data?token=${token}">Confirmar Email</a>`, // html body
    });
    let url = nodemailer.getTestMessageUrl(info);

    res
      .status(200)
      .json({ success: true, message: "Email enviado com sucesso", url });
  } catch (e) {
    let status = e.status || 500;
    let message = e.message || "Internal Server Error";

    delete e.status;
    delete e.message;

    res.status(status).json({ success: false, message: message, error: e });
  }
};
