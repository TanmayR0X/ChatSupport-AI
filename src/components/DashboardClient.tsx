'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
function DashboardClient({ ownerId }: { ownerId: String }) {
  const navigate = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleSettings = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/settings", {ownerId, businessName,supportEmail, knowledge});
      console.log(result.data);
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false),3000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(ownerId) {
      const handleGetDetails = async () => {
        try {
      const result = await axios.post("/api/settings/get", {ownerId});
      setBusinessName(result.data.businessName);
      setSupportEmail(result.data.supportEmail);
      setKnowledge(result.data.knowledge);
    } catch (error) {
      console.log(error);
    }
      }
      handleGetDetails();
    }
  }, [ownerId])
  
  return (
    <div className='min-h-screen bg-gray-50 text-gray-900'>
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200'
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-wide bg-linear-to-r from-gray-800 via-gray-600 to-gray-700 bg-clip-text text-transparent uppercase cursor-pointer" onClick={() => navigate.push("/")}>ChatSupport <span className='text-gray-400'>Ai</span></div>
          <button className='px-4 py-3 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition cursor-pointer' onClick={() => navigate.push("/embed")}>Embed Chatbot</button>
        </div>
      </motion.nav>

      <div className='flex justify-center px-4 py-14 mt-25'>
        <motion.div
          className='w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10'
        >
          <div className='mb-10'>
            <h1 className='text-2xl font-semibold'>Chatbot Settings</h1>
            <p className='text-gray-600 mt-1'>Manage your AI chatbot knowledge and business details</p>
          </div>
          <div className='mb-10'>
            <h1 className='text-lg font-medium mb-4'>Business Details</h1>
            <div className="space-y-4">
              <input type="text" className='w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80' placeholder='Business Name' value={businessName} onChange={(e) => setBusinessName(e.target.value)}/>
              <input type="email" className='w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80' placeholder='Support Email' value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)}/>
            </div>
          </div>
          <div className='mb-10'>
            <h1 className='text-lg font-medium mb-4'>Knowledge base</h1>
            <p className='text-sm text-gray-600 mb-4'>Add FAQs, policies, delivery info, refunds, etc</p>
            <div className="space-y-4">
              <textarea className='w-full h-54 rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80' placeholder={`Example:
• Refund policy: 7 days return available
• Delivery time: 3–5 working days
• Cash on Delivery available
• Support hours `} value={knowledge}  onChange={(e) => setKnowledge(e.target.value)}/>
            </div>
          </div>

          <div className='flex items-center gap-5'>
            <motion.button 
            whileHover={{scale: 1.03}}
            whileTap={{scale:0.97}}
            className='px-7 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition disabled:opacity-60 cursor-pointer'
            disabled={loading}
            onClick={handleSettings}
            >{loading? "saving....":"Save"}</motion.button>
            {saved && <motion.span
        initial={{opacity:0, y:6}}
        animate={{opacity:1, y:0}}
        className='text-sm font-medium text-green-600'
        >
         ✓ Settings Saved
        </motion.span> }
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardClient