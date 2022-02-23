import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AddProducts from "./AddProducts";
import UpdateProducts from "./UpdateProducts";
import Protected from "./Protected";
import ProductList from "./ProductList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/add">
            <Protected Cmp={AddProducts} />
          </Route>
          <Route path="/update/:id">
            <Protected Cmp={UpdateProducts} />
          </Route>
          <Route path="/">
            <Protected Cmp={ProductList} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
