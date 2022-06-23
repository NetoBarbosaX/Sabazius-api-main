// Vamos copiar a base
module.exports = async (req, res) => {
    try {
        let user = req.user;

        let userData = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        })

        let userDelete = await prisma.user.delete({
            where: {
                id: user.id
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
