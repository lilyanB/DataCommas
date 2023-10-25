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
                        <div>Connect your wallet to display information</div>
                    )}
                </div>
                <div className="sdkConfig">
                    {connecting && (
                        <div>Waiting for Metamask to link the connection...</div>
                    )}
                </div>
                <div className="sdkConfig">
                    {connected && (
                        <>
                            <Card>
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
