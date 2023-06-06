"use client";

import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";
import {signIn,signOut,useSession,getProviders} from "next-auth/react";

const Nav = () => {
 const {data:session} = useSession();
 const [Providers,setProviders]=useState(null)
const [toggleDropdown, settoggleDropdown] = useState(false)

 useEffect(() => {
const setUpProviders = async () => {
  const response = await getProviders();

  setProviders(response);
}
setUpProviders();
 }, [])
 
  return (
<nav  className="w-full flex-between mb-16 pt-3">
<Link href="/" className="flex gap-2 flex-center">
 <Image
     src="/assets/images/logo.svg"
     alt="logo"
     width={30}
     height={30}
     className="object-contain"
 />
 <p className="logo_text">Prompt-GPT</p>
 

</Link>
{/* {desktop navigation} */}
<div className="sm:flex hidden">
{ session?.user ? (
  <div className="flex gap-3 md:gap-5">
    <Link href="/create-prompt" 
    className="black_btn">Create Post</Link>
    <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
    <Link href="/profile">
      <Image
      src={session?.user.image}
         alt="profile"
         height={37}
         width={37}
         className="rounded-full"
      />
    </Link>
  </div>
):(
  <>
{
    Providers && 
    Object.values(Providers).map((provider)=>(
      <button type="button"
       key={provider.name}
       onClick={()=>signIn(provider.id)}
       className="black_btn">
        SignIn

      </button>
    ))
}
  </>
)}
</div>
{/* {mobile navigation} */}
<div className="sm:hidden flex relative">
  { session?.user ? (
    <div className="flex">

<Image
         src={session?.user.image}
         alt="profile"
         height={37}
         width={37}
         className="rounded-full"
         onClick={()=>{settoggleDropdown((prev)=>!prev)}}
      />
{toggleDropdown && 
(
  <div className="dropdown">
    <Link 
    className="dropdown_link"
    href="/profile"
    onClick={()=>settoggleDropdown(false)}

    >
My Profile
    </Link>
    <Link 
    className="dropdown_link"
    href="/creat-prompt"
    onClick={()=>settoggleDropdown(false)}

    >
      Create Prompt
    </Link>
    <button className="w-full black_btn mt-5" type="button" onClick={()=>{settoggleDropdown(false);
      signOut();}}>
        Sign Out
        </button> 
  </div>
)}
    </div>
  )
  : <>
  {
      Providers && 
      Object.values(Providers).map((provider)=>(
        <button type="button"
         key={provider.name}
         onClick={()=>signIn(provider.id)}
         className="black_btn">
          SignIn
  
        </button>
      ))
  }
    </>
    }
   </div>
</nav>
  )
}

export default Nav