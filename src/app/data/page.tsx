export default function Page() {
    const fetchTransactions = async () => {
        const response = await fetch("/api/all", {
            method: "GET"
        });
        const data = await response.json();
        console.log(data)
    };

    fetchTransactions()

    return <h1>Hello, Data page!</h1>
}