"use client";

import { useSDK } from "@metamask/sdk-react-ui";
import { Card, Flex, TabPanel, Text, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { protocols } from "@/outils/getData";

export default function Protocols(props: { blockchain: string }) {
    const whale = process.env.NEXT_PUBLIC_EXAMPLE_ADDRESS
    const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();
    const [name, setName] = useState<string[]>([]);
    const [position, setPosition] = useState<string[]>([]);

    useEffect(() => {
        if (connected && props.blockchain) {
            const fetchNFTs = async () => {
                const response = await protocols(whale!, props.blockchain)
                const data = response.result
                let names = []
                let positions = []
                for (const element of data) {
                    names.push(element.protocol_name as string);
                    positions.push(element.position.asset_usd_value as string);
                }
                setName(names)
                setPosition(positions)
            };
            fetchNFTs()
        }
    }, [props.blockchain]);

    return (
        <TabPanel>
            <Card className="max-w-xl">
                <Title>Your différent position in protocols (AAVE (v2 & v3), Uniswap (v2), Lido, Compound (v2), Liquity, InstaDapp)</Title>
                <div className="mt-10">
                    {name.map((nameValue, index) => (
                        <Flex key={index} className="mt-4">
                            <Text className="w-full">{nameValue[index]}</Text>
                            <Text>{position[index]}</Text>
                        </Flex>
                    ))}
                </div>
            </Card>
        </TabPanel>
    );
}
