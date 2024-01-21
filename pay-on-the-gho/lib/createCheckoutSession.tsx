import { generateUniqueId } from '../utils/generateUniqueId';

export function createCheckoutSession(sessionDetails) {
    // Generate a unique session ID
    const sessionId = generateUniqueId();

    // Create a session object with the unique ID and provided details
    const session = {
        sessionId,
        ...sessionDetails
    };

    // In a real-world scenario, you might want to store this session in a server-side session store
    // For now, we're just returning the session object

    return session;
}