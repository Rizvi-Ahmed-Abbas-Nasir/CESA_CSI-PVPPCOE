"use client"
import { useSession } from "next-auth/react";
import AdminPanel from "../AdminPanel"
import Unauthorized from "../Unauthorized"

export default function Page() {
  const { data: session } = useSession();

  return (
    <div className="bg-[#202020]">
      {/* {session?.user?.role === 'admin' ? ( */}
        <AdminPanel />
      {/* //  ) : (
      //   <Unauthorized />
      // )}  */}
    </div>
  );
}
