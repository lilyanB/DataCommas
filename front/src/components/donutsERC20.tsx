"use client";

import React, { Key, useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Card, DonutChart, Select, SelectItem, Title, Text, Button, Callout, Flex } from "@tremor/react";
import Link from "next/link";
import { tokens_holders } from "@/outils/getData";
import { networks } from "@/outils/networks";

interface Holder {
    address: string;
    amount: string;
}

interface Token {
    name: string;
    symbol: string;
    supply: number;
    holders: Holder[];
}

export default function DonutsERC20(props: { tokens: Token[]; blockchain: string }) {
    const [selectedToken, setSelectedToken] = useState<any>();
    const [tokenHolders, setTokenHolders] = useState<any>();
    const [selectedValue, setSelectedValue] = useState<any>();

    useEffect(() => {
        const fetchTokenHolders = async () => {
            if (selectedToken) {
                const response = await tokens_holders(selectedToken.address, props.blockchain);
                const responseData = response.result;
                const addressAndAmount = responseData.map((holderData: { holder_address: any; amount: string; }) => ({
                    address: holderData.holder_address,
                    amount: parseFloat(holderData.amount),
                }));

                const totalAmount = addressAndAmount.reduce((acc: any, holder: { amount: any; }) => acc + holder.amount, 0);
                const decimal = Number(responseData[0].decimals);

                const processedData = {
                    name: selectedToken.name,
                    symbol: selectedToken.symbol,
                    totalAmount: totalAmount / Math.pow(10, decimal),
                    holders: addressAndAmount.map((holder: { address: any; amount: number; }) => ({
                        address: holder.address,
                        amount: holder.amount / Math.pow(10, decimal),
                    })),
                    decimal,
                };

                setTokenHolders(processedData);
            }
        };

        fetchTokenHolders();
    }, [selectedToken, props.blockchain]);

    const valueFormatter = (number: number | bigint) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

    return (
        <Card className="justify-items-center max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl mt-4">
            <Select value={selectedToken} onValueChange={setSelectedToken}>
                {props.tokens.map((token: any, index: Key) => (
                    <SelectItem key={index} value={token}>
                        {token.symbol}
                    </SelectItem>
                ))}
            </Select>
            {selectedToken && (
                <>
                    <Title className="justify-items-center mt-4">Holders for {selectedToken.name}</Title>
                    {tokenHolders && (
                        <Card className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl mt-4">
                            <DonutChart
                                variant="pie"
                                className="mt-6"
                                data={tokenHolders.holders}
                                category="amount"
                                index="address"
                                valueFormatter={valueFormatter}
                                showTooltip={true}
                                showAnimation={true}
                                onValueChange={setSelectedValue}
                            />
                        </Card>
                    )}
                    {selectedValue && (
                        <>
                            <Card className="mt-4 text-red">
                                <h1 className="mb-2 text-center text-white">Holder: {selectedValue.address}</h1>
                                <h1 className="mb-2 text-center text-white">% of Total Supply: {((selectedValue.amount / tokenHolders.totalAmount) * 100).toFixed(2)}%</h1>

                                {selectedValue.amount / tokenHolders.totalAmount * 100 > 50 && (
                                    <Callout title="Critical %" icon={ExclamationTriangleIcon} color="red" className="mb-4">
                                        This holder has more than 50% of the supply of this asset.
                                    </Callout>
                                )}

                                <div className="flex flex-col md:flex-row justify-center items-center">
                                    <Link href={`/wallet/${selectedValue.address}`} className="px-2 py-2 mt-2 hover:text-white">
                                        <Button className="bg-blue-500 hover:bg-blue-700 rounded-md" size="md">
                                            <p className="text-white">View wallet of this holder</p>
                                        </Button>
                                    </Link>

                                    <Link href={`${(networks as any)[props.blockchain].explorer}address/${selectedValue.address}`} target="_blank" className="px-2 py-2 mt-2 hover:text-white">
                                        <Button className="bg-blue-500 hover:bg-blue-700 rounded-md" size="md">
                                            <p className="text-white">Wallet on {(networks as any)[props.blockchain].explorer}</p>
                                        </Button>
                                    </Link>
                                </div>

                            </Card>
                        </>
                    )}
                </>
            )}
        </Card>
    )
}