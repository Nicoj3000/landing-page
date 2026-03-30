interface ContainerPageProps {
  children: React.ReactNode;
}

const ContainerMainPage = (props: ContainerPageProps) => {
  const { children } = props;

  return (
    <div className="mx-auto mt-16 w-full max-w-[1400px] px-5 pb-16 sm:px-7 md:mt-24 md:px-10 xl:mt-28 2xl:max-w-[1560px] 2xl:px-14">
      {children}
    </div>
  );
};

export default ContainerMainPage;