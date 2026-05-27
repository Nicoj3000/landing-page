"use client";

import { dataCounter } from "@/data";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

const CounterServices = () => {
    const { t } = useTranslation();
    return (
        <div className="relative mx-auto my-10 grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 md:my-12 md:flex md:gap-8 xl:my-14">
            {/* Línea vertical continua solo en mobile (entre las dos columnas) */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-100/50 md:hidden" />

            {dataCounter.map(({ id, endCounter, text, lineRight }) => (
                <div
                    key={id}
                    className={lineRight ? "md:border-r md:border-gray-100/60 md:pr-8" : ""}
                >
                    <p className="mb-2 flex text-2xl font-extrabold text-secondary sm:text-3xl lg:text-4xl xl:text-5xl">
                        +<CountUp end={endCounter} start={0} duration={5} />
                    </p>
                    <p className="max-w-[120px] text-[11px] uppercase sm:text-xs lg:max-w-[140px] lg:text-sm">
                        {t(text)}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default CounterServices;
