import React from "react";
import Link from "next/link";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import { useMetamaskHook } from "@/hooks/metamaskHook";

interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
    { name: 'Home', href: '/', current: false },
    { name: 'Wallet', href: '/wallet', current: false },
    { name: 'Analytics', href: '/analytics', current: false },
    { name: 'Pulsi', href: '/pulsi', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Data = () => {
    const { provider, chainID, switchToLinea } = useMetamaskHook()

    return (
        <div className="rounded-md max-w-sm w-full">
            <div className="flex-1 space-y-4 py-1">
                <div className="sm:block">
                    <div className="space-y-1 px-5 pt-2 pb-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-white hover:text-black',
                                    'block  py-2 rounded-md text-base font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {chainID != "0xe704" ? <button onClick={switchToLinea} className="border-2 border-red-500 hover:border-white hover:text-white text-red py-2 px-4 rounded">Switch to Linea</button> : <MetaMaskButton theme="dark" color="white" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Data;
