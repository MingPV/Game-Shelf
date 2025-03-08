"use server"
import Profile from "@/components/profile/profile";
//import Provider from "@/components/profile/provider";
//import User from "@/components/profile/user";
import { getMyUserData } from "../actions";
import User from "@/components/profile/user";
import Provider from "@/components/profile/provider";

export default async function Home() {
  
  const data = await getMyUserData();
  let profile_url = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  if (data.profile_url) {
    profile_url = data.profile_url;
  }
  if (!data.isProvider){
    return (
      <>
        <main className="flex-1 flex flex-col gap-6 px-4">
          <div className="flex flex-col items-center justify-center font-bold">
            <Profile user={data}/>
            {
              data ? (<div className="text-2xl mt-2">{data.username}</div>) : null
            }
            {
              data ? <div className="text-sm opacity-50 mt-1">{data.email}</div> : null
            }
            <User user={data}/>
          </div>
        </main>
      </>
    );
  }
  else  {
    return (
      <main className="flex-1 flex flex-col gap-6 px-4">
          <div className="flex flex-col items-center justify-center font-bold">
            <Profile user={data}/>
            {
              data ? (<div className="text-2xl mt-2">{data.username}</div>) : null
            }
            {
              data ? <div className="text-sm opacity-50 mt-1">{data.email}</div> : null
            }
            <Provider user={data}/>
          </div>
        </main>
    );
  }
}
