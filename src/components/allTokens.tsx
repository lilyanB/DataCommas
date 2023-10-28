"use client";

import { Card, List, ListItem, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { useEffect, useState } from "react";
import { all_tokens_metada } from "@/outils/getData";
import DonutsERC20 from "./donutsERC20";

export default function AllTokens() {
    interface Token {
        name: string;
        symbol: string;
        address: string;
    }
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchTokens();
    }, []);

    return (
        <div className="sdkConfig">
            <Card>
                {/* <Title>You are connected</Title>
                <Badge size="xl">{account}</Badge> */}
                <TabGroup>
                    <TabList className="mt-8">
                        <Tab>List ERC20</Tab>
                        <Tab>Donuts ERC20</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <List>
                                {tokens.map((token: Token, index) => (
                                    <ListItem key={index}>
                                        <span>{token.name}</span>
                                        <span>{token.symbol}</span>
                                        <span>{token.address}</span>
                                    </ListItem>
                                ))}
                            </List>
                        </TabPanel>
                        {!loading &&
                            <TabPanel>
                                <DonutsERC20 tokens={tokens} />
                            </TabPanel>
                        }
                    </TabPanels>
                </TabGroup>
            </Card>
        </div>
    );
}
