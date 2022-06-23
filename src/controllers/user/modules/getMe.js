const createToken = require("@src/utils/create-token");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
    try {
        let user = req.user;

        let userData = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        })

        delete userData.password;

        res.json({
            user: userData,
        });
    } catch (e) {
        let status = e.status || 500;
        let message = e.message || "Internal Server Error";

        delete e.status;
        delete e.message;

        res.status(status).json({ success: false, message: message, error: e });
    }
};