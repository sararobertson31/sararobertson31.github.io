import "./landing.css";
import Page from "./Page";
import Stars from "./stars/stars";

const LandingPage = (props: any) => {
  return (
    <Page>
      <Stars nStars={100} />
      <div id="landing-content">
        <img src="headshot.webp" id="headshot"></img>
        <div id="about-me">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut
          sapien malesuada, porta nulla id, rutrum ante. Pellentesque vestibulum
          tellus id turpis dapibus, a vehicula eros gravida. Maecenas aliquet ex
          dolor, sed commodo neque dignissim a. Praesent luctus elit nec nibh
          rutrum scelerisque. Suspendisse non dictum enim. Sed aliquam ante eu
          luctus tristique. Pellentesque ut mi ut nunc vulputate rutrum ut eu
          sem. Pellentesque vestibulum erat et enim laoreet pellentesque. In
          suscipit ac urna eget fringilla. Etiam vitae nunc tellus. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Nam pretium dui et lacus dignissim posuere. Nullam vehicula
          lectus et ex scelerisque, eget suscipit elit pharetra. Proin blandit
          nulla at dui tincidunt, in tristique erat sollicitudin. Phasellus
          viverra dignissim dignissim. Maecenas posuere, diam nec posuere
          mollis, diam nulla convallis diam, eu accumsan velit sem sed urna.
          Aenean a mi nisl. Pellentesque vel dapibus felis. Integer id tortor
          ornare, suscipit tellus nec, porttitor diam. Vestibulum elementum enim
          et orci facilisis, vel tempus est porta. Etiam vestibulum nec sapien
          ac dignissim. Donec libero turpis, pulvinar sed erat eu, semper
          facilisis massa. Nulla nisi metus, efficitur et porta vitae,
          vestibulum vitae velit. Duis nec rhoncus felis. Curabitur elit est,
          rhoncus non sagittis faucibus, varius sed elit. Aliquam id mauris a
          risus ultricies lobortis vitae at lacus.
        </div>
      </div>
    </Page>
  );
};

export default LandingPage;
