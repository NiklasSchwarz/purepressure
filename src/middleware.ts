import { NextRequest, NextResponse, userAgent } from "next/server";

/**
 * allowed origins for requests
 * TODO: remove localhost
 */
const allowedOrigins = ['https://www.atbs.de', 'https://atbs.de', 'http://localhost:3000']
const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

/**
 * function to interact with http responses and request
 * added security features
 */
export function middleware(req: NextRequest) {
    // check if bots
    if(userAgent(req).isBot) {
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }

    // analyzes user session to get informations
    sessionAnalytics(req)

    /**
     * cors
     */
    const requestOrigin = req.headers.get('origin') ?? ''
    const isAllowedOrigin = allowedOrigins.includes(requestOrigin)

    // handle preflight requests
    const isPreflight = req.method === 'OPTIONS'

    if(isPreflight) {
        const preflightHeaders = {
            ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': requestOrigin }),
            ...corsOptions,
        }
        return NextResponse.json({}, { headers: preflightHeaders })
    }

    // handle simple request
    const response = NextResponse.next()

    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', requestOrigin)
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value)
    })

    return response
}

/**
 * Path whitelist
 */
//export const config = {
//    matcher: ['/', '*'],
//}

/**
 * get informations about searching behavior of user
 * based on userAgent and Referer-Header
 * @param request HTTP-Request which will be analyzed
 */
function sessionAnalytics(request: NextRequest) {
    return
    /**
     * analytics based on userAgent
     */
    const { device, browser } = userAgent(request)

    if(device.type === 'mobile') {

    } else {

    }

    /**
     * analytics based on referer header
     */
    const refererHeader = request.headers.get('referer') ?? ''
    
    if (!refererHeader.includes('atbs.de') && refererHeader != '') {
        // add new page visit and referer destination
    }
}