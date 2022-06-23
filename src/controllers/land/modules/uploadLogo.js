module.exports = async (req, res) => {
    try {
      let organizationId = req.params.id;
  
      let fileURL = await req.files.file.firebase.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });
  
      let file = await prisma.organization.update({
        where: {
          id: organizationId,
        },
        data: {
          logo: fileURL[0],
        },
      });
  
      res.json({
        success: true,
        file,
      });
    } catch (e) {
      let status = e.status || 500;
      let message =   e.message || "Internal Server Error";
  
      delete e.status;
      delete e.message;
      console.log(message);
      res.status(status).json({ success: false, message: message, error: e });
    }
  };
  
  