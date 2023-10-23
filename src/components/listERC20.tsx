"use client";

import { useSDK } from "@metamask/sdk-react-ui";
import { Flex, TabPanel, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { erc20tokens } from "@/outils/getData";

export default function ListERC20() {
    const whale = process.env.NEXT_PUBLIC_EXAMPLE_ADDRESS
    const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();
    const [assetsName, setassetsName] = useState<string[]>([]);
    const [assetsSymbol, setassetsSymbol] = useState<string[]>([]);
    const [amounts, setAmounts] = useState<string[]>([]);

    useEffect(() => {
        if (connected) {
            const fetchNFTs = async () => {
                const response = await erc20tokens(whale!, "Base")
                const data = response.result
                let names = []
                let symbols = []
                let amounts = []
                for (const element of data) {
                    names.push(element.name as string);
                    symbols.push(element.symbol as string);
                    amounts.push(element.amount as string);
                }
                setassetsName(names)
                setassetsSymbol(symbols)
                setAmounts(amounts)
                console.log(data)
            };
            fetchNFTs()
        }
    }, []);

    return (
        <TabPanel>
            <div className="mt-10">
                {assetsName.map((name, index) => (
                    <Flex key={index} className="mt-4">
                        <Text className="w-full">{name}</Text>
                        <Flex className="space-x-2" justifyContent="end">
                            <Text>{`$ ${amounts[index]}`}</Text>
                            <Text>{`${assetsSymbol[index]}`}</Text>
                        </Flex>
                    </Flex>
                ))}
            </div>
        </TabPanel>
    );
}
