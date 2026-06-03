export async function GET() {

  const res = await fetch("https://api.line.me/v2/bot/richmenu", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      size: {
        width: 2500,
        height: 1686
      },
      selected: true,
      name: "MAIN MENU",
      chatBarText: "เมนูหลัก",
      areas: [
        {
          bounds: {
            x: 0,
            y: 0,
            width: 1250,
            height: 843
          },
          action: {
            type: "message",
            text: "แม่หลังคลอด"
          }
        },
        {
          bounds: {
            x: 1250,
            y: 0,
            width: 1250,
            height: 843
          },
          action: {
            type: "message",
            text: "ครอบครัว"
          }
        },
        {
          bounds: {
            x: 0,
            y: 843,
            width: 1250,
            height: 843
          },
          action: {
            type: "message",
            text: "อสม."
          }
        },
        {
          bounds: {
            x: 1250,
            y: 843,
            width: 1250,
            height: 843
          },
          action: {
            type: "message",
            text: "บุคลากร"
          }
        }
      ]
    })
  })

  const data = await res.json()

  return Response.json({
    success: true,
    richMenuId: data.richMenuId,
    raw: data
  })
}