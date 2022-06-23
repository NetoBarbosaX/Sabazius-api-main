// const validateCPF = require("@src/utils/validate-cpf");
// const validateCNPJ = require("@src/utils/validate-cnpj");

module.exports = async (req, res) => {
  try {
    let data = req.body;
    verifyData(data);

    // let organization = await prisma.organization.create({
    //   data: {
    //     name: data.name,
    //     email: data.email,
    //     description: data.description,
    //     document: data.document,
    //     logo: data.logo,
    //     cover: data.cover,
    //     course: data.course,
    //     universityId: data.university,
    //   },
    // });

    // await prisma.OrganizationMember.create({
    //   data: {
    //     userId: req.user.id,
    //     organizationId: organization.id,
    //     permission: 1,
    //   }
    // });
    
    res.json({
      success: true,
      message: "NFT criada com sucesso",
      data: organization,
    });
  } catch (e) {
    let status = e.status || 500;
    let message = e.message || "Internal Server Error";

    delete e.status;    
    delete e.message;

    console.log(message);
    res.status(status).json({ success: false, message: message, error: e });
  }
};

// const verifyData = (data) => {
//   if (!data.name) throw { status: 400, message: "Nome é obrigatório" };
//   if (!data.email) throw { status: 400, message: "E-mail é obrigatório" };
//   if (!data.document) throw { status: 400, message: "Documento é obrigatória" };
//   if (!validateCPF(data.document) && !validateCNPJ(data.document))
//     throw { status: 400, message: "Documento inválido" };
// };
