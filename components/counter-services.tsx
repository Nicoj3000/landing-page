import { dataCounter } from "@/data";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

const CounterServices = () => {
    const { t } = useTranslation();
    return (
        <div className="mx-auto my-10 grid max-w-5xl grid-cols-2 justify-between gap-3 sm:gap-5 md:my-12 md:flex md:grid-cols-4 md:gap-8 xl:my-14">
            {dataCounter.map(({ id, endCounter, text, lineRight, lineRightMobile }) => (
                <div key={id} className={`${lineRight && 'ltr'}`}>
                    <div className={`${lineRight && 'px-4 border-2 border-transparent md:border-e-gray-100'} ${lineRightMobile && 'border-e-gray-100'}`} >
                        <p className="mb-2 flex text-2xl font-extrabold text-secondary sm:text-3xl lg:text-4xl xl:text-5xl">
                            + <CountUp end={endCounter} start={0} duration={5} />
                        </p>
                        <p className="max-w-[120px] text-[11px] uppercase sm:text-xs lg:max-w-[140px] lg:text-sm">
                            {t(text)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CounterServices;