import "./globalStyles.scss";
import { JSX } from "react";

type LayoutProps = {
  children: JSX.Element;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
