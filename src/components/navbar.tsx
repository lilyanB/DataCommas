"use client";

import Image from "next/image";
import Link from "next/link";
import { MetaMaskButton } from "@metamask/sdk-react-ui";

export default function Navbar() {

    return (
        <div className="w-full px-6 border-b border-b-gray-700 py-2 flex justify-between items-center">
            <div className="gap-4 flex">
                <Link href={"/"}>
                    <Image
                        src={"/logo.png"}
                        width={60}
                        height={40}
                        className="mr-12"
                        alt={""}
                        style={{ width: "60px", height: "40px" }}
                    />
                </Link>
                <Link href="/wallet" className="hover:underline">
                    wallet
                </Link>
                <Link href="/Analytics" className="hover:underline">
                    Analytics
                </Link>
            </div>
            <MetaMaskButton theme={"dark"} color="white"></MetaMaskButton>

        </div>
    );
}
