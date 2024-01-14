import {useState} from "react";

export default function Header(){
    const [navToggle, setNavToggle] = useState(false);

    const toggleNav = () => {
        setNavToggle(!navToggle);
    }

    return <>
        <header className={`${navToggle ? 'pb-6' : 'pb-0'} bg-gray-50 lg:pb-0 shadow-md`}>
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <nav className="flex items-center justify-between h-20 lg:h-20">
                    <div className="flex-shrink-0">
                        <a href="#" title="" className="flex">
                            <img className="w-auto h-14 lg:h-16" src="/logo.png" alt="" />
                        </a>
                    </div>

                    <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
                        onClick={toggleNav}
                    >

                        <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                        </svg>


                        <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                        <a href="#" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Hướng dẫn </a>

                        <a href="#" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Liên hệ </a>
                    </div>

                    <a href="#" title="" className="items-center justify-center hidden px-4 py-2 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700" role="button"> Đăng nhập </a>
                </nav>

                {navToggle &&
                    <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
                        <div className="flow-root">
                            <div className="flex flex-col px-6 -my-2 space-y-1">
                                <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Hướng dẫn </a>

                                <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Liên hệ </a>
                            </div>
                        </div>

                        <div className="px-6 mt-6">
                            <a href="#" title="" className="inline-flex justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700" role="button"> Đăng nhập </a>
                        </div>
                    </nav>
                }
            </div>
        </header>
    </>
}
