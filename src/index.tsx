// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useCallback, useEffect, useMemo } from 'react'
import clsx from 'clsx'
import { 
  tocStyles, 
  tocContainerStyles, 
  prefixStyles, 
  contentStyles,
  placeholderStyles,
  textStyles
} from './styles'

function useScrollSpy(selectors: string[], options?: IntersectionObserverInit) {
  const [activeIds, setActiveIds] = React.useState<Record<string, boolean>>({})
  const observer = React.useRef<IntersectionObserver>()
  useEffect(() => {
    const elements = selectors.map((selector) => document.querySelector(selector))
    if (observer.current) {
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveIds((prev) => ({ ...prev, [entry.target.getAttribute('id')!]: true }))
        } else {
          setActiveIds((prev) => ({ ...prev, [entry.target.getAttribute('id')!]: false }))
        }
      })
    }, options)
    elements.forEach((el) => observer.current?.observe(el!))
    return () => observer.current?.disconnect()
  }, [selectors, options])

  const activeSelector = selectors.find((s) => activeIds[s.slice(1)])

  return activeSelector?.slice(1)
}

const Item = ({ className, type, isActive, ...props }: React.LiHTMLAttributes<{}> & { type?: 'dot' | 'line' | 'placeholder' | 'normal', isActive?: boolean }) => {
  return (
    <li className={clsx('toc-item', tocStyles({ isActive }), 'group', className)} {...props}>
      <span className={clsx('toc-item-prefix', prefixStyles({ type, isActive }))} />
      <div className={clsx('toc-item-content', contentStyles({ type, isActive }))}>
        <div className={clsx('toc-item-placeholder', placeholderStyles({ type, isActive }))} />
        {props.children}
      </div>
    </li>
  )
}

type TOCProps = {
  headings?: {
    title: string
    id: string
  }[]
  type?: 'dot' | 'line' | 'placeholder' | 'normal'
  className?: string
}

const options = {
  rootMargin: '0% 0% -24% 0%',
}

export const TOC = ({ headings = [], type = 'dot', className, ...props }: TOCProps) => {
  const selectors = useMemo(() => headings.map((h) => `#${h.id}`), [headings])
  const activeId = useScrollSpy(selectors, options)
  const handleClickItem = useCallback((id: string) => {
    const el = document.querySelector(`#${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])
  return (
    <div className={clsx(tocContainerStyles(), className)} {...props}>
      <ul>
        {headings.map((h) => {
          return (
            <Item
              type={type}
              isActive={activeId === h.id}
              onClick={() => handleClickItem(h.id)}
              key={h.id}
            >
              <p className={textStyles({ type })}>
                {h.title}
              </p>
            </Item>
          )
        })}
      </ul>
    </div>
  )
}