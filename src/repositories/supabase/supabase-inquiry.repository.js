import { INQUIRY_STATUS } from '../../domain/inquiry/inquiry.constants'
import { INQUIRY_COLUMNS, INQUIRY_TABLE, toInquiry, toInquiryInsertRow } from './models/inquiry.row'
import { throwIfError, toAppErrorFromSupabase } from './supabase-error.mapper'

/**
 * @param {() => Promise<import('@supabase/supabase-js').SupabaseClient>} getClient
 * @returns {import('../interfaces/inquiry.repository').InquiryRepository}
 */
export function createSupabaseInquiryRepository(getClient) {
  async function table() {
    return (await getClient()).from(INQUIRY_TABLE)
  }

  async function run(buildQuery) {
    try {
      return throwIfError(await buildQuery(await table()))
    } catch (error) {
      throw toAppErrorFromSupabase(error)
    }
  }

  return {
    async create(data) {
      // No .select(): RLS lets visitors insert but never read rows back.
      await run((t) => t.insert(toInquiryInsertRow(data)))
      return null
    },

    async findAll({ status } = {}) {
      const rows = await run((t) => {
        const query = t.select(INQUIRY_COLUMNS).order('created_at', { ascending: false })
        return status ? query.eq('status', status) : query
      })
      return rows.map(toInquiry)
    },

    async findById(id) {
      const row = await run((t) => t.select(INQUIRY_COLUMNS).eq('id', id).maybeSingle())
      return row ? toInquiry(row) : null
    },

    async updateStatus(id, status) {
      const row = await run((t) => t.update({ status }).eq('id', id).select(INQUIRY_COLUMNS).single())
      return toInquiry(row)
    },

    async countByStatus() {
      const counts = await Promise.all(
        Object.values(INQUIRY_STATUS).map(async (status) => {
          const { count, error } = await (await table())
            .select('id', { count: 'exact', head: true })
            .eq('status', status)
          if (error) throw toAppErrorFromSupabase(error)
          return [status, count ?? 0]
        }),
      )
      return Object.fromEntries(counts)
    },
  }
}
