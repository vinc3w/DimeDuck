const Category = require("@models/category");

module.exports = async (req, res) => {
  const { categoryId } = req.params;
  
  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(400).send({
        message: "Category not found!",
      });
    }

    res.status(200).send({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
