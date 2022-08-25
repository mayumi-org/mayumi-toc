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
  variants: {
    type: {
      dot: {
        $$hoverColor: '$colors$white',
        $$textColor: '$colors$gray',
        '.toc-dot': {
          display: 'inline-block',
          transition: '$colors',
          w: '$2',
          h: '$2',
          rounded: '$full',
          backgroundColor: '$gray',
        },
      },
      normal: {
        $$hoverColor: '$colors$white',
        $$textColor: '$colors$gray',
        '.toc-dot': {
          display: 'none',
        },
      },
    },
  },
  defaultVariants: {
    type: 'dot',
  },
  // TODO: configable
  position: 'fixed',
  right: '$0',
  top: '$0',
  '.mayumi-text': {
    opacity: 0,
  },
  '&:hover': {
    '.mayumi-text': {
      opacity: 1,
    },
  },
  '.toc-item': {
    cursor: 'pointer',
    transition: '$colors',
    color: '$$textColor',
    display: 'flex',
    alignItems: 'center',
    gap: '$1',
    '.mayumi-text': {
      color: 'inherit',
    },
  },
  '.toc-item.active': {
    color: '$$hoverColor',
    '.toc-dot': {
      backgroundColor: '$white',
    },
  },
  '.toc-item:hover': {
    color: '$$hoverColor',
  },
})

const Item = ({ className, ...props }: React.LiHTMLAttributes<{}>) => {
  return (
    <li className={clsx('toc-item', className)} {...props}>
      <span className="toc-dot" />
      {props.children}
    </li>
  )
}

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
            <Item
              className={clsx({ active: `#${activeId}` === h })}
              onClick={() => handleClickItem(h)}
              key={h}
            >
              <Text p={true} size="sm">
                {h}
              </Text>
            </Item>
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
