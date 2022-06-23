const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) throw { status: 400, message: "Token não informado!" };
    const decoded = await jwt.verify(token, process.env.SECRET)

    const user = await prisma.user.update({
      where: { id: decoded.user },
      data: {
        emailVerified: decoded.validate == "email" ? true : undefined,
        phoneVerified: decoded.validate == "phone" ? true : undefined,
      },
    });

    res.status(200).json({
      success: true,
      message: `${
        decoded.validate == "email" ? "Email" : "Telefone"
      } validado com sucesso`,
      type: decoded.validate,
    });
  } catch (e) {
    let status = e.status || 500;
    let message = "Token inválido!";

    delete e.status;
    delete e.message;

    res.status(status).json({ success: false, message: message, error: e });
  }
};
