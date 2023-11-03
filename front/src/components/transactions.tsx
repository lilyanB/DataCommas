"use client";

import { useSDK } from "@metamask/sdk-react-ui";
import { Card, TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { transactions } from "@/outils/getData";
import Link from "next/link";
import { networks } from "@/outils/networks";

export default function Transactions(props: { blockchain: string }) {
    const whale = process.env.NEXT_PUBLIC_EXAMPLE_ADDRESS
    const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();
    const [hash, setHash] = useState<string[]>([]);
    const [from, setFrom] = useState<string[]>([]);
    const [to, setTo] = useState<string[]>([]);
    const [method, setMethod] = useState<string[]>([]);
    const [value, setValue] = useState<string[]>([]);

    useEffect(() => {
        if (connected && props.blockchain) {
            const fetchNFTs = async () => {
                const response = await transactions(whale!, props.blockchain)
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
            };
            fetchNFTs()
        }
    }, [props.blockchain]);

    return (
        <TabPanel>
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
                            <TableCell>
                                <Link href={`${(networks as any)[props.blockchain].explorer}tx/${hash[index]}`} target="_blank" className="hover:text-white">{hash[index]}</Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`${(networks as any)[props.blockchain].explorer}address/${from[index]}`} target="_blank" className="hover:text-white">{from[index]}</Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`${(networks as any)[props.blockchain].explorer}address/${to[index]}`} target="_blank" className="hover:text-white">{to[index]}</Link>
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
        </TabPanel >
    );
}
