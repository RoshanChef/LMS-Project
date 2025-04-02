const Category = require('../models/category ');

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        let tagDetails = await Category.create({ name, description });
        console.log(tagDetails);
        return res.status(200).json({ success: true, message: "Tag created successfully", data: tagDetails });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// get all the tags 
exports.getAllCategory = async (req, res) => {
    try {
        let tagDetails = await Category.find({}, { name: true, description: true });
        return res.status(200).json({ success: true, message: "All tags", data: tagDetails });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}