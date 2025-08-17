import { cva } from 'class-variance-authority'

// 前缀样式（点或线）
export const prefixStyles = cva(
  ['transition-colors', 'rounded-full', 'bg-[rgb(55,55,55)]'],
  {
    variants: {
      type: {
        dot: ['inline-block', 'w-2', 'h-2'],
        line: ['inline-block', 'w-4', 'h-1'],
        placeholder: ['hidden'],
        normal: ['hidden'],
      },
      isActive: {
        true: ['bg-[rgb(127,127,127)]'],
      },
    },
    defaultVariants: {
      type: 'dot',
    },
  }
)

// 内容区域样式
export const contentStyles = cva(
  ['transition-opacity'],
  {
    variants: {
      type: {
        dot: ['opacity-0'],
        line: ['opacity-0'],
        placeholder: [
          'relative',
          'opacity-100',
        ],
        normal: ['opacity-0'],
      },
    },
    defaultVariants: {
      type: 'dot',
    },
  }
)

// 占位符样式
export const placeholderStyles = cva(
  [
    'absolute',
    'inset-y-0',
    'my-auto',
    'inline-block',
    'transition-all',
    'w-8',
    'h-1',
    'rounded-full',
    'bg-[rgb(55,55,55)]',
    'opacity-100',
  ],
  {
    variants: {
      isActive: {
        true: ['bg-[rgb(127,127,127)]'],
      },
    },
  }
)

// 文本样式
export const textStyles = cva(
  ['transition-opacity', 'text-inherit'],
  {
    variants: {
      type: {
        placeholder: ['opacity-0'],
        dot: [],
        line: [],
        normal: [],
      },
    },
  }
)

// TOC 项样式
export const tocStyles = cva(
  [
    'cursor-pointer',
    'transition-colors',
    'flex',
    'h-6',
    'items-center',
    'gap-3',
    'text-[rgb(55,55,55)]',
    'hover:text-white',
  ],
  {
    variants: {
      isActive: {
        true: ['text-[rgb(127,127,127)]'],
      },
    },
  }
)

// TOC 容器样式
export const tocContainerStyles = cva(
  [
    'right-0',
    'top-0',
  ],
  {
    variants: {},
  }
)