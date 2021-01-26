import React from "react";
import Link from "next/link";
import Bird from "./birds";

const Index = () => {
  return (
    <div className="main">
      <Bird />
      {/* <Link href="/birds">
        <a>Birds Example</a>
      </Link>
      <Link href="/boxes">
        <a>Boxes Example</a>
      </Link> */}
    </div>
  );
};

export default Index;
