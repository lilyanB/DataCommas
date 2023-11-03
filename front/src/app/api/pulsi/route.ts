import { NextRequest, NextResponse } from "next/server";
import { utils } from "ethers";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const data = new URLSearchParams(body);

        const message = data.get("message"); // The message received from the client
        const signature = data.get("signature"); // The signature received from the client
        const account = data.get("account");

        if (!message || !signature || !account) {
            return new NextResponse(
                JSON.stringify({ error: "Please provide 'message', 'signature', and 'account' parameters in the request body" }),
                { status: 400 }
            );
        }

        // Verify the signature
        const recoveredAddress = utils.verifyMessage(message, signature);

        if (account.toLowerCase() === recoveredAddress.toLowerCase()) {
            return new NextResponse(JSON.stringify({ message: `Hello ${message}` }), {
                status: 200,
            });
        } else {
            return new NextResponse(
                JSON.stringify({ error: "Signature verification failed" }),
                { status: 401 } // Unauthorized status code
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Invalid request body format" }),
            { status: 400 }
        );
    }
}
