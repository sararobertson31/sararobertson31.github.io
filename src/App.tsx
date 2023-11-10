import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage";
import Header from "./header";

const routes = [
  {
    element: <LandingPage />,
    path: "",
    name: "Home",
  },
  {
    element: <>Poetry</>,
    path: "poetry",
    name: "Poetry",
  },
  {
    element: <>NonFic</>,
    path: "creative",
    name: "Creative Nonfiction",
  },
  {
    element: <>Journalism</>,
    path: "journalism",
    name: "Journalism",
  },
];

function App() {
  return (
    <div id="root">
      <BrowserRouter>
        <Header navItems={routes} title="Sara Robertson" />
        <Routes>
          {routes.map((r) => (
            <Route {...r} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
