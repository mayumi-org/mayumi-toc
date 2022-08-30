# @mayumi-org/toc

## install

```console
pnpm i @mayumi-org/toc mayumi
```

## usage

```tsx
import React from 'react'
import { TOC } from '@mayumi-org/toc'

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
    <TOC css={{ position: 'fixed' }} headings={headings} />
  )
}

export default Home
```