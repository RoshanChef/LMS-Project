import React from 'react'

function RequirementFeild({ name, register, errors, setValue, getValues }) {
    const inputRef = React.useRef(null);
    const [values, setValues] = React.useState([]);

    function addTags() {
        const value = inputRef.current.value;
        if (value === '' || value === ' ')
            return;

        if (values.includes(value))
            return;

        setValues(prev => [...prev, value]);
        setValue(name, values);
        inputRef.current.value = "";
    }

    return (
        <div>
            <input
                {...register(name, {
                    required: "This field is required",
                })
                }
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addTags();
                    }
                }
                }
                ref={inputRef}
                className="bg-[#2C333F] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
            <div className='text-amber-300 text-lg mt-3 cursor-pointer font-semibold' onClick={addTags}>
                <p>Add</p>
            </div>
            <div>
                {values.map((ele, inx) => (
                    <div key={inx} className='flex items-center gap-2 mt-2'>
                        <p>{ele}</p>
                        <p className='text-gray-400 cursor-pointer' onClick={() => {
                            const newValues = [...values];
                            newValues.splice(inx, 1);
                            setValues(newValues);
                        }
                        }>clear</p>
                    </div>
                ))
                }
            </div>
        </div >
    )
}

export default RequirementFeild