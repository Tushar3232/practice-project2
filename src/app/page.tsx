'use client'
import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPencil } from "react-icons/fa6";

export default function Home() {
  const { data } = useSession();
  console.log(data)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {

    }
  }
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center p-4 bg-black ">
      <div className=" border border-white  text-white flex flex-col justify-center items-center p-8 gap-4">
        <FaPencil size={22} color="white" 
        onClick={()=>router.push("/edit")}
        />
        <div className=" relative w-[100px] h-[100px] rounded-full border border-white overflow-hidden">
          <Image src={data?.user?.image || "/practice-project2/public/next.svg"} alt="user Image" fill ></Image>

        </div>
        <h1 className=" text-2xl"> {data?.user?.name} </h1>
        <p> {data?.user?.email} </p>

        <button onClick={handleLogout} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          Logout
        </button>
      </div>
    </div>
  )
}


