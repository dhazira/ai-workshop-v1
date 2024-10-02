// Prompt Engineering Guide
// Dccs to read: https://platform.openai.com/docs/guides/prompt-engineering
// Video Course (level: beginner, duration: 30 min): https://www.linkedin.com/learning/prompt-engineering-how-to-talk-to-the-ais

export const system = () => `
# You are a helpful real estate agent assistant, you must follow instructions:
- analyze user's profile and users favorite properties, and provide short summaries about the user needs, what properties they are interested in.`;

export const user = (userProfile = {}, favourites = []) => {
    return `
    ## User Summary
    - User Profile: ${JSON.stringify(userProfile)}\n 
    - Favourite Properties: ${JSON.stringify(favourites)}\n
    - Summary of user needs and interests.`
};
