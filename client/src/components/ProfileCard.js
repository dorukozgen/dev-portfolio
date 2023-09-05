function ProfileCard() {
    return (
        <>
            <div className="flex lg:w-[40%] w-[100%] flex-col justify-center lg:text-left text-center">
                <span className="text-[#ffffff] font-bold md:text-4xl text-2xl">
                    Merhaba, ben Doruk
                </span>
                <span className="text-[#2f9e35] font-bold md:text-4xl text-2xl pt-2">
                    Yazılım Test Geliştiricisi
                </span>

                <p className="text-[#ffffff] md:pt-[70px] pt-[40px] md:text-xl text-base">
                    QA, QA Automation, QA Automation Engineer, Software Test Engineer, Test Automation Engineer
                </p>

                <div className="flex flex-row gap-5 md:pt-[20px] pt-[40px] mx-auto lg:mx-0">
                    <a className="border-[2px] hover:bg-gray-100 border-gray-400 md:text-xl text-sm text-gray-400 rounded shadow inline-block text-center h-fit w-fit px-[15px] py-[5px]" href="/about">
                        Hakkımda
                    </a>
                    <a className="border-[2px] hover:bg-gray-100 border-gray-400 md:text-xl text-sm text-gray-400 rounded shadow inline-block text-center h-fit w-fit px-[15px] py-[5px]" href="/projects">
                        Projeler
                    </a>
                    <a className="border-[2px] hover:bg-gray-100 border-gray-400 md:text-xl text-sm text-gray-400 rounded shadow inline-block text-center h-fit w-fit px-[15px] py-[5px]" href="/contact">
                        İletişim
                    </a>
                </div>
            </div>
        </>
    );
};

export default ProfileCard;