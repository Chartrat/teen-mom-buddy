import { createClient } from "../../../../lib/supabase.js"
import { RICHMENUS } from "../../../../lib/richmenus"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  const { userId, role } = await req.json()

  const richMenuId = RICHMENUS[role]

  // save DB
  await supabase.from("users").upsert({
    line_user_id: userId,
    role_current: role
  })

  // unlink old menu
  await fetch(
    `https://api.line.me/v2/bot/user/${userId}/richmenu`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
      }
    }
  )

  // link new menu
  const res = await fetch(
    `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
      }
    }
  )

  const result = await res.text()

  return Response.json({
    success: true,
    role,
    richMenuId,
    lineResult: result
  })
}