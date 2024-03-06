import React from "react";
import Stats from "./Stats";
import Users from "./Users";

import Workshops from "./Workshops";
import Techtips from "./Techtips";
import Faq from "./Faq";
import SittersTable from "./SittersTable";

function Tables() {
  return (
    <>
      <Stats />
      <Users />
      <SittersTable />
      <Workshops />
      <Techtips />
      <Faq />
    </>
  );
}

export default Tables;
