import { ResponseToolkit, Request } from "@hapi/hapi"
import { searchAll } from "../services/swapiService"

export default async (request: Request, h: ResponseToolkit) => {
  const { q } = request.query as { q: string }
  try {
    const results = await searchAll(q)
    return h.response(results).code(200)
  } catch (err) {
    console.error(err)
    return h
      .response({ error: "Internal Error in search controller" })
      .code(500)
  }
}
