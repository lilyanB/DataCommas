"use client";

import React from "react";
import { Card, Divider, Flex, Subtitle, Title } from "@tremor/react";

export default function Home() {
  return (
    <main className="flex flex-col py-6 items-center justify-center h-full">
      <Flex>
        <Card className="max-w-lg mx-auto p-6">
          <div className="mb-6">
            <Title>Wallet Visualization</Title>
            <Divider />
            <Subtitle>Erc20, NFT, and Transactions</Subtitle>
          </div>
          <div className="mb-6">
            <Title>DataCommas offers a holistic view of your blockchain wallet, encompassing ERC20 tokens, NFTs, and transaction histories.</Title>
          </div>
          <div className="mb-6">
            <Subtitle>User-Centric</Subtitle>
            <Title>We prioritize user-friendliness, ensuring individuals of all backgrounds can easily access and comprehend their wallet data.</Title>
          </div>
        </Card>

        <Card className="max-w-lg mx-auto p-6 mt-6">
          <div className="mb-6">
            <Title>Blockchain Data for Informed Decision-Making</Title>
            <Divider />
            <Subtitle>Empowering Insights</Subtitle>
          </div>
          <div className="mb-6">
            <Title>DataCommas equips users with data-driven insights, aiding them in making informed decisions within the blockchain space.</Title>
          </div>
          <div className="mb-6">
            <Subtitle>High-Volume Analytics</Subtitle>
            <Title>Our platform can efficiently handle large datasets, making it a valuable tool for users with significant blockchain activities.</Title>
          </div>
        </Card>
      </Flex>
    </main>
  );
}
