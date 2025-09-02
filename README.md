# Firebase Studio

This is a NextJS starter in Firebase Studio.

## Getting Started

To get started, take a look at `src/app/page.tsx`.

## Using the AI Market Planner

This application includes an AI Market Planner that uses the Google Gemini model to generate marketing plans. To use this feature, you need to provide your own Google AI Studio API key.

1.  Create a `.env` file in the root of your project if it doesn't already exist.
2.  Add the following line to your `.env` file, replacing `"YOUR_GEMINI_API_KEY"` with your actual key:

    ```
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```

3.  You can obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
