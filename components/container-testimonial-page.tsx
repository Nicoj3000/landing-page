import React from 'react';

interface ContainerTestimonialPageProps {
  children: React.ReactNode;
}

const ContainerTestimonialPage = (props: ContainerTestimonialPageProps) => {
  const { children } = props;

  return (
    <div className="w-full max-w-6xl px-6 pb-40 mx-auto mt-20 md:pb-0 md:px-10">
      {children}
    </div>
  );
};

export default ContainerTestimonialPage;