'use client'

import { useSDK } from "@metamask/sdk-react-ui";

export default function Home() {

  const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();

  return (
    <main className="flex flex-col py-6">
      <div className="flex flex-col h-full gap-6 justify-center items-center">
        <div className="sdkConfig">
          {connecting && (
            <div>Waiting for Metamask to link the connection...</div>
          )}
        </div>
        <div className="sdkConfig">
          {connected && (
            <><div>You are connected</div><div>With this account: {account}</div></>
          )}
        </div>
        <div className="sdkConfig">
          {connected == false && (
            <div>Connect your wallet to display information</div>
          )}
        </div>
      </div>
    </main>
  )
}
