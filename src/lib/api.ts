interface NoApiResponse {
    reason: string;
}

function sanitizeInput(text: string): string {
    return text
        .trim()
        .replace(/[<>]/g, '')
        .slice(0, 5000);
}

export async function getNoReason(userInput: string): Promise<string> {
    const sanitized = sanitizeInput(userInput);
    
    // No validation here - let the server handle it
    try {
        // Send input to API route for ALL processing
        const response: Response = await fetch(`/api/no?input=${encodeURIComponent(sanitized)}`);
        
        if (!response.ok) {
            throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        
        const data: NoApiResponse = await response.json();
        
        if (!data || !data.reason) {
            throw new Error('Invalid response format from API');
        }
        
        return data.reason;
    } catch (error) {
        console.error('Error fetching data from proxy: ', error);
        const fallbacks: string[] = [
            'The API is having trust issues',
            'Even the internet is saying no to this request',
            'CORS blocked us harder than a nightclub bouncer',
            'The API went out for coffee and never came back',
            'Error 404: Motivation not found',
            'The server said "no" to my "no" request. Ironic.',
            'API is down. Just like my motivation to help you right now.',
            'Error 500: The API is having an existential crisis'
        ];
        const randomResponse: string = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        return randomResponse;
    }
}