import Image from "next/image";
import Link from "next/link";

interface PortfolioBoxProps {
    data: {
        id: number,
        title: string
        image: string
        urlGithub: string
        urlDemo: string
    }
}

const PortfolioBox = (props: PortfolioBoxProps) => {
    const { data } = props
    const { title, image, urlDemo, urlGithub } = data
    const demoBtnClass = urlGithub ? "" : "col-span-2";

    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(16,24,46,0.92),rgba(9,13,26,0.9))] p-5 backdrop-blur-sm shadow-[0_14px_32px_-24px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/60 hover:shadow-[0_20px_44px_-24px_rgba(63,92,255,0.45)]"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7d96ff]/80 to-transparent" />

            <div className="mb-4">
                <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-slate-100 sm:text-xl xl:text-[1.45rem]">{title}</h3>
            </div>

            <div className="relative mb-5 overflow-hidden rounded-xl border border-white/10 bg-[#090e1d]">
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={450}
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                {urlGithub && (
                    <Link
                        href={urlGithub}
                        target="_blank"
                        className="rounded-lg border border-white/20 bg-white/8 px-3 py-2 text-center text-sm font-medium text-slate-100 transition-colors duration-150 hover:bg-white/18 xl:px-4 xl:py-2.5"
                    >
                        Github
                    </Link>
                )}

                <Link
                    href={urlDemo}
                    target="_blank"
                    className={`rounded-lg bg-[#3f5cff] px-3 py-2 text-center text-sm font-medium text-white transition-colors duration-150 hover:bg-[#526cff] xl:px-4 xl:py-2.5 ${demoBtnClass}`}
                >
                    Live demo
                </Link>
            </div>
        </div>
    );
}

export default PortfolioBox