import React from 'react'
import clsx from 'clsx'
import { styled } from 'mayumi/theme'
import { Text } from 'mayumi/text'

function useScrollSpy(selectors: string[], options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = React.useState<string>()
  const observer = React.useRef<IntersectionObserver>()
  React.useEffect(() => {
    const elements = selectors.map((selector) => document.querySelector(selector))
    if (observer.current) {
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.getAttribute('id')!)
        }
      })
    }, options)
    elements.forEach((el) => observer.current?.observe(el!))
    return () => observer.current?.disconnect()
  }, [selectors, options])

  return activeId
}

const StyledTOC = styled('div', {
  // TODO: configable
  position: 'fixed',
  right: '$0',
  top: '$0',
  '.item': {
    cursor: 'pointer',
    transition: '$colors',
    color: '$gray',
  },
  '.item.active': {
    color: '$white',
  },
})

const headings = ['#title-1', '#title-2']

const TOC = () => {
  const activeId = useScrollSpy(headings, {
    rootMargin: '0% 0% -24% 0%',
  })
  const handleClickItem = (id: string) => {
    const el = document.querySelector(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
  console.log(`#${activeId}`)
  return (
    <StyledTOC>
      <ul>
        {headings.map((h) => {
          return (
            <li onClick={() => handleClickItem(h)} key={h}>
              <Text className={clsx('item', { active: `#${activeId}` === h })} p={true} size="sm">
                {h}
              </Text>
            </li>
          )
        })}
      </ul>
    </StyledTOC>
  )
}

const Home = () => {
  return (
    <div className="h-screen overflow-y-scroll bg-red-400">
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
