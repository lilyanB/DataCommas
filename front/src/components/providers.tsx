"use client";

import React from 'react';
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';

export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        <React.StrictMode>
            <MetaMaskUIProvider sdkOptions={{
                dappMetadata: {
                    name: "Demo UI React App",
                }
            }}>
                {children}
            </MetaMaskUIProvider>
        </React.StrictMode >
    );
}
