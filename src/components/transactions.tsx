"use client";

import { useSDK } from "@metamask/sdk-react-ui";
import { Card, Flex, TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { transactions } from "@/outils/getData";

export default function Transactions() {
    const whale = process.env.NEXT_PUBLIC_EXAMPLE_ADDRESS
    const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();
    const [hash, setHash] = useState<string[]>([]);
    const [from, setFrom] = useState<string[]>([]);
    const [to, setTo] = useState<string[]>([]);
    const [method, setMethod] = useState<string[]>([]);
    const [value, setValue] = useState<string[]>([]);

    useEffect(() => {
        if (connected) {
            const fetchNFTs = async () => {
                const response = await transactions(whale!, "Base")
                const data = response.result
                let hashs = []
                let froms = []
                let tos = []
                let methods = []
                let values = []
                for (const element of data) {
                    hashs.push(element.hash as string);
                    froms.push(element.from_address as string);
                    tos.push(element.to_address as string);
                    methods.push(element.method as string);
                    values.push(element.value as string);
                }
                setHash(hashs)
                setFrom(froms)
                setTo(tos)
                setMethod(methods)
                setValue(values)
                console.log(data)
            };
            fetchNFTs()
        }
    }, []);

    return (
        <TabPanel>
            <Card className="max-w-xl">
                <Title>All your recent transactions</Title>
                <Table className="mt-5">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Hash</TableHeaderCell>
                            <TableHeaderCell>From</TableHeaderCell>
                            <TableHeaderCell>To</TableHeaderCell>
                            <TableHeaderCell>Method</TableHeaderCell>
                            <TableHeaderCell>Value</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hash.map((hashValue, index) => (
                            <TableRow key={index}>
                                <TableCell>{hash[index]}</TableCell>
                                <TableCell>
                                    <Text>{from[index]}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{to[index]}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{method[index]}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{value[index]}</Text>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </TabPanel>
    );
}
