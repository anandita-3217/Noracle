// // api.ts
// interface NoApiResponse{
//     reason: string;
// }
function isGibberish(text: string) : boolean {
    const trimmed = text.trim();
    // Too short or too long
    if (trimmed.length < 2 || trimmed.length > 5000) return true;
    // Count vowels and consonants
    const vowels = trimmed.match(/[AEIOUaeiou]/g)?.length || 0;
    const consonants = trimmed.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g)?.length || 0;
    // If there are letters, check vowel ratio
    const letters = vowels + consonants;
    if (letters>0){
        const vowelRatio = vowels / letters;
        // Gibberish usually has very low vowel ratio (< 25%) or very high (> 50%)
        if (vowelRatio < 0.25 || vowelRatio > 0.50) return true;
    }
    // Check for excessive repeated characters (e.g., "aaaaaaa", "hahahaha")
    const repeatedChars = /(.)\1{4,}/g;
    if (repeatedChars.test(trimmed)) return true;
    // Check for keyboard patterns (qwerty row patterns)
    const keyboardPatterns = [
        /qwert/i, /asdfg/i, /zxcvb/i,
        /poiuy/i, /lkjhg/i, /mnbvc/i,
        /qazwsx/i, /plmokn/i, /1234/
    ];
    if (keyboardPatterns.some(pattern => pattern.test(trimmed))) return true;
    
    // Check for random character spam (more than 50% non-alphanumeric)
    const specialChars = trimmed.match(/[^a-zA-Z0-9\s]/g)?.length || 0;
    if (specialChars / trimmed.length > 0.5) return true;
    
    // Check if it's just numbers or just special characters
    if (/^[0-9]+$/.test(trimmed) || /^[^a-zA-Z0-9\s]+$/.test(trimmed)) return true;
    
    return false;
}
// export async function  getNoReason(userInput: string): Promise<string> {
//     if(userInput && isGibberish(userInput)){
//         const gibberishResponses: string[] =[
//             'Are you ok?',
//             'No. I refuse to dignify that keyboard smash with a proper response.',
//             'Did you just fall asleep on your keyboard? The answer is still no.',
//             'I don\'t speak gibberish, but I do speak "absolutely not".',
//             'That\'s not even a question. Next!',
//             'Your cat walked across the keyboard again, didn\'t it? No.',
//             'Error 400: Bad Request. Translation: NO.',
//             'I\'ve seen better sentences from a random number generator. No.',
//             'Let me translate that gibberish for you: "Will you say no?" Yes, I will. No.'
//         ];
//         return gibberishResponses[Math.floor(Math.random()*gibberishResponses.length)];
//     }
//     try{
//         const response: Response = await fetch('/api/no');
//         if (!response.ok){
//             throw new Error(`API returned ${response.status}: ${response.statusText}`);
//         }
//         const data: NoApiResponse = await response.json();
//         if(!data || !data.reason){
//             throw new Error('Invalid response format form API');
//         }
//         return data.reason;
//     }catch(error){
//         console.error('Error fetching data from proxy: ',error);
//         const fallbacks: string[] = [
//             'The API is having trust issues',
//             'Even the internet is saying no to this request',
//             'CORS blocked us harder than a nightclub bouncer',
//             'The API went out for coffee and never came back',
//             'Error 404: Motivation not found',
//             'The server said "no" to my "no" request. Ironic.',
//             'API is down. Just like my motivation to help you right now.',
//             'Error 500: The API is having an existential crisis'
//         ];
//         const randonResponse: string = fallbacks[Math.floor(Math.random()*fallbacks.length)];
//         return randonResponse;
//     }
// }



// lib/api.ts - Enhanced validation
function sanitizeInput(text: string): string {
    return text
        .trim()
        .replace(/[<>]/g, '') // Remove HTML brackets
        .slice(0, 5000);      // Max 5000 chars
}

export async function getNoReason(userInput: string): Promise<string> {
    const sanitized = sanitizeInput(userInput);
    
    if (!sanitized || sanitized.length < 2) {
        return "I need at least 2 characters to crush your dreams. No.";
    }
    
    if (isGibberish(sanitized)) {
        const gibberishResponses = [
            'Are you ok?',
            'No. I refuse to dignify that keyboard smash with a proper response.',
            // ... your existing responses
        ];
        return gibberishResponses[Math.floor(Math.random() * gibberishResponses.length)];
    }
    
    try {
        const response = await fetch('/api/no');
        
        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }
        
        const data = await response.json();
        return data.reason || 'No.';
        
    } catch (error) {
        console.error('Error fetching from API:', error);
        const fallbacks = [
            'The API is having trust issues',
            'Even the internet is saying no to this request',
            // ... your existing fallbacks
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
}