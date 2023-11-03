"use client";

import { useSDK } from "@metamask/sdk-react-ui";
import { Card, Flex, TabPanel, Text, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { erc20tokens } from "@/outils/getData";

export default function ListERC20(props: { blockchain: string }) {
    const whale = process.env.NEXT_PUBLIC_EXAMPLE_ADDRESS
    const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();
    const [assetsName, setassetsName] = useState<string[]>([]);
    const [assetsSymbol, setassetsSymbol] = useState<string[]>([]);
    const [amounts, setAmounts] = useState<string[]>([]);

    useEffect(() => {
        if (connected && props.blockchain) {
            const fetchNFTs = async () => {
                const response = await erc20tokens(whale!, props.blockchain)
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
    }, [props.blockchain]);

    return (
        <TabPanel>
            <Card className="max-w-xl">
                <Title>All your ERC20</Title>
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
            </Card>
        </TabPanel>
    );
}
