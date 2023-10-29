"use client"

import Link from "next/link";

const subscriptions = [
    {
        heading: "Novice",
        price: 0,
        user: 'per user, per month',
        button: "Pay with Metamask",
        mails: '1 mail per months',
        blockchain: 'Base',
        ERC20: '1',
    },
    {
        heading: "Investor",
        price: 4,
        user: 'per user, per month',
        button: "Pay with Metamask",
        mails: '1 mail per week',
        blockchain: 'Base, opBNB, Optimism',
        ERC20: '10',
    },
    {
        heading: "Trader",
        price: 15,
        user: 'per user, per month',
        button: "Pay with Metamask",
        mails: '1 mail per day',
        blockchain: 'Base, opBNB, Optimism',
        ERC20: 'all',
    },
]

export default function Page() {

    return (
        <main className="flex flex-col py-6">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div
                            className="wow fadeInUp mx-auto max-w-[800px] text-center"
                            data-wow-delay=".2s"
                        >
                            <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                                Pulsi: the Pulsar API
                            </h1>
                            <p className="mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                                Simplify your communication management and stay connected with blockchain informations automatically and efficiently. Subscribe to the power of Pulsar. Customize your email dispatches at regular intervals based on your chosen subscription using the Pulsar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-col h-full gap-6 justify-center items-center"> */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-16 mx-5 gap-14 manage'>
                {subscriptions.map((items, i) => (
                    <div className='manageTabs text-center p-10' key={i}>
                        <h4 className='text-2xl font-bold mb-3'>{items.heading}</h4>
                        <h2 className='text-5xl sm:text-65xl font-extrabold mb-3'>${items.price}</h2>
                        <p className='text-sm font-medium text-darkgrey mb-6'>{items.user}</p>
                        <button className='text-sm font-bold text-blue bg-transparent hover:bg-blue hover:text-white border-2 border-blue rounded-full py-4 px-12 mb-6'>{items.button}</button>
                        <hr style={{ color: "darkgrey", width: "50%", margin: "auto" }} />
                        <h3 className='text-sm font-medium text-darkgrey mb-3 mt-6'>{items.mails}</h3>
                        <h3 className='text-sm font-medium text-darkgrey mb-3'>blockchains: {items.blockchain}</h3>
                        <h3 className='text-sm font-medium text-darkgrey mb-3'>numbers of ERC20: {items.ERC20}</h3>
                        <h3 className='text-sm font-medium text-darkgrey mb-3'>...</h3>
                    </div>
                ))}
            </div>
            {/* </div> */}
        </main >
    );
}
