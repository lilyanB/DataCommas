"use client";

import { Card, List, ListItem, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { all_tokens_metada } from "@/outils/getData";

export default function AllTokens() {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await all_tokens_metada("Base");
                const data = response.result;

                const tokensData = data.map((element: { name: string; symbol: string; address: string; }) => ({
                    name: element.name,
                    symbol: element.symbol,
                    address: element.address,
                }));

                setTokens(tokensData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTokens();
    }, []);

    return (
        <div className="sdkConfig">
            <Card className="">
                <Title>List ERC20</Title>
                <List>
                    {tokens.map((token, index) => (
                        <ListItem key={index}>
                            <span>{token.name}</span>
                            <span>{token.symbol}</span>
                            <span>{" "}</span>
                            <span>{token.address}</span>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </div>
    );
}
