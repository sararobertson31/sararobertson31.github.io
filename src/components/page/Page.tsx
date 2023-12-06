import "./page.css";

interface PageProps {
  children: Array<JSX.Element> | JSX.Element;
}

const Page = (props: PageProps) => {
  return (
    <div className="page-container">
      <div className="page-body">{props.children}</div>
    </div>
  );
};

export default Page;
