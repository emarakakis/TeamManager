"use client";

import EmployeeJobTable from "@/modules/EmployeeJobTable/EmployeeJobTable";
import EditItemDrawer from "@/modules/EditItemDrawer/EditItemDrawer";
import ActionModal from "@/modules/ActionModal/ActionModal";

export default function Page() {
  return (
    <>
      <EmployeeJobTable />
      <EditItemDrawer />
      <ActionModal />
    </>
  );
}
