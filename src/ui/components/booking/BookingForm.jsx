import { useState } from 'react'
import { INQUIRY_SERVICES, TIME_SLOTS } from '../../../domain/inquiry/inquiry.constants'
import { todayISODate } from '../../../domain/inquiry/inquiry.schema'
import { siteConfig } from '../../../config/site.config'
import { cn } from '../../../utils/cn.util'
import { buildWhatsAppLink } from '../../../utils/whatsapp.util'
import { SUBMIT_CHANNEL, SUBMIT_STATUS } from '../../hooks/useSubmitInquiry'
import { Button } from '../common/Button'
import { Chip } from '../common/Chip'
import { FormField, Input, Select } from '../common/FormField'
import { inputClasses } from '../common/form-styles'
import { Spinner } from '../common/Spinner'
import { WhatsAppIcon } from '../icons/BrandIcons'

const EMPTY_FORM = { name: '', phone: '', service: INQUIRY_SERVICES[0], preferredDate: '', preferredTime: '', message: '' }

export function BookingForm({ booking }) {
  const { submit, status, channel, fieldErrors, errorMessage, clearFieldError } = booking
  const [values, setValues] = useState(EMPTY_FORM)
  const isSubmitting = status === SUBMIT_STATUS.SUBMITTING

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    clearFieldError(field)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const ok = await submit(values)
    if (ok) setValues(EMPTY_FORM)
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5" aria-describedby="booking-note">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="booking-name" label="Full name" error={fieldErrors.name}>
          {(a11y) => (
            <Input {...a11y} name="name" autoComplete="name" placeholder="Your name" value={values.name} onChange={update('name')} hasError={Boolean(fieldErrors.name)} />
          )}
        </FormField>
        <FormField id="booking-phone" label="Phone number" error={fieldErrors.phone}>
          {(a11y) => (
            <span
              className={cn(
                inputClasses(Boolean(fieldErrors.phone)),
                'flex items-stretch overflow-hidden p-0 focus-within:border-navy-900',
              )}
            >
              <span className="flex items-center border-r border-line-strong bg-surface px-3 text-[15px] font-semibold">+91</span>
              <input
                {...a11y}
                type="tel"
                name="phone"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="98765 43210"
                value={values.phone}
                onChange={update('phone')}
                className="min-w-0 flex-1 bg-transparent px-3.5 outline-none"
              />
            </span>
          )}
        </FormField>
        <FormField id="booking-service" label="Service" error={fieldErrors.service}>
          {(a11y) => (
            <Select {...a11y} name="service" value={values.service} onChange={update('service')} hasError={Boolean(fieldErrors.service)}>
              {INQUIRY_SERVICES.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </Select>
          )}
        </FormField>
        <FormField id="booking-date" label="Preferred date" error={fieldErrors.preferredDate}>
          {(a11y) => (
            <Input
              {...a11y}
              type="date"
              name="preferredDate"
              min={todayISODate()}
              value={values.preferredDate}
              onChange={update('preferredDate')}
              hasError={Boolean(fieldErrors.preferredDate)}
            />
          )}
        </FormField>
      </div>

      <fieldset>
        <legend className="mb-2.5 text-[13px] font-semibold">
          Time slot <span className="font-normal text-muted">(optional)</span>
        </legend>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
          {TIME_SLOTS.map((slot) => (
            <Chip
              key={slot}
              pressed={values.preferredTime === slot}
              onClick={() => setValues((current) => ({ ...current, preferredTime: current.preferredTime === slot ? '' : slot }))}
              className="px-1 text-xs sm:px-4 sm:text-sm"
            >
              {slot}
            </Chip>
          ))}
        </div>
        {fieldErrors.preferredTime && <p className="mt-1.5 text-[13px] font-medium text-danger">{fieldErrors.preferredTime}</p>}
      </fieldset>

      {errorMessage && (
        <div role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
          {errorMessage}{' '}
          <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="font-bold underline">
            Book on WhatsApp instead
          </a>
        </div>
      )}

      <Button type="submit" size="lg" fullWidth disabled={isSubmitting} className="mt-1">
        {isSubmitting && <Spinner />}
        {channel === SUBMIT_CHANNEL.WHATSAPP && <WhatsAppIcon size={20} />}
        {isSubmitting ? 'Booking…' : channel === SUBMIT_CHANNEL.WHATSAPP ? 'Book via WhatsApp' : 'Book Eye Test'}
      </Button>
      <p id="booking-note" className="text-center text-[13px] text-muted">
        Prefer to talk? Call or WhatsApp{' '}
        <a href={`tel:${siteConfig.phone.e164}`} className="font-semibold text-navy-900">
          {siteConfig.phone.display}
        </a>
      </p>
    </form>
  )
}
