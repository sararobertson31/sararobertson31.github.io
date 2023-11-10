interface PageProps {
  children: Array<JSX.Element> | JSX.Element;
}

const Page = (props: PageProps) => {
  return <div className="page-container">{props.children}</div>;
};

export default Page;
