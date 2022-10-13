import "./App.scss";
import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Results } from "./pages/Results";
import { PrivateGuard } from "./guards/PrivateGuard";
import { CreateVideo } from "./pages/CreateVideo";
import { Subscriptions } from "./pages/Subscriptions";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/results" element={<Results />}></Route>
        <Route element={<PrivateGuard />}>
          <Route path="/create" element={<CreateVideo />}></Route>
          <Route path="/subs" element={<Subscriptions />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
