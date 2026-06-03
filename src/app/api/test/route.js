export async function GET() {
  return Response.json({
    token_status: process.env.LINE_CHANNEL_ACCESS_TOKEN ? "LOADED" : "NOT LOADED"
  })
}