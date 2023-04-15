export const configEnv = {
    get TMDB_API_KEY() {
        const apiKey = process.env.TMDB_API_KEY;
        if (!apiKey) {
            throw new Error('API key not provided.');
        }
        return apiKey;
    },
};