module.exports = async (req, res) => {
    try {
      const id = req.params.id;
      const universities = await prisma.university.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!universities)
        throw { status: 404, message: "Universidade não encontrada" };
  
      res.json(universities);
    } catch (e) {
      let status = e.status || 500;
      let message = e.message || "Internal Server Error";
  
      delete e.status;
      delete e.message;
      console.log(message);
      res.status(status).json({ success: false, message: message, error: e });
    }
  };
  