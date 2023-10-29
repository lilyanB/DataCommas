import Image from "next/image";
import Link from "next/link";

// MIDDLE LINKS DATA
interface ProductType {
    id: number;
    section: string;
    name: string[];
    link: string[];
}

interface Social {
    imgsrc: string,
    href: string,
}

const products: ProductType[] = [
    {
        id: 1,
        section: "Useful Links",
        name: ['Home', 'Wallet', 'Analytics'],
        link: ['/', '/wallet', '/analytics']
    }
]

const socialLinks: Social[] = [
    { imgsrc: '/images/Footer/insta.svg', href: "https://instagram.com/" },
    { imgsrc: '/images/Footer/twitter.svg', href: "https://twitter.com/" },
    { imgsrc: '/images/Footer/github.svg', href: "https://github.com/lilyanB/Pulsar " },
]


const footer = () => {
    return (
        <div className=" relative">
            <div className="radial-bg hidden lg:block"></div>
            <div className="mx-auto max-w-2xl mt-64 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">

                    {/* COLUMN-1 */}

                    <div className='col-span-6'>
                        <img
                            className="block h-12 w-20px mb-4"
                            src={'/images/Logo/logo.png'}
                            alt="Logo"
                            width={60}
                            height={40}
                        />
                        <h3 className='text-lightblue text-sm font-normal leading-9 mb-4 lg:mb-16'> Pulsar  is a transformative web application with a mission to decode complex blockchain data, providing users with comprehensive insights and simplified visualizations.</h3>
                        <div className='flex gap-4'>
                            {socialLinks.map((items, i) => (
                                <Link href={items.href} target="_blank" key={i}><img src={items.imgsrc} alt={items.imgsrc} className='footer-icons' /></Link>
                            ))}
                        </div>
                    </div>

                    {/* CLOUMN-2/3 */}

                    {products.map((product) => (
                        <div key={product.id} className="group relative col-span-2">
                            <p className="text-white text-xl font-medium mb-9">{product.section}</p>
                            <ul>
                                {product.name.map((name: string, index: number) => (
                                    <li key={index} className='mb-5'>
                                        <Link href={product.link[index]} className="text-offwhite  text-sm font-normal mb-6 space-links">{name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="col-span-4">
                        <h3 className="text-white text-xl font-medium mb-9">Contact Us</h3>
                        <h4 className="text-offwhite text-sm font-normal mb-6 flex gap-2"><Image src={'/images/Footer/email.svg'} alt="email-icon" width={20} height={20} />soon</h4>
                    </div>

                </div>
            </div>

            {/* All Rights Reserved */}

            <div className='py-8 px-4 border-t border-t-lightblue'>
                <h3 className='text-center text-offwhite'>@2023 - All Rights Reserved by <Link href="https://github.com/lilyanB/Pulsar " target="_blank"> Pulsar </Link></h3>
            </div>

        </div>
    )
}

export default footer;
