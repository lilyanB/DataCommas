"use client"

import AllTokens from "@/components/allTokens";

export default function Page() {

    return (
        <main className="flex flex-col py-6">
            <div className="flex flex-col h-full gap-6 justify-center items-center">
                <AllTokens />
            </div>
        </main>
    );
}
