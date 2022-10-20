import "antd/dist/antd.css";
import "./App.scss";
import "./common.scss";
import { BrowserRouter as Router } from "react-router-dom";
import LayoutApp from "src/layout";

const App = () => {
  return (
    <Router>
      <LayoutApp />
    </Router>
  );
};

export default App;
