import React, { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import styles from "./index.module.scss";

const Index = lazy(() => import("src/page/index"));
const Cat = lazy(() => import("src/page/cat"));
const Dog = lazy(() => import("src/page/dog"));

const routes = [
  {
    path: "",
    element: <Navigate to="/index" />,
  },
  {
    path: "/index",
    element: <Index />,
  },
  {
    path: "cat",
    element: <Cat />,
  },
  {
    path: "dog",
    element: <Dog />,
  },
  {
    path: "*",
    element: <div>404页面</div>,
  },
];

/*路由*/
const renderRoute = (routes) => {
  const newRoutes = routes.map((item) => {
    if (item.children) {
      renderRoute(item.children);
    }
    item.element = (
      <Suspense
        fallback={
          <div className={styles.center}>
            <div className={styles.des}>
              <span>加载中</span>
              <span className={styles.loading}></span>
            </div>
          </div>
        }
      >
        {item.element}
      </Suspense>
    );
    return item;
  });
  return newRoutes;
};

const PageRoutes = () => {
  return useRoutes(renderRoute(routes));
};

export default PageRoutes;
