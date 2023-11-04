"use client";

import React, { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react-ui";
import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from "@tremor/react";
import Link from "next/link";
import { networks } from "@/outils/networks";
import { transactions } from "@/outils/getData";

export default function Transactions(props: { blockchain: string; owner: string }) {
    const { connected } = useSDK();
    const [transactionsData, setTransactionsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (connected && props.blockchain && props.owner) {
                try {
                    const response = await transactions(props.owner, props.blockchain);
                    setTransactionsData(response.result);
                } catch (error) {
                    console.error("Error fetching transactions:", error);
                }
            }
        };
        fetchData();
    }, [props.blockchain, props.owner, connected]);

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
                    {transactionsData.map((transaction: any, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Link href={`${(networks as any)[props.blockchain].explorer}tx/${transaction.hash}`} target="_blank" className="hover:text-white">
                                    {transaction.hash}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`${(networks as any)[props.blockchain].explorer}address/${transaction.from_address}`} target="_blank" className="hover:text-white">
                                    {transaction.from_address}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`${(networks as any)[props.blockchain].explorer}address/${transaction.to_address}`} target="_blank" className="hover:text-white">
                                    {transaction.to_address}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Text>{transaction.method}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{transaction.value}</Text>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabPanel>
    );
}
