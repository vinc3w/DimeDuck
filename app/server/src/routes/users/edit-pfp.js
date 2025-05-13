const User = require("@models/user");
const { uploadFile, deleteFile } = require("@utils");

module.exports = async (req, res) => {
  const newPhoto = req.files?.newPhoto;

  try {
    if (!newPhoto) {
      return res.status(400).send({
        message: "Photo must not be empty!"
      });
    }

    const existingPfpFileId = res.locals.user.pfp.fileId;

    const response = await uploadFile(newPhoto);
    res.locals.user.pfp.url = response.data.url;
    res.locals.user.pfp.fileId = response.data.fileId;
    await res.locals.user.save();

    if (existingPfpFileId) {
      await deleteFile(existingPfpFileId);
    }

    res.status(200).send({
      message: "Photo updated successfully.",
      pfp: res.locals.user.pfp,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
