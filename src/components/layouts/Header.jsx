import Logo from '../../assets/images/Logo.svg'
function Header() {
    return (
        <header className="container-main w-full !mt-10">
            <div className="flex items-center gap-10">
                <a className='flex pr-10 border-r border-black' href="/">
                    <img className='w-[274px]' src={Logo} alt="Logo" />
                </a>
                <p className='text-3xl text-error font-mainBold'>Perpetual meta-aggregator</p>
            </div>
        </header>
    )
}
export default Header;