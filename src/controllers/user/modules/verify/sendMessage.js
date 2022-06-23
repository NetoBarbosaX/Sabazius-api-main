const createToken = require("@src/utils/create-token");
const Whatsapp = require("@src/services/whatsapp");

module.exports = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    if (!user) throw { status: 404, message: "Usuário não encontrado" };
    if (user.phoneVerified)
      throw { status: 400, message: "Telefone já verificado" };

    const WA = new Whatsapp(user.phone);
    const token = await createToken(
      { validate: "phone", user: user.id },
      "24h"
    );

    await WA.link({
      message: `O código de validação do *Sabazius* é: http://localhost:8080/validate-data?token=${token}`,
      linkUrl: `${process.env.APP_URL}/validate-data?token=${token}`,
    });

    res
      .status(200)
      .json({ success: true, message: "Mensagem enviada com sucesso" });
  } catch (e) {
    let status = e.status || 500;
    let message = e.message || "Internal Server Error";

    delete e.status;
    delete e.message;

    res.status(status).json({ success: false, message: message, error: e });
  }
};
