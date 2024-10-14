import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // クエリパラメータで指定された挨拶を用いる
  const greeting = event.queryStringParameters?.greeting ?? 'Hello'

  // 環境変数で指定された名前を用いる
  const name = process.env.APP_GREETING_NAME ?? 'World'

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${greeting}, ${name}!`,
    }),
  }
}
