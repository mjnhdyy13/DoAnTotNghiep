import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { publicRoutes } from "./routers/routes";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout || DefaultLayout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
