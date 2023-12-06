import bioContent from "../../assets/landing-page";
import Page from "../page/Page";
import "./landing.css";

const LandingPage = (props: any) => {
  return (
    <Page {...props}>
      <div id="landing-content">
        <img src="headshot.webp" id="headshot"></img>
        <div id="bio">{bioContent.trim()}</div>
      </div>
    </Page>
  );
};

export default LandingPage;
