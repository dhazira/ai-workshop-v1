/**
 * @fileoverview Utility module for interacting with OpenAI's chat completion API.
 * Provides an easy way to generate AI responses using the OpenAI GPT-4 model.
 */

import OpenAI from "openai";
import "dotenv/config";
import { v4 } from "uuid";
const { OPENAI_API_KEY } = process.env;

// For quick start recheck docs with simple example from OpenAI's API documentation
// https://platform.openai.com/docs/guides/chat-completions/getting-started

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Default option which we used for config chat completions from openAI API
// The list of all available parameters can be found at https://platform.openai.com/docs/api-reference/chat/create
const DEFAULTS = {
    model: "gpt-4",
    // What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random,
    // while lower values like 0.2 will make it more focused and deterministic.
    // More information can be found at https://platform.openai.com/docs/api-reference/chat/create#chat-create-temperature
    temperature: 1.1
};

/**
 * Generates a chat completion response using OpenAI's GPT-4 model.
 *
 * @param {string} systemContent - The system message that sets up context or instructions for the conversation.
 * @param {string} userContent - The user's input message.
 * @param {Object} [options={}] - Optional parameters to customize the API request.
 * @param {string} [options.model=DEFAULTS.model] - The model to use for the chat completion.
 * @param {number} [options.temperature=DEFAULTS.temperature] - The sampling temperature. Higher values increase randomness.
 * @param {number} [options.top_p=DEFAULTS.top_p] - The nucleus sampling parameter.
 *
 * @returns {Promise<string>} - The generated lead content from the chat completion.
 *
 * @example
 * const response = await chatCompletion("You are a helpful assistant.", "What's the weather like today?");
 * console.log(response); // Generated response from the model
 *
 * @throws {Error} Throws an error if the OpenAI API call fails.
 */
export const chatCompletion = async (systemContent, userContent, options = {}) => {
    const label = `${v4()} - generate chatCompletion`;
    try {
        const messages = [{
            name: "system",
            role: "system",
            content: systemContent
        }, {
            name: "user",
            role: "user",
            content: userContent
        }];
        const chatCompletionCreateParams = {
            ...DEFAULTS,
            messages,
            ...options
        };
        console.log("--- Prompting ---");
        console.log("--- system ---");
        console.log(systemContent);
        console.log("--- user ---");
        console.log(userContent);

        // we will use openai for text generation for do it in better way we should use prompt-engineering technic
        // more information on how to effectively use the API for generating text responses https://platform.openai.com/docs/guides/text-generation/text-generation-models

        const completion = await openai.chat.completions.create(chatCompletionCreateParams);

        // Refer to the OpenAI API documentation for details on the response structure https://platform.openai.com/docs/guides/chat-completions/response-format
        const generateLeadContent = completion.choices[0].message.content;
        const usage = completion.usage;

        console.log("--- openAi API usage ---");
        console.log(usage);

        console.time(label);
        return generateLeadContent;
    } finally {
        console.timeEnd(label);
    }
};
