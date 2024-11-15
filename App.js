import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import HelloWorld from './components/HelloWorld';
import Name from './components/Name';

const App = () => {
   return (
      <div>
         <Fragment>
            <HelloWorld></HelloWorld>
            <Name/>
         </Fragment>
      </div>
   );
};

export default App;