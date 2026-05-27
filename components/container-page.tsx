interface ContainerPageProps {
    children: React.ReactNode
}

const ContainerPage = (props: ContainerPageProps) => {
    const { children } = props

    return (
        <div className="mx-auto mt-28 w-full max-w-[1400px] px-5 pb-40 sm:px-7 md:mt-32 md:px-10 md:pb-10 xl:mt-36 2xl:max-w-[1560px] 2xl:px-14">
            {children}
        </div>
    );
}

export default ContainerPage;