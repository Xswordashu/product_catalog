import { createBrowserRouter } from 'react-router';
import Home from './components/Home';
import ItemDetail from './components/ItemDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home
  },
  {
    path: '/item/:id',
    Component: ItemDetail
  }
]);
