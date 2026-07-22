import React from 'react'

export default function Modal({open, onClose, children}:{open:boolean, onClose:()=>void, children:React.ReactNode}){
  if(!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-slate-500">Close</button>
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  )
}
