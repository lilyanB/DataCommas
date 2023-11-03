"use client";

import ListERC20 from "@/components/listERC20";
import Protocols from "@/components/protocols";
import Transactions from "@/components/transactions";
import { networks } from "@/outils/networks";
import { useSDK } from "@metamask/sdk-react-ui";
import {
    Badge,
    Card,
    Select,
    SelectItem,
    Tab,
    TabGroup,
    TabList,
    TabPanels,
    Title,
} from "@tremor/react";
import { Key, useState } from "react";

export default function Page() {

    const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();

    const [selectedBlockchain, setSelectedBlockchain] = useState<string>(networks.names[0]);

    return (
        <main className="flex flex-col py-6">
            <div className="flex flex-col h-full gap-6 justify-center items-center">
                <div className="sdkConfig">
                    {connected == false && (
                        <Card>
                            <Title>Connect your wallet to display information</Title></Card>
                    )}
                </div>
                <div className="sdkConfig">
                    {connecting && (
                        <Card>
                            <Title>Waiting for Metamask to link the connection...</Title></Card>
                    )}
                </div>
                <div className="sdkConfig">
                    {connected && (
                        <>
                            <Card className="">
                                <Title>You are connected</Title>
                                <Badge size="xl">{account}</Badge>
                                <Title>Select Network</Title>
                                <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
                                    {networks.names.map((name: any, index: Key) => (
                                        <SelectItem key={index} value={name}>
                                            {name}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {selectedBlockchain &&
                                    <TabGroup>
                                        <TabList className="mt-8">
                                            <Tab>Transactions</Tab>
                                            <Tab>ERC20</Tab>
                                            <Tab>Protocols</Tab>
                                        </TabList>
                                        <TabPanels>
                                            <Transactions blockchain={selectedBlockchain} />
                                            <ListERC20 blockchain={selectedBlockchain} />
                                            <Protocols blockchain={selectedBlockchain} />
                                        </TabPanels>
                                    </TabGroup>
                                }
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}
