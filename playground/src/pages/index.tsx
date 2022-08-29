import React from 'react'
import { TOC } from '@mayumi/toc'

const headings = [
  { title: 'Intro', id: 'intro' },
  { title: 'Goals', id: 'goals' },
  { title: 'Functions', id: 'functions' },
  { title: 'Stacks', id: 'stacks' },
  { title: 'Get Started', id: 'get-started' },
  { title: 'Last', id: 'last' },
]

const Home = () => {
  return (
    <div className="h-screen overflow-y-scroll bg-black">
      <TOC css={{ position: 'fixed' }} headings={headings} />
      <>
        {headings.map((h) => {
          return (
            <div className="h-1/3" key={h.id}>
              <h1 className="text-white text-lg" id={h.id}>
                {h.title}
              </h1>
            </div>
          )
        })}
      </>
    </div>
  )
}

export default Home
