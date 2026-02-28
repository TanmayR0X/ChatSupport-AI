'use client'
import React, { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion, testValueType } from 'motion/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
function HomeClient({ email }: { email: string }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node))
        setOpenModal(false);
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleLogin = () => {
    setLoading(true);
    window.location.href = "/api/auth/login"
  }
  const handleLogout = async () => {
    try {
      const result = await axios.get("/api/auth/logout");
      window.location.href="/"
    } catch (error) {
      console.log(error);
    }
  }
  const firstLetter = email ? email[0].toUpperCase() : "";

  const features = [
    {
      title: "Plug & Play",
      desc: "Add the chatbot to your website with single script tag."
    },
    {
      title: "Admin Controlled",
      desc: "You control exactly what the AI knows and answers."
    },
    {
      title: "Always Online",
      desc: "Your customers get instant support 24/7."
    },
  ]
  return (
    <div className='min-h-screen bg-linear-to-br from-white to-gray-50 text-gray-900 overflow-x-hidden'>
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200'
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-wide bg-linear-to-r from-gray-800 via-gray-600 to-gray-700 bg-clip-text text-transparent uppercase">ChatSupport <span className='text-gray-400'>Ai</span></div>
          {email ? <div className='relative' ref={popupRef}>
            <button onClick={() => setOpenModal(!openModal)} className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition cursor-pointer'>{firstLetter}</button>
            <AnimatePresence>
              {openModal && (<motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className='absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden'>
                <button className='w-full text-left px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer' onClick={() => navigate.push("/dashboard")}>Dashboard</button>
                <button className='w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100 cursor-pointer' onClick={handleLogout}>Logout</button>
              </motion.div>)}
            </AnimatePresence>
          </div> : <button
            className='px-5 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition disabled:opacity-60 flex items-center gap-2 cursor-pointer'
            disabled={loading}
            onClick={handleLogin}
          >{loading?"Logging in..": "Login"}</button>}
        </div>
      </motion.nav>
      <section className='pt-36 pb-28 px-6'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className='text-4xl md:text-5xl font-semibold leading-tight
            '>AI Customer Support <br /> Build for Modern Websites</h1>
            <p className='mt-6 text-lg text-gray-600 max-w-xl'>Add a powerful AI chatbot to your website in minutes.
              Let your customers get instant answers using your own buisness knowledge.
            </p>
            <div className='mt-10 flex gap-4'>
              {email ? <button className='px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-900 transition disabled:opacity-60 cursor-pointer' onClick={() => navigate.push("/dashboard")}>Go to Dashboard</button> : <button className='px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-900 transition disabled:opacity-60 cursor-pointer'
                onClick={handleLogin}
              >Get Started</button>}
              <a href='#features' className='px-7 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer'>Learn More</a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative">
            <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 p-6">
              <div className='text-sm text-gray-500 mb-3'>Live Chat Preview</div>
              <div className='space-y-4'>
                <div className='bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit'>Is Return Possible?</div>
                <div className='bg-gray-100 rounded-lg px-4 py-2 text-sm w-fit'>Yes Return is possible within 7 days.</div>
              </div>
              <motion.div
              animate={{y:[0,-12,0]}}
              transition={{repeat:Infinity, duration:3}}
              className='absolute -bottom-5 -right-5 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl'
              >
                🗨️
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <section id='features' className='bg-gray-50 py-28 px-6 border-t border-gray-200'>
        <div className="max-w-6xl mx-auto">
          <motion.h2
          initial={{opacity:0, y:20}}
          whileInView={{opacity:1, y:0}}
          viewport={{once:false}}
          transition={{duration:0.6}}
          className='text-3xl font-semibold text-center'
          >
            Why Businesses Choose ChatSupport AI
          </motion.h2>
          <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-10'>
            {features.map((feature, index) => (
              <motion.div
              key={index}
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              transition={{delay: index * 0.1}}
              viewport={{once: false}}
              className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'
              >
                <h1 className='text-lg font-medium'>{feature.title}</h1>
                <p className='mt-3 text-gray-600 text-sm'>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <footer className='py-10 text-center text-base text-gray-500'>
        &copy; {new Date().getFullYear()} ChatSupport AI. All rights reserved.
      </footer>
    </div>
  )
}

export default HomeClient