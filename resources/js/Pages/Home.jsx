import AppLayout from "@/Layouts/AppLayout.jsx";

export default function () {
    return <>
        <AppLayout>
            <section className="relative bg-gray-50">
                <div className="relative z-10 px-4 py-12 sm:py-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:py-20 xl:py-28 lg:grid lg:grid-cols-2">
                    <div className="lg:pr-8">
                        <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
                            <h1 className="text-2xl font-bold text-blue-600 sm:text-3xl lg:text-4xl">
                                Hãy gửi các phản hồi thiết bị hỏng hóc cho chúng tôi
                                <span className="inline ml-3">
                                    <img
                                        alt="shape-2"
                                        className="inline w-auto h-8 sm:h-10 lg:h-11"
                                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/4/shape-2.svg"
                                    />
                                </span>
                            </h1>
                            <p className="mt-6 text-base font-normal leading-7 text-gray-900">
                                Vui lòng quét mã QR trước cửa phòng để gửi báo hỏng hoặc đánh giá
                            </p>
                            <form action="#"
                                  className="relative mt-6"
                                  method="post">
                                <div className="relative space-y-4 sm:flex sm:space-y-0 sm:items-end">
                                    <button
                                        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-blue-500 border border-transparent rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                        type="button">
                                        Xem hướng dẫn
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="pb-8">
                    <div
                        className="flex flex-col items-center justify-center overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <div className="flex justify-start w-full gap-6 pb-8 overflow-x-auto snap-x">
                            <div className="relative snap-start scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
                                <div
                                    className="relative flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow w-60 md:w-80 group rounded-xl hover:shadow-lg hover:-translate-y-1">
                                    <a
                                        className="flex shrink-0 aspect-w-4 aspect-h-3"
                                        href="#"
                                        title=""
                                    >
                                        <img
                                            alt="thumbnail-1"
                                            className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                                            src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/4/thumbnail-1.png"
                                        />
                                    </a>
                                    <div className="flex-1 px-4 py-5 sm:p-6">
                                        <a
                                            className=""
                                            href="#"
                                            title=""
                                        >
                                            <p className="text-lg font-bold text-gray-900">
                                                How to write content about your photographs
                                            </p>
                                            <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                                                Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Sit quis
                                                auctor odio arcu et dolor.
                                            </p>
                                        </a>
                                    </div>
                                    <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <p className="text-sm font-medium text-gray-900">
                                                    <a
                                                        className=""
                                                        href="#"
                                                        title=""
                                                    >
                                                        Growth
                                                    </a>
                                                </p>
                                                <span className="text-sm font-medium text-gray-900">
                      •
                    </span>
                                                <p className="text-sm font-medium text-gray-900">
                                                    7 Mins Read
                                                </p>
                                            </div>
                                            <a
                                                className=""
                                                href="#"
                                                role="button"
                                                title=""
                                            >
                                                <svg
                                                    className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0 0h24v24H0z"
                                                        fill="none"
                                                        stroke="none"
                                                    />
                                                    <line
                                                        x1="17"
                                                        x2="7"
                                                        y1="7"
                                                        y2="17"
                                                    />
                                                    <polyline points="8 7 17 7 17 16"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*        <div className="relative snap-start scroll-ml-6 shrink-0 first:pl-6 last:pr-6">*/}
                            {/*            <div*/}
                            {/*                className="relative flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow w-60 md:w-80 group rounded-xl hover:shadow-lg hover:-translate-y-1">*/}
                            {/*                <a*/}
                            {/*                    className="flex shrink-0 aspect-w-4 aspect-h-3"*/}
                            {/*                    href="#"*/}
                            {/*                    title=""*/}
                            {/*                >*/}
                            {/*                    <img*/}
                            {/*                        alt="thumbnail-2"*/}
                            {/*                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"*/}
                            {/*                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/4/thumbnail-2.png"*/}
                            {/*                    />*/}
                            {/*                </a>*/}
                            {/*                <div className="flex-1 px-4 py-5 sm:p-6">*/}
                            {/*                    <a*/}
                            {/*                        className=""*/}
                            {/*                        href="#"*/}
                            {/*                        title=""*/}
                            {/*                    >*/}
                            {/*                        <p className="text-lg font-bold text-gray-900">*/}
                            {/*                            How to write content about your photographs*/}
                            {/*                        </p>*/}
                            {/*                        <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">*/}
                            {/*                            Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Sit quis*/}
                            {/*                            auctor odio arcu et dolor.*/}
                            {/*                        </p>*/}
                            {/*                    </a>*/}
                            {/*                </div>*/}
                            {/*                <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">*/}
                            {/*                    <div className="flex items-center justify-between">*/}
                            {/*                        <div className="flex items-center space-x-2">*/}
                            {/*                            <p className="text-sm font-medium text-gray-900">*/}
                            {/*                                <a*/}
                            {/*                                    className=""*/}
                            {/*                                    href="#"*/}
                            {/*                                    title=""*/}
                            {/*                                >*/}
                            {/*                                    Growth*/}
                            {/*                                </a>*/}
                            {/*                            </p>*/}
                            {/*                            <span className="text-sm font-medium text-gray-900">*/}
                            {/*  •*/}
                            {/*</span>*/}
                            {/*                            <p className="text-sm font-medium text-gray-900">*/}
                            {/*                                7 Mins Read*/}
                            {/*                            </p>*/}
                            {/*                        </div>*/}
                            {/*                        <a*/}
                            {/*                            className=""*/}
                            {/*                            href="#"*/}
                            {/*                            role="button"*/}
                            {/*                            title=""*/}
                            {/*                        >*/}
                            {/*                            <svg*/}
                            {/*                                className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"*/}
                            {/*                                fill="none"*/}
                            {/*                                stroke="currentColor"*/}
                            {/*                                strokeLinecap="round"*/}
                            {/*                                strokeLinejoin="round"*/}
                            {/*                                strokeWidth="2"*/}
                            {/*                                viewBox="0 0 24 24"*/}
                            {/*                                xmlns="http://www.w3.org/2000/svg"*/}
                            {/*                            >*/}
                            {/*                                <path*/}
                            {/*                                    d="M0 0h24v24H0z"*/}
                            {/*                                    fill="none"*/}
                            {/*                                    stroke="none"*/}
                            {/*                                />*/}
                            {/*                                <line*/}
                            {/*                                    x1="17"*/}
                            {/*                                    x2="7"*/}
                            {/*                                    y1="7"*/}
                            {/*                                    y2="17"*/}
                            {/*                                />*/}
                            {/*                                <polyline points="8 7 17 7 17 16"/>*/}
                            {/*                            </svg>*/}
                            {/*                        </a>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className="relative snap-start scroll-ml-6 shrink-0 first:pl-6 last:pr-6">*/}
                            {/*            <div*/}
                            {/*                className="relative flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow w-60 md:w-80 group rounded-xl hover:shadow-lg hover:-translate-y-1">*/}
                            {/*                <a*/}
                            {/*                    className="flex shrink-0 aspect-w-4 aspect-h-3"*/}
                            {/*                    href="#"*/}
                            {/*                    title=""*/}
                            {/*                >*/}
                            {/*                    <img*/}
                            {/*                        alt="thumbnail-3"*/}
                            {/*                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"*/}
                            {/*                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/4/thumbnail-3.png"*/}
                            {/*                    />*/}
                            {/*                </a>*/}
                            {/*                <div className="flex-1 px-4 py-5 sm:p-6">*/}
                            {/*                    <a*/}
                            {/*                        className=""*/}
                            {/*                        href="#"*/}
                            {/*                        title=""*/}
                            {/*                    >*/}
                            {/*                        <p className="text-lg font-bold text-gray-900">*/}
                            {/*                            How to write content about your photographs*/}
                            {/*                        </p>*/}
                            {/*                        <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">*/}
                            {/*                            Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Sit quis*/}
                            {/*                            auctor odio arcu et dolor.*/}
                            {/*                        </p>*/}
                            {/*                    </a>*/}
                            {/*                </div>*/}
                            {/*                <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">*/}
                            {/*                    <div className="flex items-center justify-between">*/}
                            {/*                        <div className="flex items-center space-x-2">*/}
                            {/*                            <p className="text-sm font-medium text-gray-900">*/}
                            {/*                                <a*/}
                            {/*                                    className=""*/}
                            {/*                                    href="#"*/}
                            {/*                                    title=""*/}
                            {/*                                >*/}
                            {/*                                    Growth*/}
                            {/*                                </a>*/}
                            {/*                            </p>*/}
                            {/*                            <span className="text-sm font-medium text-gray-900">*/}
                            {/*  •*/}
                            {/*</span>*/}
                            {/*                            <p className="text-sm font-medium text-gray-900">*/}
                            {/*                                7 Mins Read*/}
                            {/*                            </p>*/}
                            {/*                        </div>*/}
                            {/*                        <a*/}
                            {/*                            className=""*/}
                            {/*                            href="#"*/}
                            {/*                            role="button"*/}
                            {/*                            title=""*/}
                            {/*                        >*/}
                            {/*                            <svg*/}
                            {/*                                className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"*/}
                            {/*                                fill="none"*/}
                            {/*                                stroke="currentColor"*/}
                            {/*                                strokeLinecap="round"*/}
                            {/*                                strokeLinejoin="round"*/}
                            {/*                                strokeWidth="2"*/}
                            {/*                                viewBox="0 0 24 24"*/}
                            {/*                                xmlns="http://www.w3.org/2000/svg"*/}
                            {/*                            >*/}
                            {/*                                <path*/}
                            {/*                                    d="M0 0h24v24H0z"*/}
                            {/*                                    fill="none"*/}
                            {/*                                    stroke="none"*/}
                            {/*                                />*/}
                            {/*                                <line*/}
                            {/*                                    x1="17"*/}
                            {/*                                    x2="7"*/}
                            {/*                                    y1="7"*/}
                            {/*                                    y2="17"*/}
                            {/*                                />*/}
                            {/*                                <polyline points="8 7 17 7 17 16"/>*/}
                            {/*                            </svg>*/}
                            {/*                        </a>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                        </div>
                        <div className="flex items-center justify-end mt-2 space-x-5">
                            <div className="w-16 h-[3px] rounded-full bg-gray-900"/>
                            <div className="w-16 h-[3px] rounded-full bg-gray-300"/>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-12 bg-white sm:py-16 lg:py-20 xl:py-24">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-4xl">
                    <div className="relative">
                        <div className="overflow-hidden aspect-square sm:aspect-video rounded-2xl lg:rounded-3xl group">
                            <img
                                className="object-cover w-full h-full transition-all duration-200 group-hover:scale-110"
                                src="https://landingfoliocom.imgix.net/store/collection/saasui/images/testimonial/2/video-cover.png"
                                alt=""/>
                        </div>
                        <div
                            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900 to-transparent rounded-2xl lg:rounded-3xl opacity-80"></div>
                        <div className="absolute inset-0 grid w-full h-full pointer-events-none place-items-center">
                            <button type="button"
                                    className="inline-flex items-center justify-center w-20 h-20 text-white transition-all duration-200 border-2 border-white pointer-events-auto rounded-2xl bg-white/10 backdrop-blur-lg hover:bg-white/20">
                                <svg className="w-auto h-8 -mr-1" viewBox="0 0 15 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1 3.80425V14.1958C1 15.7666 2.7279 16.7243 4.06 15.8917L12.3732 10.696C13.6265 9.91266 13.6265 8.08734 12.3732 7.304L4.06 2.10825C2.7279 1.27569 1 2.23338 1 3.80425Z"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div
                            className="absolute bottom-0 w-full px-4 py-8 text-center -translate-x-1/2 left-1/2 lg:p-12">
                            <p className="text-lg font-semibold text-white sm:text-xl lg:text-3xl">See how we helped
                                Groover to grow 11x faster</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">Frequently
                            Asked Questions</h2>
                    </div>

                    <div className="max-w-5xl mx-auto mt-10 sm:mt-20">
                        <div className="flow-root">
                            <div className="-my-8 divide-y divide-gray-200">
                                <div className="py-8">
                                    <p className="text-2xl font-bold text-gray-900 font-pj">01. How this UI Kit is
                                        different from others in market?</p>
                                    <p className="mt-8 text-lg font-normal text-gray-600 font-pj">Amet minim mollit non
                                        deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                                        enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                                </div>

                                <div className="py-8">
                                    <p className="text-2xl font-bold text-gray-900 font-pj">02. Do I need any experience
                                        to work with Rareblocks?</p>
                                    <p className="mt-8 text-lg font-normal text-gray-600 font-pj">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor convallis
                                        suspendisse eget risus, praesent nullam amet sed. Auctor sed viverra purus
                                        ullamcorper. Fermentum ante fames velit massa cras id donec metus, aliquam. Nibh
                                        odio volutpat in etiam.
                                    </p>
                                </div>

                                <div className="py-8">
                                    <p className="text-2xl font-bold text-gray-900 font-pj">03. Do you provide any
                                        support for this kit?</p>
                                    <p className="mt-8 text-lg font-normal text-gray-600 font-pj">
                                        Consectetur adipiscing elit. Nisi tincidunt mauris faucibus netus. Quis quis et
                                        metus, integer adipiscing. Nulla egestas elit ultricies nunc enim orci
                                        pellentesque. Semper risus vel nisl a, tortor egestas vulputate justo, magna.
                                        Diam ut eget ut pharetra donec in duis
                                        pellentesque dignissim.
                                    </p>
                                </div>

                                <div className="py-8">
                                    <p className="text-2xl font-bold text-gray-900 font-pj">04. Will I get money back if
                                        I am not satisfied?</p>
                                    <p className="mt-8 text-lg font-normal text-gray-600 font-pj">Amet minim mollit non
                                        deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                                        enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    </>
}
