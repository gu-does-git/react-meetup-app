import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

/* component to act as the default Layout for the pages */
function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
