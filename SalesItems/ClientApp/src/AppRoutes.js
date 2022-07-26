import { FetchData } from "./components/FetchData";
import { Login } from "./components/Login";
import {Home} from "./components/Home";
import {Bill} from "./components/Bill";

const AppRoutes = [
  {
    index: true,
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/bill',
    element: <Bill />
  }
];

export default AppRoutes;
