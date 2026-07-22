import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link } from "@inertiajs/react";

const MoreVerticalIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
        />
    </svg>
);

const EyeIcon = () => (
    <svg className="w-4 h-4 mr-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EditIcon = () => (
    <svg className="w-4 h-4 mr-2.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.586 2.586a2 2 0 112.828 2.828L12 14l-4 1 1-4 9.586-9.414z"
        />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-4 h-4 mr-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon = () => (
    <svg className="w-4 h-4 mr-2.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon = () => (
    <svg className="w-4 h-4 mr-2.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
    </svg>
);

export default function RowActionsMenu({
    viewRoute,
    editRoute,
    onDelete,
    canDelete = true,
    onApprove,
    onReject,
    isPending = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    const calculatePosition = useCallback(() => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const menuWidth = 176; // w-44
        setPosition({
            top: rect.bottom + window.scrollY + 4,
            left: rect.right + window.scrollX - menuWidth,
        });
    }, []);

    const toggleOpen = () => {
        if (!isOpen) calculatePosition();
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleScrollOrResize = () => {
            requestAnimationFrame(calculatePosition);
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScrollOrResize, true);
        window.addEventListener("resize", handleScrollOrResize);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScrollOrResize, true);
            window.removeEventListener("resize", handleScrollOrResize);
        };
    }, [isOpen, calculatePosition]);

    return (
        <div className="relative inline-block text-left">
            <button
                ref={buttonRef}
                type="button"
                onClick={toggleOpen}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Actions menu"
            >
                <MoreVerticalIcon />
            </button>

            {isOpen &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={{
                            position: "absolute",
                            top: position.top,
                            left: position.left,
                        }}
                        className="z-50 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                    >
                        {isPending && (
                            <div className="py-1">
                                {onApprove && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsOpen(false);
                                            onApprove();
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50 font-medium"
                                    >
                                        <CheckIcon />
                                        Approve
                                    </button>
                                )}
                                {onReject && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsOpen(false);
                                            onReject();
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium"
                                    >
                                        <XIcon />
                                        Reject
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="py-1">
                            {viewRoute && (
                                <Link
                                    href={viewRoute}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <EyeIcon />
                                    View Details
                                </Link>
                            )}

                            {editRoute && (
                                <Link
                                    href={editRoute}
                                    className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <EditIcon />
                                    Edit
                                </Link>
                            )}

                            {canDelete && onDelete && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        onDelete();
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <TrashIcon />
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
}