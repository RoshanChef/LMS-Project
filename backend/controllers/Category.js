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

// get all the Categories 
exports.getAllCategory = async (req, res) => {
    try {
        let tagDetails = await Category.find({}, { name: true, description: true });

        return res.status(200).json({ success: true, message: "All tags", data: tagDetails });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        // get categiryId
        const { categoryId } = req.body;

        // get courses for specified categoryid
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "rate_review",
            })
            .exec();

        // validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // get courses for different categories

        const otherCategoriesCourses = await Category.find({ _id: { $ne: categoryId } })
            .populate("courses")
            .exec();

        // get top selling courses
        const topSellingCourses = await Category.find({}).populate({
            path: "courses",
            match: { status: "Published" },
            populate: {
                path: "instructor",
            },
            options: {
                sort: { studentEnrolled: -1 },
                limit: 10,
            },
            transform: (doc) => {
                if (doc && doc.courses) {
                    doc.courses.sort((a, b) => b.studentEnrolled.length - a.studentEnrolled.length);
                }
                return doc;
            },
        }).exec();

        const result_topSellingCourses = topSellingCourses.flatMap(category => category.courses);

        // send response
        res.status(200).json({
            success: true,
            selectedCategory,
            diffCategories: otherCategoriesCourses,
            topSellingCourses: result_topSellingCourses
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}