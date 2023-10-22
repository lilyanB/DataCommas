"use client";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-full px-6 border-t border-t-gray-700 py-2 text-center">
            Explore Optimisic blockchain with{" "}
            <Link
                href="https://github.com/lilyanB/DataCommas"
                target="_blank"
                className="text-blue-500 hover:text-blue-600"
            >
                us
            </Link>
            !
        </div>
    );
}
