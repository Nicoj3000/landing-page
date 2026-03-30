"use client"

import { socialNetworks } from "@/data";
import Link from "next/link";
import { MotionTransition } from "./transition-component";
import LanguageSelector from "./languageSwitcher";

const Header = () => {
    return (
        <MotionTransition position="bottom" className="absolute top-5 z-40 inline-block w-full md:top-8 xl:top-10">
            <header>
                <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 sm:px-7 md:px-10 2xl:max-w-[1560px] 2xl:px-14">
                <div className="flex items-center space-x-4">
                    <Link href='/'>
                        <h1 className="my-2 text-4xl font-bold text-center md:text-left xl:text-5xl">
                            Nico
                            <span className="text-blue-700">X</span>
                        </h1>
                    </Link>
                    <LanguageSelector />
                </div>
                    <div className="mr-1 flex items-center space-x-4 xl:space-x-5">
                        {socialNetworks.map(({ logo, src, id }) => (
                            <Link
                                key={id}
                                href={src}
                                target="_blank"
                                className="text-slate-100 transition-all duration-200 hover:text-[#8ca3ff]"
                            >
                                {logo}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>
        </MotionTransition>
    );
}

export default Header;