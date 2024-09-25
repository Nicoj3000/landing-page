"use client"

import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ContainerTestimonialPage from '@/components/container-testimonial-page';


import { dataTestimonials } from '@/data';


import TransitionPage from '@/components/transition-page';

const TestimonialsPage = () => {
    return (
        <>
        <ContainerTestimonialPage>
            <TransitionPage />
            <div className='flex flex-col justify-center h-lvh'>
                <h1 className="text-4xl leading-tight text-center md:text-5xl md:mb-5">
                    Some comments
                    <span className="block font-bold text-secondary"> from us clients</span>
                </h1>
                <div className="flex items-center justify-center">
                    <div>
                        <Swiper
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 15
                                },
                            }}
                            freeMode={true}
                            pagination={{
                                clickable: true
                                
                            }}
                            modules={[Pagination]}
                            className="h-[430px] md:h-[500px] w-[370px] md:w-[650px] "
                        >
                            {dataTestimonials.map(({ id, name, description, imageUrl }) => (
                                <SwiperSlide key={id}>
                                    <Image src={imageUrl} alt={name} width={1000} height={1000} className="mx-auto md:w-[250px] md:h-[250px] h-[150px] w-[150px] rounded-full" />
                                    <h4 className='text-center text-2xl'>{name}</h4>
                                    <div className="mt-5 text-center">
                                        {description}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            </ContainerTestimonialPage>
        </>
    );
}

export default TestimonialsPage;