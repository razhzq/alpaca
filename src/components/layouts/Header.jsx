import Logo from '../../assets/images/Logo.svg'
function Header() {
    return (
        <header className="container-main w-full !mt-10">
            <div className="flex flex-col md:flex-row w-full justify-center md:justify-start items-center gap-5 md:gap-10">
                <a className='flex pr-10 md:border-r md:border-black' href="/">
                    <img className='w-[274px]' src={Logo} alt="Logo" />
                </a>
                <p className='text-xl md:text-3xl text-error font-mainBold text-center'>Perpetual meta-aggregator</p>
            </div>
        </header>
    )
}
export default Header;