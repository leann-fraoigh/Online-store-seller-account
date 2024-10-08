import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,

} from "react-router-dom";

// Стили
import './assets/css/index.css';
import '@fontsource/roboto/cyrillic-400.css'
import '@fontsource/roboto/cyrillic-500.css'
import { CssBaseline } from '@mui/material';

// Экраны приложения и их лоадеры
import Root from './screens/Root.tsx';
import ErrorPage from './screens/ErrorPage.tsx';
import Advertisements from './screens/Advertisements';
import { loader as advertisementsLoader } from './screens/Advertisements/loader.ts';
import { action as advertisementsAction } from './screens/Advertisements/action.ts';
import Advertisement from './screens/Advertisement';
import { loader as advertisementLoader } from './screens/Advertisement/loader.ts';
import { action as advertisementAction } from './screens/Advertisement/action.ts';
import Index from './screens/Index.tsx';
import Orders from './screens/Orders';
import { loader as ordersLoader } from './screens/Orders/loader.ts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<ErrorPage />}
    >
      <Route index element={<Index/>} />
      <Route
        path="advertisements"
        element={<Advertisements />}
        loader={advertisementsLoader}
        action={advertisementsAction}
      />
      <Route
        path="advertisements/:advertisementId"
        element={<Advertisement />}
        loader={advertisementLoader}
        action={advertisementAction}
      />
      <Route
        path="orders"
        element={<Orders />}
        loader={ordersLoader}
      />

    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </StrictMode>,
)
