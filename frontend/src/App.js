import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container container-fluid">
          <Switch>
            <Route path="/" component={Home} exact />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
