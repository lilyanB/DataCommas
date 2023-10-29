import Link from "next/link";

export default function Banner() {
    return (
        <div className="simple-bg relative">
            <div className="mx-auto max-w-5xl py-24 px-6">
                <h3 className="text-center text-offwhite text-3xl lg:text-5xl font-semibold mb-6">Deciphering Data, Simplifying Insights<br /></h3>
                <p className="text-center text-bluish text-lg font-normal mb-8">Pulsar  is a transformative web application with a mission to decode complex blockchain data, providing users with comprehensive insights and simplified visualizations. Our platform offers two central features</p>
                <div className="flex justify-center ">
                    <Link href="/wallet">
                        <button className='text-xl font-semibold text-white py-4 px-6 lg:px-12 navbutton'>Visualize your wallet</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}