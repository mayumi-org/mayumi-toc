// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useCallback } from 'react'
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
  $$hoverColor: 'rgb(127, 127, 127)',
  $$hoverTextColor: '$colors$white',
  $$textColor: 'rgb(55, 55, 55)',
  variants: {
    type: {
      dot: {
        '.toc-item-prefix': {
          display: 'inline-block',
          transition: '$colors',
          w: '$2',
          h: '$2',
          rounded: '$full',
          backgroundColor: '$$textColor',
        },
        '.toc-item-content': {
          opacity: 0,
        },
      },
      line: {
        '.toc-item-prefix': {
          display: 'inline-block',
          transition: '$colors',
          w: '$4',
          h: '$1',
          rounded: '$full',
          backgroundColor: '$$textColor',
        },
        '.toc-item-content': {
          opacity: 0,
        },
      },
      placeholder: {
        '.toc-item-prefix': {
          display: 'none',
        },
        '.toc-item-content': {
          position: 'relative',
          opacity: 1,
          '&:hover': {
            '.mayumi-text': {
              opacity: 1,
            },
            '.toc-item-placeholder': {
              opacity: 0,
            },
          },
        },
        '.mayumi-text': {
          transition: '$opacity',
          opacity: 0,
        },
        '.toc-item-placeholder': {
          position: 'absolute',
          top: 0,
          bottom: 0,
          margin: 'auto auto',
          display: 'inline-block',
          transition: '$all',
          w: '$8',
          h: '$1',
          rounded: '$full',
          backgroundColor: '$$textColor',
          opacity: 1,
        },
      },
      normal: {
        '.toc-item-prefix': {
          display: 'none',
        },
        '.toc-item-content': {
          opacity: 0,
        },
      },
    },
  },
  defaultVariants: {
    type: 'dot',
  },
  position: 'fixed',
  right: '$0',
  top: '$0',
  '.toc-item-content': {
    transition: '$opacity',
  },
  '&:hover': {
    '.toc-item-content': {
      opacity: 1,
    },
  },
  '.toc-item': {
    cursor: 'pointer',
    transition: '$colors',
    color: '$$textColor',
    display: 'flex',
    height: '$6',
    alignItems: 'center',
    gap: '$3',
    '.mayumi-text': {
      color: 'inherit',
    },
  },
  '.toc-item.active': {
    color: '$$hoverColor',
    '.toc-item-prefix': {
      backgroundColor: '$$hoverColor',
    },
    '.toc-item-placeholder': {
      backgroundColor: '$$hoverColor',
    },
  },
  '.toc-item:hover': {
    color: '$$hoverTextColor',
  },
})

const Item = ({ className, ...props }: React.LiHTMLAttributes<{}>) => {
  return (
    <li className={clsx('toc-item', className)} {...props}>
      <span className="toc-item-prefix" />
      <div className="toc-item-content">
        <div className="toc-item-placeholder" />
        {props.children}
      </div>
    </li>
  )
}

type TOCProps = {
  headings?: string[]
}

export const TOC = ({ headings = [] }: TOCProps) => {
  const activeId = useScrollSpy(headings, {
    rootMargin: '0% 0% -24% 0%',
  })
  const handleClickItem = useCallback((id: string) => {
    const el = document.querySelector(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])
  return (
    <StyledTOC type="placeholder">
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
