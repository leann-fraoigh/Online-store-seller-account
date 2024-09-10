import { Outlet, useNavigation } from "react-router-dom";
import { NavLink } from "react-router-dom";
// UI
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Root() {
  const navigation = useNavigation();
  return (
    <>
      <Typography variant="h4" component="h1" className="sr-only">Личный кабинет</Typography>
      <nav>
        <ol role="list">
          {/* TODO: Сделать подсветку активных ссылок */}
          <li><Link component={NavLink} underline="hover" to="/advertisements">Объявления</Link></li>
          <li><Link component={NavLink} underline="hover" to="/orders">Заказы</Link></li>
        </ol>
      </nav>
      <div
        id="detail"
        className={
          `overlay ${navigation.state === "loading" ? "loading" : ""}`
        }
      >  
        <Outlet />
      </div>
    </>
  )
}
