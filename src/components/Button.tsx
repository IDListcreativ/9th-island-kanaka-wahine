import React from 'react'

export default function Button({children, className = '', ...rest}: React.ComponentProps<'button'> & {className?: string}){
  return (
    <button {...rest} className={`px-4 py-2 rounded-md bg-emerald-500 text-white ${className}`}>{children}</button>
  )
}
