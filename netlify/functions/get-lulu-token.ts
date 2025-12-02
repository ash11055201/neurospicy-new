import { Handler } from '@netlify/functions'
import fetch from 'node-fetch' // Make sure node-fetch is installed

interface LuluTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  scope?: string
  [key: string]: any
}

export const handler: Handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
      body: '',
    }
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    // Lulu OAuth requires client_credentials grant
    const formData = new URLSearchParams({ grant_type: 'client_credentials' }).toString()

    const response = await fetch(
      'https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic YzhhZWYzMzItZDRkMy00NjRkLTlhNmMtMTQ5M2EzOTQyY2RkOkt0TXA3THlSaFlrVHFhVXdqNENsSzN6bFQxS0FFbVRp`, // store securely
        },
        body: formData,
      }
    )

    if (!response.ok) {
      const text = await response.text()
      return {
        statusCode: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: text }),
      }
    }

    const data: LuluTokenResponse = await response.json() as LuluTokenResponse

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: data.access_token, expiresIn: data.expires_in }),
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get Lulu token'
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: errorMessage }),
    }
  }
}
