import React from 'react'
import { TOC } from '@mayumi-org/toc'

const headings = [
  { title: 'Intro', id: 'intro' },
  { title: 'Goals', id: 'goals' },
  { title: 'Functions', id: 'functions' },
  { title: 'Stacks', id: 'stacks' },
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, veritatis.',
    id: 'get-started',
  },
  { title: 'Last', id: 'last' },
]

const Home = () => {
  return (
    <div className="grid grid-cols-12 h-screen overflow-y-scroll bg-black">
      <div className="col-start-1 col-end-10">
        {headings.map((h) => {
          return (
            <div className="h-1/3" key={h.id}>
              <h1 className="text-white text-lg" id={h.id}>
                {h.title}
              </h1>
            </div>
          )
        })}
      </div>
      <div className="col-start-11 col-end-13">
        <TOC className="sticky top-0" type="placeholder" headings={headings} />
      </div>
    </div>
  )
}

export default Home
