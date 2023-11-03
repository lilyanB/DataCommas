"use client";

import { tokens_holders } from "@/outils/getData";
import { Card, DonutChart, Select, SelectItem, Title, Text } from "@tremor/react";
import { Key, useEffect, useState } from "react";

interface Holder {
    address: string;
    amount: string;
}

interface Token {
    name: string;
    symbol: string;
    supply: number;
    holders: Holder[]
}

export default function DonutsERC20(props: { tokens: Token[] }) {
    const [selectedValue, setSelectedValue] = useState<any>(null);
    const [selectedToken, setSelectedToken] = useState<any>();
    const [tokenHolders, setTokenHolders] = useState<any>();

    const valueFormatter = (number: number | bigint) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

    useEffect(() => {
        const fetchTokenHolders = async () => {
            const addressAndamount: { address: string; amount: string }[] = [];
            let totalAmount = 0;
            let decimal = 0;
            const tokenInfo = [];

            const response = await tokens_holders(selectedToken.address, "Base");
            const responseData = response.result
            for (var holderData of responseData) {
                addressAndamount.push({
                    address: holderData.holder_address,
                    amount: holderData.amount
                });
                totalAmount += parseFloat(holderData.amount)
                decimal = Number(holderData.decimals)
            }
            tokenInfo.push(selectedToken.name)
            tokenInfo.push(selectedToken.symbol)
            tokenInfo.push(totalAmount / Math.pow(10, decimal))
            tokenInfo.push(addressAndamount)
            tokenInfo.push(decimal)
            // Convert strings to numbers
            const processedData = tokenInfo.map((item) => {
                if (Array.isArray(item)) {
                    return item.map((obj) => ({
                        address: obj.address,
                        amount: (parseInt(obj.amount) / Math.pow(10, decimal))
                    }));
                } else if (typeof item === "string" && !isNaN(Number(item))) {
                    return Number(item);
                } else {
                    return item;
                }
            });

            setTokenHolders(processedData)
        };

        fetchTokenHolders();
    }, [selectedToken]);

    return (
        <Card className="justify-items-center max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl">
            <Select value={selectedToken} onValueChange={setSelectedToken}>
                {props.tokens.map((token: any, index: Key) => (
                    <SelectItem key={index} value={token}>
                        {token.symbol}
                    </SelectItem>
                ))}
            </Select>
            {selectedToken && (
                <>
                    <Title className="justify-items-center">Holders for {selectedToken.name}</Title>
                    {tokenHolders && (
                        <Card className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl">
                            <DonutChart
                                variant={"pie"}
                                className="mt-6"
                                data={tokenHolders[3]}
                                category="amount"
                                index="address"
                                valueFormatter={valueFormatter}
                                showTooltip={true}
                                showAnimation={true}
                                onValueChange={(v) => setSelectedValue(v)} />
                        </Card>

                    )}
                    {selectedValue && (
                        <>
                            <Card>
                                <Text>Holder : {selectedValue.address}</Text>
                                <Text>% of Total Supply : {selectedValue.amount / tokenHolders[2] * 100}%</Text>
                            </Card>
                        </>
                    )}
                </>
            )}
        </Card>
    );
}
