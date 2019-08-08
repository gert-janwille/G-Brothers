import React from 'react';
import {Route} from 'react-router-dom';

import {inject, observer} from 'mobx-react';
import Camera from './Camera.jsx';

const App = () => {

  return (

    <section>
      
      <section className='content-container'>
        <Route exact path='/' component={Camera} />
      </section>

    </section>

  );
}


export default inject(
  ({store}) => ({
  })
)(
  observer(App)
);
