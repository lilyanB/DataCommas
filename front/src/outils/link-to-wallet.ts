import { MetaMaskInpageProvider } from "@metamask/providers"
import chains from "./chains.json"
import { ethers } from "ethers"

const hexStringPattern = "(0x|0X)[a-fA-F0-9]+"
/**
 * Converts a number to HexString (a string which has a 0x prefix followed by any number of nibbles (i.e. case-insensitive hexadecimal characters, 0-9 and a-f).)
 */
const toHex = ethers.utils.hexValue

interface AddEthereumChainParameter {
    chainId: string
    blockExplorerUrls?: string[]
    chainName?: string
    iconUrls?: string[]
    nativeCurrency?: {
        name: string
        symbol: string
        decimals: number
    }
    rpcUrls?: string[]
}

/**
 * Check that the format of a chainId is hexString
 * (a string which has a 0x prefix followed by any number of nibbles (i.e. case-insensitive hexadecimal characters, 0-9 and a-f).))
 * @param chainId
 * @returns boolean: true if chainId is hexString. False otherwise
 */
const isChainIdFormatValid = (chainId: string): boolean => {
    const pattern = new RegExp(`^${hexStringPattern}$`)
    return pattern.test(chainId)
}

/**
 * Validate that the in page ethereum provider is loaded
 * @param ethereum : InPageProvider
 */
const validateEthereumApi = (ethereum: MetaMaskInpageProvider) => {
    if (!ethereum || !ethereum.isMetaMask) {
        throw new Error(`Something went wrong. Add to wallet is called while an ethereum object not detected.`)
    }
}

/**
* Call this function to make the wallet switch to the desired chain
* @param chainId designed chain in HexString
* @param ethereum ethereum inpage provider (e.g.: provider loaded by Metamask)
*/
export const switchToChain = async (chainId: string, ethereum: MetaMaskInpageProvider) => {
    if (!isChainIdFormatValid(chainId)) {
        throw new Error(`chainId '${chainId}' must be hexString`)
    }
    validateEthereumApi(ethereum)
    await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
    })
    console.log(`Succesfully switched to chain ${chainId} in metamask`)
}

/**
 * Call this function to add a new chain to the wallet. Should only be called if the chain doesn't exist already in the wallet
 * @param chainId designed chain in HexString
 * @param ethereum ethereum in page provider (e.g.: provider loaded by Metamask)
 */
export const addChainToWallet = async (chainId: string, ethereum: MetaMaskInpageProvider) => {
    if (!isChainIdFormatValid(chainId)) {
        throw new Error(`chainId '${chainId}' must be hexString`)
    }
    validateEthereumApi(ethereum)

    const chain = chains.find((c: any) => toHex(c.chainId) === chainId)
    if (!chain || !chain.chainId) {
        throw new Error(`Chain with chainId '${chainId}' not found in reference data`)
    }

    const params: AddEthereumChainParameter = {
        chainId,
        chainName: chain.name,
        nativeCurrency: chain?.nativeCurrency,
        blockExplorerUrls:
            chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url
                ? chain.explorers.map((explorer: any) => explorer.url)
                : [chain.infoURL],
        rpcUrls: chain.rpc,
    }

    const [signerAddress] = (await ethereum.request({
        method: "eth_requestAccounts",
    })) as string[]
    await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [params, signerAddress],
    })
    console.log(`Chains ${chainId} of params ${JSON.stringify(params)} succesfully added to wallet`)
}