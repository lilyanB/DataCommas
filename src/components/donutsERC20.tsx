"use client";

import { tokens_holders } from "@/outils/getData";
import { Card, DonutChart, TabPanel, Title } from "@tremor/react";
import { useEffect, useState } from "react";

export default function DonutsERC20(props: any) {
    const [value, setValue] = useState(null);

    useEffect(() => {
        const fetchTokenHolders = async () => {
            if (props.tokens.length === 0) {
                return; // No tokens to fetch holders for
            }
            let addressAndamount = []
            let total = 0

            let addressAndAmountAndSymbol = []
            let totalAndSymbol = [];

            for (var val of props.tokens) {
                setTimeout(function () {
                }, 100);
                const response = await tokens_holders(val.address, "Base");
                const data = response.result
                for (var value of data) {
                    addressAndamount.push([val.address, value.amount])
                    total += response.result.amount
                }
                totalAndSymbol.push(total)
                addressAndAmountAndSymbol.push(addressAndamount)
                total = 0
                addressAndamount = []
            }
            console.log(addressAndAmountAndSymbol)
        };

        fetchTokenHolders();
    }, [props.tokens]);

    return (
        <TabPanel>
            <Card className="mx-auto">
                <Title>Sales</Title>
                <DonutChart
                    className="mt-6"
                    data={props.tokens}
                    category="sales"
                    index="name"
                    colors={["rose", "yellow", "orange", "indigo", "blue", "emerald"]}
                    onValueChange={(v) => setValue(v)}
                />
            </Card>
        </TabPanel>
    );
}
