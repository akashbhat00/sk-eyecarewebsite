import { cn } from '../../../utils/cn.util'
import { inputClasses } from './form-styles'

/** Label + control + error message. `children` receives the ids it needs for accessibility. */
export function FormField({ id, label, error, className, children }) {
  const errorId = `${id}-error`
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-[13px] font-semibold">
        {label}
      </label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': error ? errorId : undefined })}
      {error && (
        <p id={errorId} className="text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export function Input({ hasError, className, ...rest }) {
  return <input className={cn(inputClasses(hasError), className)} {...rest} />
}

export function Select({ hasError, className, children, ...rest }) {
  return (
    <select className={cn(inputClasses(hasError), 'px-3', className)} {...rest}>
      {children}
    </select>
  )
}
