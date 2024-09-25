interface ContainerPageProps {
  children: React.ReactNode;
}

const ContainerMainPage = (props: ContainerPageProps) => {
  const { children } = props;

  return (
    <div className="w-full max-w-6xl px-6 pb-10 mx-auto mt-10 md:pb-40 md:mt-40 lg:pb-40 lg:mt-40">
      {children}
    </div>
  );
};

export default ContainerMainPage;