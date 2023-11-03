"use client";

import { Card, List, ListItem, Text, Select, SelectItem, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { Key, useEffect, useState } from "react";
import { all_tokens_metada } from "@/outils/getData";
import DonutsERC20 from "./donutsERC20";
import { networks } from "@/outils/networks";
import Link from "next/link";

export default function AllTokens() {
    interface Token {
        name: string;
        symbol: string;
        address: string;
    }
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlockchain, setSelectedBlockchain] = useState<string>(networks.names[0]);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await all_tokens_metada(selectedBlockchain);
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
    }, [selectedBlockchain]);

    return (
        <div className="sdkConfig">
            <Card>
                <Title>Select Network</Title>
                <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
                    {networks.names.map((name: any, index: Key) => (
                        <SelectItem key={index} value={name}>
                            {name}
                        </SelectItem>
                    ))}
                </Select>
                <TabGroup>
                    <TabList className="mt-8">
                        <Tab>List ERC20</Tab>
                        <Tab>Donuts ERC20</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Table className="mt-5">
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell>name</TableHeaderCell>
                                        <TableHeaderCell>address</TableHeaderCell>
                                        <TableHeaderCell>symbol</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tokens.map((token: Token, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Text>{token.name}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`${(networks as any)[selectedBlockchain].explorer}token/${token.address}`} target="_blank" className="hover:text-white">{token.address}</Link>
                                            </TableCell>
                                            <TableCell>
                                                <Text>{token.symbol}</Text>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel>
                        {!loading &&
                            <TabPanel>
                                <DonutsERC20 tokens={tokens} blockchain={selectedBlockchain} />
                            </TabPanel>
                        }
                    </TabPanels>
                </TabGroup>
            </Card>
        </div >
    );
}
