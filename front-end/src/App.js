import React  from 'react';
import RouteConfig from './routes/routes.js';
import { ThemeProvider } from './theme/ThemeContext.js';

const App = () => {
  return(
    <ThemeProvider>
      <div className='App'>
        <RouteConfig/>
      </div>
    </ThemeProvider>
      
  )
}

export default App;
