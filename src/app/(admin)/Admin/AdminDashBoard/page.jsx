"use client"
import AdminPanel from "../../AdminPanel"

export default function Page() {

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
