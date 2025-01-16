import React from "react"

export function GridBackground({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full bg-white/90 dark:bg-slate-800 dark:bg-grid-white/[0.2] bg-grid-black/[0.2] md:h-screen overflow-x-clip flex justify-center items-center'>
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
      {children}
    </div>
  )
}
