// // app/api/no/route.ts
// // export async function GET() {
// //     try {
// //         const response = await fetch("https://naas.isalman.dev/no");
        
// //         if (!response.ok) {
// //             throw new Error(`HTTP error! status: ${response.status}`);
// //         }
        
// //         const data = await response.json();
// //         return Response.json(data);
// //     } catch (error) {
// //         console.error("Error Fetching From NAAS: ", error);
// //         return Response.json(
// //             { error: "Failed to fetch from NAAS" },
// //             { status: 500 }
// //         );
// //     }
// // }
// // app/api/no/route.ts
// import { NextRequest } from 'next/server';

// // Simple rate limiter
// const requests = new Map<string, number[]>();

// function checkRateLimit(ip: string): boolean {
//     const now = Date.now();
//     const windowMs = 60000; // 1 minute
//     const maxRequests = 20; // 20 requests per minute (generous)
    
//     const userRequests = requests.get(ip) || [];
//     const recentRequests = userRequests.filter(time => now - time < windowMs);
    
//     if (recentRequests.length >= maxRequests) {
//         return false;
//     }
    
//     recentRequests.push(now);
//     requests.set(ip, recentRequests);
//     return true;
// }

// export async function GET(request: NextRequest) {
//     const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
//     // Rate limit check
//     if (!checkRateLimit(ip)) {
//         return Response.json(
//             { reason: "Whoa there! Even I need a break. Try again in a minute. No." },
//             { status: 429 }
//         );
//     }
    
//     try {
//         // Timeout after 5 seconds
//         const response = await fetch("https://naas.isalman.dev/no", {
//             signal: AbortSignal.timeout(5000)
//         });
        
//         if (!response.ok) {
//             throw new Error(`API error: ${response.status}`);
//         }
        
//         const data = await response.json();
//         return Response.json(data);
        
//     } catch (error) {
//         console.error("NAAS API error:", error);
        
//         // Friendly fallback
//         const fallbacks = [
//             'The API is taking a nap. But the answer is still no.',
//             'Connection timeout. No. (That was quick, right?)',
//             'The internet said no to my request for a "no". So... yes? Just kidding. No.',
//         ];
        
//         return Response.json(
//             { reason: fallbacks[Math.floor(Math.random() * fallbacks.length)] },
//             { status: 200 } // Return 200 so the UI doesn't show error state
//         );
//     }
// }
// app/api/no/route.ts
import { NextRequest } from 'next/server';

// Helper function to get IP address
function getClientIp(request: NextRequest): string {
    // Try multiple headers in order of preference
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
    
    if (forwarded) {
        // x-forwarded-for can contain multiple IPs, take the first one
        return forwarded.split(',')[0].trim();
    }
    
    if (realIp) {
        return realIp.trim();
    }
    
    if (cfConnectingIp) {
        return cfConnectingIp.trim();
    }
    
    // Fallback to a default identifier
    return 'anonymous';
}

// Simple rate limiter
const requests = new Map<string, number[]>();

function checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxRequests = 20; // 20 requests per minute
    
    const userRequests = requests.get(identifier) || [];
    const recentRequests = userRequests.filter(time => now - time < windowMs);
    
    if (recentRequests.length >= maxRequests) {
        return false;
    }
    
    recentRequests.push(now);
    requests.set(identifier, recentRequests);
    
    // Cleanup old entries (prevent memory leak)
    if (requests.size > 1000) {
        const oldestAllowed = now - windowMs;
        for (const [key, times] of requests.entries()) {
            const validTimes = times.filter(t => t > oldestAllowed);
            if (validTimes.length === 0) {
                requests.delete(key);
            } else {
                requests.set(key, validTimes);
            }
        }
    }
    
    return true;
}

export async function GET(request: NextRequest) {
    const clientIp = getClientIp(request);
    
    // Rate limit check
    if (!checkRateLimit(clientIp)) {
        return Response.json(
            { reason: "Whoa there! Even I need a break. Try again in a minute. No." },
            { status: 429 }
        );
    }
    
    try {
        // Timeout after 5 seconds
        const response = await fetch("https://naas.isalman.dev/no", {
            signal: AbortSignal.timeout(5000)
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        return Response.json(data);
        
    } catch (error) {
        console.error("NAAS API error:", error);
        
        // Friendly fallback
        const fallbacks = [
            'The API is taking a nap. But the answer is still no.',
            'Connection timeout. No. (That was quick, right?)',
            'The internet said no to my request for a "no". So... yes? Just kidding. No.',
        ];
        
        return Response.json(
            { reason: fallbacks[Math.floor(Math.random() * fallbacks.length)] },
            { status: 200 }
        );
    }
}