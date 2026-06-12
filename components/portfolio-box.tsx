"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

interface PortfolioBoxProps {
    data: {
        id: number,
        title: string
        descriptionKey: string
        image: string
        urlGithub: string
        urlDemo: string
    }
    priority?: boolean
}

const PortfolioBox = (props: PortfolioBoxProps) => {
    const { data, priority = false } = props
    const { title, descriptionKey, image, urlDemo, urlGithub } = data
    const { t } = useTranslation()
    const hasDemo = Boolean(urlDemo) && urlDemo !== "#";
    const hasGithub = Boolean(urlGithub);
    const demoBtnClass = hasGithub ? "" : "col-span-2";

    return (
        <div
            className="card-surface group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/60 hover:shadow-[0_20px_44px_-24px_rgba(63,92,255,0.45)]"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7d96ff]/80 to-transparent" />

            <div className="mb-4">
                <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl xl:text-[1.45rem]">{title}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-subtle-foreground sm:text-sm">{t(descriptionKey)}</p>
            </div>

            <div className="relative mb-5 overflow-hidden rounded-xl border border-contrast/10 bg-card-deep">
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={450}
                    priority={priority}
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                {hasGithub && (
                    <a
                        href={urlGithub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-contrast/20 bg-contrast/[0.08] px-3 py-2 text-center text-sm font-medium text-foreground transition-colors duration-150 hover:bg-contrast/[0.18] xl:px-4 xl:py-2.5"
                    >
                        Github
                    </a>
                )}

                {hasDemo && (
                    <a
                        href={urlDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`rounded-lg bg-[#3f5cff] px-3 py-2 text-center text-sm font-medium text-white transition-colors duration-150 hover:bg-[#526cff] xl:px-4 xl:py-2.5 ${demoBtnClass}`}
                    >
                        Live demo
                    </a>
                )}
            </div>
        </div>
    );
}

export default PortfolioBox