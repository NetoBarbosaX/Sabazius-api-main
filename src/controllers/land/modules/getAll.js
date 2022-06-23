module.exports = async (req, res) => {
    try {
      console.log("Teste getAll")
    } catch (e) {
      let status = e.status || 500;
      let message = e.message || "Internal Server Error";
  
      delete e.status;
      delete e.message;
  
      res.status(status).json({ success: false, message: message, error: e });
    }
  };
  