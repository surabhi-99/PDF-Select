import React from 'react';
import './App.css'; // Import the app-specific CSS
import FileUpload from './components/FileUpload'; // Import your FileUpload component

function App() {
  return (
    <div className="container">
      <h1 className="heading">PDF Extraction App</h1>
      <main>
        <FileUpload />
      </main>
    </div>
  );
}

export default App;
