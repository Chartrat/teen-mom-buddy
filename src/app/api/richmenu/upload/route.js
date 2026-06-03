import fs from "fs"
import path from "path"

export async function GET() {

  const richMenuId = "richmenu-858f0def47466aedb2d48726080eba75"

  const imagePath = path.join(process.cwd(), "public/richmenu-main.png")

  const imageBuffer = fs.readFileSync(imagePath)

  const res = await fetch(
    `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        "Content-Type": "image/png"
      },
      body: imageBuffer
    }
  )

  const text = await res.text()

  return Response.json({
    success: true,
    result: text
  })
}