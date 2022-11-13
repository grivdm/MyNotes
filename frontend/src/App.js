import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Manager from "./pages/MainPage";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Header />
          <Manager />
        </Router>
        <div className="footer">
          <p>made with love</p>
        </div>
      </div>
    </div>
  );
}

export default App;
