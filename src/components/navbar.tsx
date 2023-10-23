"use client";

import Image from "next/image";
import Link from "next/link";
import { MetaMaskButton } from "@metamask/sdk-react-ui";

export default function Navbar() {
    return (
        <nav className="text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        width={60}
                        height={40}
                        alt="Logo"
                        className="mr-4"
                    />
                </Link>

                <ul className="flex space-x-6">
                    <li>
                        <Link href="/wallet" className="border border-white rounded px-4 py-2 hover:border-blue-500 hover:underline">
                            Wallet
                        </Link>
                    </li>
                    <li>
                        <Link href="/analytics" className="border border-white rounded px-4 py-2 hover:border-blue-500 hover:underline">
                            Analytics
                        </Link>
                    </li>
                </ul>

                <MetaMaskButton theme="dark" color="white" />
            </div>
        </nav>
    );
}
