const { ethers } = require("ethers");

module.exports = async (req, res) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider();

    const signer = provider.getSigner();

    const signature = await signer.signMessage("Hello World");



    console.log(signer);

    console.log(provider);

    console.log(signature);

    console.log("teste");

    res.json({
      success: true,
      message: "NFT criada com sucesso",
      data: {},
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
