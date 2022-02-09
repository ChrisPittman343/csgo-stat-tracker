import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  return (
    <div>
      <div className="min-h-screen">
        <Navbar />
        <div className="m-8">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
