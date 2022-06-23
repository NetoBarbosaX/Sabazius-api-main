const createToken = require("@src/utils/create-token");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    // Verifica se os dados são válidos
    verifyData(req.body);

    // Busca o usuário
    let user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    // Verifica se o usuário existe
    if (!user || !user.active)
      throw { status: 401, message: "Usuário ou senha invalido!" };

    // Verifica se a senha está correta
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) throw { status: 401, message: "Usuário ou senha invalido!" };
    
    // Cria o token
    const token = createToken({
      user: user.id,
    });

    // Apaga a senha da resposta
    delete user.password

    // Retorna
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
  if (!body.email) throw { status: 400, message: "Email é obrigatório!" };
  if (!body.password) throw { status: 400, message: "Senha é obrigatório!" };
}