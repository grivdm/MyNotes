import "./App.css";
import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Manager from "./pages/MainPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <AuthProvider>
            <Header />
            <Manager />
          </AuthProvider>
        </Router>
        <div className="footer">
          <p>made with love</p>
        </div>
      </div>
    </div>
  );
}

export default App;
