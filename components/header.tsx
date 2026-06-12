"use client"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { socialNetworks } from "@/data";
import Link from "next/link";
import { MotionTransition } from "./transition-component";
import LanguageSelector from "./languageSwitcher";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

const Header = () => {
    const { resolvedTheme, setTheme } = useTheme();
    // resolvedTheme is undefined on the server; render the toggler only after
    // mount (with a same-size placeholder) to keep hydration clean.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const togglerClass =
        "flex h-10 w-10 items-center justify-center rounded-full border border-contrast/20 bg-contrast/5 text-foreground transition-colors duration-200 hover:bg-contrast/10 [&_svg]:h-5 [&_svg]:w-5";

    return (
        <MotionTransition position="bottom" className="absolute top-5 z-40 inline-block w-full md:top-8 xl:top-10">
            <header>
                <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 sm:px-7 md:px-10 2xl:max-w-[1560px] 2xl:px-14">
                <div className="flex items-center space-x-4">
                    <Link href='/' aria-label="NicoX — Inicio">
                        <p className="my-2 text-4xl font-bold text-center md:text-left xl:text-5xl">
                            Nico
                            <span className="text-blue-700">X</span>
                        </p>
                    </Link>
                    <LanguageSelector />
                    {mounted ? (
                        <AnimatedThemeToggler
                            theme={resolvedTheme === "dark" ? "dark" : "light"}
                            onThemeChange={setTheme}
                            className={togglerClass}
                        />
                    ) : (
                        <span aria-hidden className={togglerClass} />
                    )}
                </div>
                    <div className="mr-1 flex items-center space-x-4 xl:space-x-5">
                        {socialNetworks.map(({ logo, src, id, name }) => (
                            <a
                                key={id}
                                href={src}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={name}
                                className="text-foreground transition-all duration-200 hover:text-secondary dark:hover:text-[#8ca3ff]"
                            >
                                {logo}
                            </a>
                        ))}
                    </div>
                </div>
            </header>
        </MotionTransition>
    );
}

export default Header;
