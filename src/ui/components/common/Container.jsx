import { cn } from '../../../utils/cn.util'

export function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1440px] px-4 md:px-8 xl:px-20', className)} {...rest}>
      {children}
    </Tag>
  )
}
