import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import apiconnector from '../services/apiconnector';
import { categories } from '../services/api';
import { getCatalogData } from '../services/operations/pageCatalog';

import Footer from '../components/Common/Footer';
import Course_card from '../components/core/Catalog/Course_card';
import CourseSlider from '../components/core/Catalog/Course_slider';

function Catalog() {
  const { CATEGORIES_API } = categories;
  const { token } = useSelector((state) => state.auth);
  const { catalogName } = useParams();

  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Fetch Category ID
  useEffect(() => {
    async function getCategory() {
      const response = await apiconnector('GET', CATEGORIES_API);
      const category_id = response.data.data?.find(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )?._id;

      setCategoryId(category_id);
    }

    getCategory();
  }, [catalogName]);

  // Fetch Catalog Data
  useEffect(() => {
    async function getCategoryDetails() {
      try {
        const response = await getCatalogData(categoryId, token);
        setCatalogPageData(response);
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      }
    }

    if (categoryId) getCategoryDetails();
  }, [categoryId, token]);

  return (
    <div className="box-content mt-16">
      {/* Header Section */}
      <div className="mx-auto bg-gray-800 pl-10 flex min-h-[260px] flex-col justify-center gap-4">
        <p className="text-sm text-gray-300">
          Home / Catalog /{" "}
          <span className="text-yellow-400">
            {catalogPageData?.selectedCategory?.name}
          </span>
        </p>
        <p className="text-3xl text-gray-100">
          {catalogPageData?.selectedCategory?.name}
        </p>
        <p className="max-w-[870px] text-gray-200">
          {catalogPageData?.selectedCategory?.description}
        </p>
      </div>

      {/* Content Sections */}
      <div className="mx-auto w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent">
        {/* Section 1: Courses to get you started */}
        <section className="mb-12">
          <h1 className="text-xl font-semibold mb-3">Courses to get you started</h1>
          <div className="flex gap-x-4 mb-4 text-sm text-gray-500">
            <p className="cursor-pointer hover:text-yellow-400">Most Popular</p>
            <p className="cursor-pointer hover:text-yellow-400">New</p>
          </div>
          <CourseSlider courses={catalogPageData?.selectedCourses} />
        </section>

        {/* Section 2: Top Course in Category */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Top Course in {catalogPageData?.selectedCategory?.name}
          </h2>
          <CourseSlider courses={catalogPageData?.differentCourses} />
        </section>

        {/* Section 3: Frequently Bought */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Frequently Bought</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 place-items-center">
            {catalogPageData?.mostSellingCourses?.map((course, idx) => (
              <Course_card course={course} key={idx} Height="h-[200px]" Width="w-[50rem]"/>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Catalog;
