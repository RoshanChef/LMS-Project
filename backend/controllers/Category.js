const Category = require('../models/category');

exports.createCategory = async (req, res) => {
    try {
        // get data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        let categoryDetails = await Category.create({ name, description });


        return res.status(200).json({ success: true, message: "Category created successfully", data: categoryDetails });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Category can't created", error: error.message });
    }
}

// get all the Categories 
exports.getAllCategory = async (req, res) => {
    try {
        let tagDetails = await Category.find({},
            { name: true, description: true });

        return res.status(200).json({ success: true, message: "All tags", data: tagDetails });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({ path: "courses", match: { status: "Published" }, populate: ([{ path: "instructor" }, { path: "rate_review" }]) })
            .exec();

        // console.log(selectedCategory);

        // Handle the case when the category is not found
        if (!selectedCategory) {
            return res
                .status(404)
                .json({ success: false, message: "Category not found" });
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            });
        }

        const selectedCourses = selectedCategory.courses;

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        }).populate({ path: "courses", match: { status: "Published" }, populate: ([{ path: "instructor" }, { path: "rate_review" }]) });

        let differentCourses = [];
        for (const category of categoriesExceptSelected) {
            differentCourses.push(...category.courses);
        }

        // Get top-selling courses across all categories
        const allCategories = await Category.find().populate({ path: "courses", match: { status: "Published" }, populate: ([{ path: "instructor" }, { path: "rate_review" }]) });
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        res.status(200).json({
            selectedCourses: selectedCourses,
            differentCourses: differentCourses,
            mostSellingCourses: mostSellingCourses,
            selectedCategory,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}