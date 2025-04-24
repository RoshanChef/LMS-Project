import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";

function ChipInput({ name, placeholder, setValue, getValues, register, errors }) {
    const [tags, setTags] = useState(() => getValues(name) || []);

    useEffect(() => {
        register(name);
        setValue(name, tags);
    }, [register, name, setValue]);

    function clickHandle(event) {
        if (event.key === ',' || event.key === 'Enter') {
            event.preventDefault();

            const inputValue = event.target.value.trim();

            if (!inputValue || tags.includes(inputValue)) {
                event.target.value = '';
                return;
            }

            const updatedTags = [...tags, inputValue];
            setTags(updatedTags);
            setValue(name, updatedTags);

            event.target.value = '';
        }
    }

    function removeTag(event, tagToRemove) {
        event.preventDefault();
        event.stopPropagation();

        const updatedTags = tags.filter(tag => tag !== tagToRemove);
        setTags(updatedTags);
        setValue(name, updatedTags);
    }

    return (
        <div>
            <div className="flex flex-wrap gap-2 my-3">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 text-sm font-medium shadow-sm backdrop-blur-md transition-all duration-200"
                    >
                        <span>{tag}</span>
                        <button
                            type="button"
                            onClick={(e) => removeTag(e, tag)}
                            className="rounded-full p-1 hover:bg-yellow-500/20 cursor-pointer transition-colors"
                        >
                            <RxCross1 size={12} />
                        </button>
                    </div>
                ))}
            </div>

            <input
                onKeyDown={clickHandle}
                placeholder={placeholder}
                className="bg-[#2C333F] select-none w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
            )}
        </div>
    );
}

export default ChipInput;
