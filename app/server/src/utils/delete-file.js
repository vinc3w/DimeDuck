const axios = require("axios");

module.exports = async fileId => {
  const response = await axios.delete(`https://api.imagekit.io/v1/files/${fileId}`, {
    headers: {
      "Authorization": `Basic ${process.env.IMAGEKIT_API_KEY_BASE64}`,
    } 
  });
  return response;
}
