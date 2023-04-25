import UsersTable from "@/app/components/tables/UsersTable";
import React from "react";

const AtinaUsers = () => {
  // const { getUsersData } = useAtinaCalls();

  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>Benutzer</h1>
      <UsersTable />
    </>
  );
};

export default AtinaUsers;
