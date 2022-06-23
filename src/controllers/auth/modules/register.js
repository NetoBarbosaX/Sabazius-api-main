const createToken = require("@src/utils/create-token");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    verifyData(req.body);

    // hash password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let user = await prisma.user
      .create({
        data: {
          ...req.body,
        },
      })
      .catch((e) => {
        throw { status: 400, message: "Email, Telefone ou CPF já cadastrado!" };
      });

    const token = createToken({
      user: user.id,
    });

    delete user.password;

    res.json({
      user,
      token,
    });
  } catch (e) {
    let status = e.status || 500;
    let message = e.message || "Internal Server Error";

    delete e.status;
    delete e.message;

    res.status(status).json({ success: false, message: message, error: e });
  }
};

const verifyData = (body) => {
  if (!body.name) throw { status: 400, message: "Nome é obrigatório!" };
  if (!body.email) throw { status: 400, message: "Email é obrigatório!" };
  if (!body.password) throw { status: 400, message: "Senha é obrigatório!" };
  if (!body.phone) throw { status: 400, message: "Telefone é obrigatório!" };
  if (!body.document) throw { status: 400, message: "CPF é obrigatório!" };
  delete body.emailVerified;
  delete body.phoneVerified;
  delete body.active;
  delete body.createdAt;
  delete body.addressId;
};
