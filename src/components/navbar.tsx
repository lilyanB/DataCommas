"use client";

import Link from "next/link";
import { MetaMaskButton } from "@metamask/sdk-react-ui";

export default function Navbar() {

    return (
        <div className="w-full px-6 border-b border-b-gray-700 py-2 flex justify-between items-center">
            <div className="gap-4 flex">
                <Link href="/" className="hover:underline">
                    Home
                </Link>
            </div>
            <MetaMaskButton theme={"dark"} color="white"></MetaMaskButton>

        </div>
    );
}
