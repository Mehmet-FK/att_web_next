import UsersTable from "@/app/components/tables/UsersTable";
// import useAtinaCalls from "@/app/hooks/useAtinaCalls";
import React from "react";

const AtinaUsers = () => {
  // const { getUsersData } = useAtinaCalls();
  // getUsersData();
  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>Benutzer</h1>
      <UsersTable />
    </>
  );
};

export default AtinaUsers;
