
const Footer = () => {
    return (
        <>
        {/* Footer*/}
        <footer className=' overflow-hidden px-10 over mono text-lg bottom-0 flex flex-col w-full'>
            <div className='flex  justify-between    w-full mono '>
                <div className='flex  justify-between  w-full '>
                    <a href='/' className='font-extrabold mono hover:transition  hover:ease-in-out hover:duration-500 hover:white'>{'<'}<span className='font-extrabold amber mono  py-5'>pb</span>{'/>'} 2026</a>
                    <h2 className='flex justify-center animate-pulse items-center flex-wrap gap-2 text-[#5DCAA5]'> 
                    {/* Animate ping dot*/}
                    <span className="relative flex size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5DCAA5] opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-[#5DCAA5]"></span>
                    </span >Build By Prabhat bhusal</h2>
                </div>

            </div>
        </footer>
        </>

    )
}
export default Footer;