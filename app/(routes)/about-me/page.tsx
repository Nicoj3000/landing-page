"use client"

import ContainerPage from "@/components/container-page";
import CounterServices from "@/components/counter-services";
import TimeLine from "@/components/time-line";
import TransitionPage from "@/components/transition-page";

const AboutMePage = () => {
    return (
        <>
            <TransitionPage />
            <ContainerPage>
               
                <h1 className="text-2xl leading-tight text-center md:text-left md:text-5xl md:mt-10">
                    My entire{' '}
                    <span className="font-bold text-secondary">
                       profesional career 
                    </span>
                </h1>

                <CounterServices />

                <TimeLine />

            </ContainerPage>
        </>
    );
}

export default AboutMePage;