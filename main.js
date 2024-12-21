import { dropMenus, NavBar } from "./components/NavBar/NavBar";
import { changePage } from "./utils/changePage";
import { linkPage } from "./utils/linkPage";
import { Home } from "./pages/Home/Home";
import { Create } from "./pages/Create/Create";
import { Profile } from "./pages/Profile/Profile";
import { burgerBtn } from "./components/NavBar/NavBar";

NavBar();

linkPage("#home", () => changePage(Home));
linkPage("#create", () => changePage(Create));
linkPage("#profile", () => changePage(Profile));
linkPage("#profileB", () => changePage(Profile));

dropMenus();
changePage(Home);
burgerBtn();
