"use client";
import { useState } from 'react';

interface DropDownProps {
    InitialDropDownValue: string;
    Theme?: "primary" | "secondary" | "success" | "info" | "danger";
    DropDownOptions: string[];
    onChange: (value: string) => void;
}

const DropDownMenu = ({ InitialDropDownValue, Theme, DropDownOptions, onChange }: DropDownProps) => {
    const [dropdownVal, setDropDownVal] = useState<string>(InitialDropDownValue);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleDropdownItem = (value: string) => {
        setDropDownVal(value);
        onChange(value);
        setIsOpen(false); // Close dropdown after selection
    };

    // Tailwind Theme Classes Mapping
    const themeClasses = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        success: "bg-green-500 hover:bg-green-600 text-white",
        info: "bg-cyan-500 hover:bg-cyan-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
    };

    return (
        <div className="relative w-full max-w-sm mx-auto">
            {/* Dropdown Toggle Button */}
            <button
                className={`w-full py-2 px-4 rounded-md shadow-sm ${themeClasses[Theme || "primary"]}`}
                type="button"
                id="dropdown-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {dropdownVal}
            </button>

            {/* Dropdown Menu */}
            <div
                className={`absolute left-0 mt-2 w-full rounded-md bg-white shadow-lg max-h-52 overflow-auto  z-10 transform transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none "
                    }`}
                aria-labelledby="dropdown-button"
            >
                <ul className="p-0 m-0 divide-y divide-gray-200">
                    {DropDownOptions.map((Option, i) => (
                        <li key={i}>
                            <button
                                onClick={() => handleDropdownItem(Option)}
                                className="w-full py-2 px-4 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
                                type="button"
                            >
                                {Option}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DropDownMenu;
