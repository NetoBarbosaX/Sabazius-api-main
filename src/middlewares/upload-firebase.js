const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");

const storage = new Storage({
  keyFilename: "",
});

module.exports =
  (config = {}) =>
  async (req, res, next) => {
    try {
      config = Object.assign(
        {
          keys: ["file"],
          required: true,
        },
        config
      );

      // Verify if the file is present
      if (!req.files && config.require)
        throw new Error("No files were uploaded.");
      if (!req.files) return next();
      
      for(let key of config.keys) {
        if (!req.files[key] && config.require) throw new Error(`No file was uploaded with the key ${key}`);
        if (!req.files[key]) continue;
        let filename = uuidv4() + "-" + req.files[key].name;
        const storage = new firebase.storage();
        let file = await storage
          .bucket(process.env.FIREBASE_STORAGE_BUCKET)
          .file(filename);
        req.files[key].firebase = file;
  
        await file.save(req.files[key].data);
      };

      return next();
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
