"use client"
import Image from 'next/image';

interface workdata {
    imgSrc: string;
    heading: string;
    subheading: string;
    hiddenpara: string;
}

const workdata: workdata[] = [
    {
        imgSrc: '/images/icon-two.svg',
        heading: 'Wallet Visualization',
        subheading: 'Erc20, NFT, and Transactions / User-Centric',
        hiddenpara: 'Pulsar offers a holistic view of your blockchain wallet, encompassing ERC20 tokens, NFTs, and transaction histories. We prioritize user-friendliness, ensuring individuals of all backgrounds can easily access and comprehend their wallet data.',
    },
    {
        imgSrc: '/images/icon-three.svg',
        heading: 'Blockchain Data for Informed Decision-Making',
        subheading: 'Empowering Insights / High-Volume Analytics',
        hiddenpara: 'Pulsar equips users with data-driven insights, aiding them in making informed decisions within the blockchain space. Our platform can efficiently handle large datasets, making it a valuable tool for users with significant blockchain activities.',
    },

]

export default function Features() {
    return (
        <>
            <div className='mx-auto max-w-7xl mt-16 px-6 mb-20 relative'>
                <div className="radial-bgone hidden lg:block"></div>
                <div className='text-center mb-14'>
                    <h3 className='text-offwhite text-3xl md:text-5xl font-bold mb-3'>How it work</h3>
                </div>

                <div className='grid md:grid-cols-2 gap-y-20 gap-x-5 mt-32'>

                    {workdata.map((items, i) => (
                        <div className='card-b p-8' key={i}>
                            <div className='features-img-bg rounded-full flex justify-center absolute p-6'>
                                <Image src={items.imgSrc} alt={items.imgSrc} width={44} height={44} />
                            </div>
                            <div>
                                <Image src={'/images/bg-arrow.svg'} alt="arrow-bg" width={85} height={35} />
                            </div>
                            <h3 className='text-2xl text-offwhite font-semibold text-center mt-8'>{items.heading}</h3>
                            <p className='text-base font-normal text-bluish text-center mt-2'>{items.subheading}</p>
                            <span className="text-base font-normal m-0 text-bluish text-center hides">{items.hiddenpara}</span>
                        </div>
                    ))}

                </div>

            </div>
        </>
    )
}
