const axios = require("axios");

module.exports = async file => {
  const data = {
    file: file.data.toString("base64"),
    fileName: file.name,
  };
  const response = await axios.post("https://upload.imagekit.io/api/v1/files/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Basic ${process.env.IMAGEKIT_API_KEY_BASE64}`,
    } 
  });
  return response;
}
