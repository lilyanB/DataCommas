"use client";

import React, { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react-ui";
import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from "@tremor/react";
import { nfts } from "@/outils/getData";
import Link from "next/link";
import { networks } from "@/outils/networks";

export default function ListNFT(props: { blockchain: string; owner: string }) {
    const { connected } = useSDK();
    const [nftData, setNFTData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (connected && props.blockchain && props.owner) {
                try {
                    const response = await nfts(props.owner, props.blockchain);
                    console.log(response)
                    setNFTData(response.result);
                } catch (error) {
                    console.error("Error fetching ERC20 tokens:", error);
                }
            }
        };
        fetchData();
    }, [props.blockchain, props.owner, connected]);

    return (
        <TabPanel>
            <Title>All your NFT</Title>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>NFT address</TableHeaderCell>
                        <TableHeaderCell>amount</TableHeaderCell>
                        <TableHeaderCell>NFT type</TableHeaderCell>
                        <TableHeaderCell>NFT token id</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nftData.map((token: any, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Link href={`${(networks as any)[props.blockchain].explorer}token/${token.contract_address}`} target="_blank" className="hover:text-white">
                                    {token.contract_address}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Text>{token.amount}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{token.contract_type}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{token.token_id}</Text>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabPanel>
    );
}
