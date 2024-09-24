interface ContainerPageProps {
  children: React.ReactNode;
}

const ContainerMainPage = (props: ContainerPageProps) => {
  const { children } = props;

  return (
    <div className="w-full max-w-6xl px-6 pb-40 mx-auto mt-40 md:pb-0 md:px-100">
      {children}
    </div>
  );
};

export default ContainerMainPage;
