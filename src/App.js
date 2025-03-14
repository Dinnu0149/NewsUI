import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationControl from './routes/Routes';
import { NewsProvider } from './contexts/NewsContex';


function App() {
  
  return (
    <div>
      <NewsProvider>
        <NavigationControl />
      </NewsProvider>
    </div>
  )
}

export default App