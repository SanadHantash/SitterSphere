import React from "react";
import Stats from "./Stats";
import Users from "./Users";
import SittersTable from "./SittersTable";
import FamiliesRequests from "./FamiliesRequests";

function Tables() {
  return (
    <>
      <Stats />
      <Users />
      <SittersTable />
      <FamiliesRequests />
      {/* <Techtips />
      <Faq /> */}
    </>
  );
}

export default Tables;
