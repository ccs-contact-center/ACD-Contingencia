import React from 'react';


const Inicio = React.lazy(() => import('./views/Inicio'));



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Inicio', name: 'Inicio', component: Inicio },

];


export default routes;
