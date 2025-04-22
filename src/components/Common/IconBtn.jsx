export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
}) {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            className={`flex items-center justify-center gap-2 rounded-md py-2 px-3 lg:px-5 font-semibold text-gray-900 
          ${outline ? "border border-yellow-500 bg-transparent" : "bg-yellow-500"} 
          ${customClasses} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            type={type}
        >
            {children ? (
                <div className="flex items-center gap-2">
                    <span className={`${outline ? "text-yellow-500" : "text-gray-900"}`}>{text}</span>
                    {children}
                </div>
            ) : (
                <span className={`${outline ? "text-yellow-500" : "text-gray-900"}`}>{text}</span>
            )}
        </button>

    )
}