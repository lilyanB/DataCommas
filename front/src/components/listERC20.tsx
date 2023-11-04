"use client";

import React, { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react-ui";
import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from "@tremor/react";
import { erc20tokens } from "@/outils/getData";

export default function ListERC20(props: { blockchain: string; owner: string }) {
    const { connected } = useSDK();
    const [erc20Data, setErc20Data] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (connected && props.blockchain && props.owner) {
                try {
                    const response = await erc20tokens(props.owner, props.blockchain);
                    setErc20Data(response.result);
                } catch (error) {
                    console.error("Error fetching ERC20 tokens:", error);
                }
            }
        };
        fetchData();
    }, [props.blockchain, props.owner, connected]);

    return (
        <TabPanel>
            <Title>All your ERC20</Title>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>name</TableHeaderCell>
                        <TableHeaderCell>amount</TableHeaderCell>
                        <TableHeaderCell>symbol</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {erc20Data.map((token: any, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Text>{token.name}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{`${token.amount}`}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{`${token.symbol}`}</Text>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabPanel>
    );
}
