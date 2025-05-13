const Category = require("@models/category");

module.exports = async (req, res) => {
  const { categoryId, name, color } = req.body;

  if (!name) {
    return res.status(400).send({
      message: "Name must not be empty!",
    });
  }
  if (name.length < 1 || name.length > 100) {
    return res.status(400).send({
      message: "Name must be between 1 and 100 characters long!",
    });
  }

  if (!color) {
    return res.status(400).send({
      message: "Color must not be empty!",
    });
  }
  
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).send({
        message: "Category not found!",
      });
    }

    category.name = name;
    category.color = color;

    await category.save();

    res.status(200).send({
      message: "Category edited successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
