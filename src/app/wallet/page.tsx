"use client";

import ListERC20 from "@/components/listERC20";
import Protocols from "@/components/protocols";
import Transactions from "@/components/transactions";
import { useSDK } from "@metamask/sdk-react-ui";
import {
    Badge,
    Card,
    Tab,
    TabGroup,
    TabList,
    TabPanels,
    Title,
} from "@tremor/react";

export default function Page() {

    const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();

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
                                <TabGroup>
                                    <TabList className="mt-8">
                                        <Tab>Transactions</Tab>
                                        <Tab>ERC20</Tab>
                                        <Tab>Protocols</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <Transactions />
                                        <ListERC20 />
                                        <Protocols />
                                    </TabPanels>
                                </TabGroup>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}
