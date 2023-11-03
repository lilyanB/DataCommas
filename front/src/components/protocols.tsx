"use client";

import { useSDK } from "@metamask/sdk-react-ui";
import { Flex, TabPanel, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { protocols } from "@/outils/getData";

export default function Protocols(props: { blockchain: string }) {
    const whale = process.env.NEXT_PUBLIC_EXAMPLE_ADDRESS
    const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();
    const [names, setNames] = useState<string[]>([]);
    const [positions, setPositions] = useState<string[]>([]);

    useEffect(() => {
        if (connected && props.blockchain) {
            const fetchNFTs = async () => {
                try {
                    const response = await protocols(whale!, props.blockchain);
                    const data = response.result;
                    const names = data.map((element: { protocol_name: string; }) => element.protocol_name as string);
                    const positions = data.map(
                        (element: { position: { asset_usd_value: string; }; }) => element.position.asset_usd_value as string
                    );
                    setNames(names);
                    setPositions(positions);
                } catch (error) {
                    console.error("Error fetching protocols:", error);
                }
            };
            fetchNFTs();
        }
    }, [props.blockchain, connected]);

    return (
        <TabPanel>
            <Title>
                Your different positions in protocols (AAVE (v2 & v3), Uniswap (v2),
                Lido, Compound (v2), Liquity, InstaDapp)
            </Title>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>protocols</TableHeaderCell>
                    <TableHeaderCell>value</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {names.map((nameValue, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Text>{nameValue}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{positions[index]}</Text>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TabPanel>
    );
}
