"use client";

import { useSDK } from "@metamask/sdk-react-ui";
import { Flex, TabPanel, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { protocols } from "@/outils/getData";

export default function Protocols() {
    const whale = process.env.NEXT_PUBLIC_EXAMPLE_ADDRESS
    const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();
    const [name, setName] = useState<string[]>([]);
    const [position, setPosition] = useState<string[]>([]);

    useEffect(() => {
        if (connected) {
            const fetchNFTs = async () => {
                const response = await protocols(whale!, "Base")
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
    }, []);

    return (
        <TabPanel>
            <div className="mt-10">
                {name.map((nameValue, index) => (
                    <Flex key={index} className="mt-4">
                        <Text className="w-full">{nameValue[index]}</Text>
                        <Text>{position[index]}</Text>
                    </Flex>
                ))}
            </div>
        </TabPanel>
    );
}
