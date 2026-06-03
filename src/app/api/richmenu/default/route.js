export async function GET() {

  const richMenuId = "richmenu-858f0def47466aedb2d48726080eba75"

  const res = await fetch(
    `https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
      }
    }
  )

  const text = await res.text()

  return Response.json({
    success: true,
    result: text
  })
}