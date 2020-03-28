import React from 'react';


const Inicio = React.lazy(() => import('./views/Inicio'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Inicio', name: 'Inicio', component: Inicio },
  { path: '/Dashboard', name: 'Dashboard', component: Dashboard },

];


export default routes;
