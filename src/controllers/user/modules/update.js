// Vamos copiar a base
module.exports = async (req, res) => {
    try {
        let user = req.user;
        let body = req.body;

        let userData = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        })

        /*Verificar se o email ou telefone foram alterados, se sim
        alterar o status de validado para false e [mandar um email para o usuario](futuro)*/
        let emailChange = userData.email != body.email;
        let phoneChange = userData.phone != body.phone;
        //Salvar no banco as novas informações 
        let results = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: body.name,
                phone: body.phone,
                email: body.email,
                emailVerified: emailChange ? false : undefined,
                phoneVerified: phoneChange ? false : undefined
            }

        })

        res.json({
            success: true,
        });
    } catch (e) {
        let status = e.status || 500;
        let message = e.message || "Internal Server Error";

        delete e.status;
        delete e.message;

        res.status(status).json({ success: false, message: message, error: e });
    }
};
