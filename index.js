import express from "express";
import { chatCompletion } from "./utils/openai.js";
import "dotenv/config";
// import cors from "cors";
// import bodyParser from "body-parser";
import { system, user } from "./prompts/index.js";
import { favourites } from "./mocks/favourites.js";
import { userProfile } from "./mocks/userProfile.js";

const app = express();
const PORT = 3001;
// app.use(cors());
// app.use(bodyParser.json())

/**
 * @async
 * @function
 * @description Route handler for GET requests to the /leads endpoint.
 * This endpoint uses the OpenAI API to generate a lead based on
 * system and user prompts, including user profile and favourites data.
 *
 * @param {Object} req - Express request object (not used in this route).
 * @param {Object} res - Express response object to return the generated lead.
 */
app.get("/leads", async (req, res) => {
    try {
        // Generate lead using OpenAI chatCompletion function
        const lead = await chatCompletion(
            system(),
            user(userProfile, favourites)
        );

        // Log the lead information to the console
        console.log("---- lead ----");
        console.log("---- start ----");
        console.log(lead);
        console.log("---- end ----");
        console.log("---- lead ----");

        // Send the lead response as JSON
        res.json({
            data: {
                lead
            }
        });
    } catch (error) {
        // Handle and log any errors
        console.error("Error generating lead:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @function
 * @description Starts the Express server and listens on the specified port.
 * Logs a message to the console once the server is running.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
