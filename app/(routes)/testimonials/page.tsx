"use client"

import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


import { dataTestimonials } from '@/data';


import TransitionPage from '@/components/transition-page';

const TestimonialsPage = () => {
    return (
        <>
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
                                    <Image src={imageUrl} alt={name} width="100" height="100" className="mx-auto md:h-[150px] h-[200px] w-[150px] rounded-full" />
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
        </>
    );
}

export default TestimonialsPage;