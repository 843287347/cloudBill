import React from "react";
// import logo from './logo.svg';
import { Outlet, Link, useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import "./App.scss";
import { useAuth } from "./index";
export const CustomLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link className={match ? "activateLink" : ""} to={to} {...props}>
        {children}
      </Link>
    </div>
  );
};

function App() {
  let auth = useAuth();

  const handleLogout = () => {
    const { user } = auth;
    auth.signout(() => {
      console.log("logout");
    });
  };
  return (
    <div className="App">
      <div className="nav">
        <CustomLink to="/cloudBill">云账单</CustomLink>
        <CustomLink to="/analysis">分析</CustomLink>
        {/* <CustomLink to="/analysis">退出登录</CustomLink> */}
        <a onClick={handleLogout}>退出登录</a>
        {/* <CustomLink to="/login">登录</CustomLink> */}
      </div>
      {!auth.user && <Link to="/login">请登录</Link>}
      <Outlet />
    </div>
  );
}

export default App;
