import CTAButton from './Button';
import { FaArrowRight } from "react-icons/fa6";

function CodeBlocks({ heading, subheading, btn1, btn2, position, codeColor, backgroundGradient, codeblock }) {

    return (
        <div className={`flex ${position} my-20 justify-between lg:gap-10 gap-10`}>
            {/* section 1 */}
            <div className='flex flex-col gap-9 w-[50%]'>
                <h1 className="text-4xl md:text-4xl font-bold leading-tight">{heading}</h1>
                <div className='font-bold text-[#b8bfd6]'>{subheading}</div>

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
            <div>
                {/* background gradient */}
                <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
                    {backgroundGradient}
                </div>
                {/* Indexing */}
                <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
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
                </div>

                {/* Codes */}
                <div
                    className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
                ></div>

            </div>
        </div >
    )
}

export default CodeBlocks
