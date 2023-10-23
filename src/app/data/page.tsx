"use client"

import { useState } from "react";

export default function Page() {
    const [data, setData] = useState(null);

    return (
        <div>
            {data ? (
                <h1>Data Fetched: {data}</h1>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}
