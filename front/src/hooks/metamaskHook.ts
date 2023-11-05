'use client'

import { switchToChain, addChainToWallet } from "@/outils/link-to-wallet";
import detectEthereumProvider from "@metamask/detect-provider";
import { useState, useEffect } from "react";

export function useMetamaskHook() {
    const [provider, setProvider] = useState<any>();
    const [chainID, setChainID] = useState<any>(null);

    // Handle chainChanged event in a useEffect
    useEffect(() => {
        async function handleChainChanged() {
            if (window.ethereum) {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                setChainID(chainId);
            } else {
                console.error("window.ethereum is not available.");
            }
        }

        if (window.ethereum) {
            window.ethereum.on('chainChanged', handleChainChanged);
        } else {
            console.error("window.ethereum is not available.");
        }
    }, []);

    // Initialize the provider and set the chain ID
    useEffect(() => {
        async function initializeMetamask() {
            const prov = await detectEthereumProvider();

            if (prov) {
                setProvider(prov);
                if (window.ethereum) {
                    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                    setChainID(chainId);
                }
            } else {
                console.log('Please install MetaMask!');
            }
        }

        initializeMetamask();
    }, []);

    async function switchToLinea() {
        if (provider) {
            try {
                switchToChain("0xe704", provider);
            } catch (switchError: any) {
                if (switchError.code === 4902) {
                    try {
                        addChainToWallet("0xe704", provider);
                    } catch (addError) {
                        console.error("Error adding chain to wallet", addError);
                    }
                } else {
                    console.error("Error switching to chain", switchError);
                }
            }
        } else {
            console.error("MetaMask provider not available.");
        }
    }

    return { provider, chainID, switchToLinea };
}
