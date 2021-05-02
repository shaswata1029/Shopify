import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";

import { loadUser } from "./actions/authActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  sessionStorage.setItem("prevSearch", null);
  return (
    <>
      <Router>
        <Header />
        <div className="container container-fluid">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/product/:id" component={ProductDetails} exact />
            <Route path="/search/:keyword" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
