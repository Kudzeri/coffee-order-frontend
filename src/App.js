// src/App.js
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 p-8">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Welcome to Coffee Samurai
        </h1>
      </main>
      <Footer />
    </div>
  );
}

export default App;
