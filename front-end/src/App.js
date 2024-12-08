import React  from 'react';
import RouteConfig from './routes/routes.js';
import { ThemeProvider } from './theme/ThemeContext.js';

const App = () => {
  return(
    <ThemeProvider>
        <RouteConfig/>
    </ThemeProvider>
      
  )
}
export default App;
