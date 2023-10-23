import axios from 'axios';
const API = process.env.NEXT_PUBLIC_DECOMMAS_API
const baseURL = "https://datalayer.decommas.net/datalayer/api/v1/"

export async function erc20tokens(address: string,networks: string) {
  const res = await axios.get(`${baseURL}tokens/${address}?networks=${networks}&api-key=${API}`)
  return res.data
}

export async function nfts(address: string,networks: string) {
    const res = await axios.get(`${baseURL}nfts/${address}?networks=${networks}&api-key=${API}`)
    return res.data
}

export async function protocols(address: string,networks: string) {
    const res = await axios.get(`${baseURL}protocols/${address}?networks=${networks}&api-key=${API}`)
    return res.data
}

export async function transactions(address: string,networks: string) {
    const res = await axios.get(`${baseURL}transactions/${address}?networks=${networks}&api-key=${API}`)
    return res.data
}

export async function all_tokens_metada(networks: string) {
    const res = await axios.get(`${baseURL}all_tokens_metadata/?networks=${networks}&api-key=${API}`)
    return res.data
}

export async function tokens_holders(address: string,networks: string) {
    const res = await axios.get(`${baseURL}token_holders/${networks}/${address}?api-key=${API}`)
    return res.data
}