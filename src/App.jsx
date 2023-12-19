import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import nonfic from "./assets/creative-nonfic";
import journalism from "./assets/journalism";
import poetry from "./assets/poetry";
import GridPage from "./components/grid/GridPage";
import Header from "./components/header/header";
import LandingPage from "./components/landing/LandingPage";
import Story from "./components/story/Story";

const processStories = (stories) => {
  let interStories = stories;

  const usedIds = {};
  interStories = interStories.map((s) => {
    let id = s.title.toLowerCase().replaceAll(" ", "_");
    usedIds[id] = (usedIds[id] ?? 0) + 1;
    if (usedIds[id] > 1) {
      id = id + "_" + usedIds[id].toString();
    }
    return { ...s, id };
  });

  interStories = interStories.map((s) => {
    if (s.content) {
      s.content = s.content.replaceAll(/\n/gi, "<br/>"); // &emsp;");
    }
    return s;
  });

  return interStories;
};

const routes = [];
routes.push(
  ...[
    {
      element: <LandingPage routes={routes} />,
      path: "",
      name: "Home",
    },
    {
      element: (
        <GridPage
          routes={routes}
          stories={processStories(poetry)}
          path="poetry"
        />
      ),
      path: "poetry",
      name: "Poetry",
    },
    {
      element: (
        <GridPage
          routes={routes}
          stories={processStories(nonfic)}
          path="creative"
        />
      ),
      path: "creative",
      name: "Creative Nonfiction",
    },
    {
      element: (
        <GridPage
          routes={routes}
          stories={processStories(journalism)}
          path="journalism"
        />
      ),
      path: "journalism",
      name: "Journalism",
    },
  ]
);

const storyLoader = (story, path) => {
  console.log(story, path);
  return {
    element: <Story {...story} />,
    path: `${path}/${story.id}`,
    name: story.id,
  };
};

const storyPages = [
  {
    items: processStories(poetry),
    path: "poetry",
  },
  {
    items: processStories(nonfic),
    path: "creative",
  },
  {
    items: processStories(journalism),
    path: "journalism",
  },
];

function App() {
  return (
    <div id="root">
      <BrowserRouter basename={"/"}>
        <Header navItems={routes} title="Sara Robertson" />
        <Routes>
          {routes
            .concat(
              storyPages.reduce(
                (acc, curr) =>
                  acc.concat(curr.items.map((s) => storyLoader(s, curr.path))),
                []
              )
            )
            .map((r) => (
              <Route {...r} />
            ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
