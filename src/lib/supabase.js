import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mbdwfdhseagojrvbqqaq.supabase.co'
const supabaseKey = 'sb_publishable_444YhvaiYTaWlUGOn_0s_w_tVKERi7Q'

export const createClient = () => {
  return createClient(supabaseUrl, supabaseKey)
}