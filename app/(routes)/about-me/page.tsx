"use client"

import ContainerPage from "@/components/container-page";
import CounterServices from "@/components/counter-services";
import TimeLine from "@/components/time-line";
import TransitionPage from "@/components/transition-page";
import { useTranslation } from 'react-i18next';


const AboutMePage = () => {
    const { t } = useTranslation();
    return (
        <>
            <TransitionPage />
            <ContainerPage>
               
                <h1 className="text-2xl leading-tight text-center md:text-left md:text-5xl md:mt-10">
                    {t('titleA')}{' '}
                    <span className="font-bold text-secondary">
                        {t('titleA1')} 
                    </span>
                </h1>

                <CounterServices />

                <TimeLine />

            </ContainerPage>
        </>
    );
}

export default AboutMePage;