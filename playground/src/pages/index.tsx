import React from 'react'
import { TOC } from 'mayumi-toc'

const Home = () => {
  return (
    <div className="h-screen overflow-y-scroll bg-black">
      <TOC />
      <div className="h-screen">
        <h1 className="text-white text-lg" id="title-1">
          title-1
        </h1>
      </div>
      <div className="h-screen">
        <h2 className="text-white text-lg" id="title-2">
          title-2
        </h2>
      </div>
    </div>
  )
}

export default Home
