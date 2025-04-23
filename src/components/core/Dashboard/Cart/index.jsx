import React from 'react';
import { useSelector } from 'react-redux';
import RenderTotalAmount from './RenderTotalAmount';
import RenderCartCourses from './RenderCartCourses';


function Cart() {
    const { total, totalItems } = useSelector(state => state.cart);

    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-gray-50">My Wishlist</h1>
            <p className="pb-2 font-semibold text-richblack-400 border-b">{totalItems} Courses in your cart</p>
            {
                total > 0 ? (
                    <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>
                ) : (
                    <p className='mt-14 text-center text-3xl text-gray-100'>No items in your cart.</p>
                )
            }
        </div>
    );
}

export default Cart;
