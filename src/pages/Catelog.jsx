import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiconnector from '../services/apiconnector';
import { categories } from '../services/api';
import Footer from '../components/Common/Footer';
import { getCatalogData } from '../services/operations/pageCatalog';
import { useSelector } from 'react-redux';
import Course_card from '../components/core/Catalog/Course_card';
import CourseSlider from '../components/core/Catalog/Course_slider';

function Catalog() { // Corrected function name from Catelog -> Catalog
  const { CATEGORIES_API } = categories;
  const { token } = useSelector(state => state.auth);
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    async function getCategory() {
      const response = await apiconnector('GET', CATEGORIES_API);
      const category_id = response.data.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]?._id;
      
      setCategoryId(category_id);
    }
    getCategory();
  }, [catalogName]);

  useEffect(() => {
    async function getCategoryDetails() {
      try {
        const response = await getCatalogData(categoryId, token);
        console.log("response ", response);
        setCatalogPageData(response);
      } catch (error) {
        console.log(error);
      }
    }
    if (categoryId) { // Added safeguard to not call API with empty categoryId
      getCategoryDetails();
    }
  }, [categoryId]);

  // console.log(catalogPageData?.selectedCategory?.courses);
  

  return (
    <div>
      <div className='mx-auto flex min-h-[260px] flex-col justify-center gap-4'>
        <p className='text-sm text-gray-300'>
          {'Home/Catalog/'} <span className="text-yellow-400">{catalogPageData?.selectedCategory?.name}</span>
        </p>
        <p>{catalogPageData?.selectedCategory?.name}</p>
        <p>{catalogPageData?.selectedCategory?.description}</p>
      </div>

      <div>
        {/* Section 1 */}
        <div>
          <div>
            <h1>Courses to get you started</h1>
          </div>
          <div className='flex gap-x-3'>
            <p>Most Popular</p>
            <p>New</p>
          </div>
          <CourseSlider courses={catalogPageData?.selectedCategory?.courses} />
        </div>

        {/* Section 2 */}
        <div>
          <p>Top Course in {catalogPageData?.selectedCategory?.name}</p> {/* Corrected p tag */}
          <div>
            <CourseSlider courses={catalogPageData?.differentCourses} />
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <p>Frequently Bought</p>
          <div className='py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              {catalogPageData?.topSellingCourses?.courses?.map((course, idx) => (
                <Course_card course={course} key={idx} Height={"h-[400px]"} />
              ))}
              {/* Added return with () inside map */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Catalog;
