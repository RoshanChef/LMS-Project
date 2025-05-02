import React from 'react';
import { useSelector } from 'react-redux';
import RenderTotalAmount from './RenderTotalAmount';
import RenderCartCourses from './RenderCartCourses';


function Cart() {
    const { total, totalItems } = useSelector(state => state.cart);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                My Wishlist
            </h1>

            <p className="pb-3 border-b text-gray-400 border-richblack-700 text-base font-medium text-richblack-300">
                {totalItems} {totalItems === 1 ? "Course" : "Courses"} in your cart
            </p>

            {total > 0 ? (
                <div className="mt-10 flex flex-col-reverse lg:flex-row gap-y-8 lg:gap-x-12 w-full">
                    <RenderCartCourses />
                    <RenderTotalAmount />
                </div>
            ) : (
                <p className="mt-16 text-center text-2xl text-gray-400 font-semibold">
                    No items in your cart.
                </p>
            )}

        </div>
    );
}

export default Cart;
