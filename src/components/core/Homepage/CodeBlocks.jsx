import CTAButton from './Button';
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({ heading, subheading, btn1, btn2, position, codeColor, backgroundGradient, codeblock }) {
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>
            {/* section 1 */}
            <div className='flex flex-col gap-9  w-full lg:w-[50%]'>
                <h1 className="text-4xl md:text-4xl font-bold leading-tight">{heading}</h1>
                <div className='font-bold text-[#b8bfd6] w-[85%] -mt-3 text-base'>{subheading}</div>

                <div className='flex gap-7 mt-7 '>
                    <CTAButton active={btn1.active} linkto={btn1.link}>
                        <div className='flex gap-2 items-center'>
                            {btn1.title}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={btn2.active} linkto={btn2.link}>
                        <div className='flex gap-2 items-center'>
                            {btn2.title}
                        </div>
                    </CTAButton>
                </div >
            </div>
            {/* section 2 */}
            <div className='h-fit flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>
                <div className=' z-0 w-72 h-72 opacity-[.4] blur-[1.8rem] rounded-full bg-gradient-to-br from-orange-900 to-red-500'></div>

                <div className="w-full flex absolute backdrop-brightness-25 border-2  border-gray-700/80  bg-white/2 backdrop-blur-lg shadow-lg select-none">

                    {/* Indexing */}
                    <div className=" text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold ">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                        <p>12</p>
                    </div>

                    {/* Codes */}
                    <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono`}>

                        <TypeAnimation
                            sequence={[codeblock, 5000, ""]}
                            repeat={Infinity}
                            cursor={true}
                            style={{
                                whiteSpace: "pre",
                                display: "block",
                                fontFamily: "monospace",
                                // fontSize: "14px",
                                textAlign: "left",
                                color: `${codeColor}`,
                                // padding: "16px",
                                overflowX: "auto"
                            }}
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>

            </div>



        </div >
    )
}

export default CodeBlocks
