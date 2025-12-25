"use client"

import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap/all'
import { useRouter } from 'next/navigation'


const NavProgress = () => {
  const navBar = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [loadingProgress, setLoadingProgress] = useState<number>(0)

  
  useGSAP(()=>{
    if(!navBar.current) return
    const element = navBar.current
    const tl = gsap.timeline();

    tl.to(element,{
      width:`${loadingProgress}%`,
      transformOrigin:'left center',
      duration:0.3,
      ease:'none',
    })
    tl.to(element,{
      delay:1,
    })
    tl.call(()=>setLoadingProgress((prev)=>{
      if(prev <= 85){
        return prev + Math.random()*10
      }
      return prev
    }))
    if(loadingProgress >= 100){
      tl.to(element,{
        delay:0,
        width:`0%`,
        duration:0,
      })
    }
    return ()=>{
      tl.kill()
    }

  },[loadingProgress])


  return (
    <div ref={navBar} className={`w-0 h-0.5 bg-linear-to-r to-[#890000] to-50% from-[#d8a74b] absolute bottom-0 left-0 z-20 `} >
      
    </div>
  )
}

export default NavProgress
