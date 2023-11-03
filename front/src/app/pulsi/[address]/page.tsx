"use client"

import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react-ui";

export default function Page({ params }: { params: { address: string } }) {
    const { connected, account } = useSDK();
    const [sign, setSign] = useState<string | null>(null);
    const [isSign, setIsSign] = useState(false);
    const [pingResponse, setPingResponse] = useState<any>(null);

    const pingApi = async (message: string, signature: string) => {
        try {
            const response = await fetch("/api/pulsi", {
                method: "POST",
                body: JSON.stringify({ message, signature, account }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setPingResponse(data);
            console.log(data);
        } catch (error) {
            console.error("Error pinging the API:", error);
        }
    };

    const auth = async () => {
        if (connected) {
            try {
                const msg = `0x${Buffer.from(account!.toString() + "pulsi", "utf8").toString("hex")}`;
                const message = account!.toString() + "pulsi";
                //@ts-ignore
                const signature = await ethereum.request({
                    method: "personal_sign",
                    params: [msg, account],
                });
                setIsSign(true)
                setSign(signature);

                // Call the pingApi function to send the data to your API
                pingApi(message, signature);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };

    return (
        <main className="flex flex-col py-6">
            <div className="flex flex-col h-full gap-6 justify-center items-center">
                {connected ? (
                    isSign ? (
                        <div>
                            My address: {params.address}
                            {pingResponse ? <div>API Response: {JSON.stringify(pingResponse)}</div> : null}
                        </div>
                    ) : (
                        <button onClick={auth}>Sign to display information</button>
                    )
                ) : (
                    <p className="bg-red-500 text-white py-2 px-4 rounded">Connect to MetaMask</p>
                )}
            </div>
        </main>
    );
}
