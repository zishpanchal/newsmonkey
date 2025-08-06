class AIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GROK_API_KEY;
    this.baseUrl = 'https://api.x.ai/v1';
  }

  async summarizeForGenZ(title, description) {
    if (!this.apiKey) {
      throw new Error('Grok API key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'grok-3',
          messages: [
            {
              role: 'system',
              content: `You are a Gen-Z content creator. Respond ONLY with the final formatted output. No explanations, no thinking out loud, just the direct answer in the requested format.`
            },
            {
              role: 'user',
              content: `Turn this news into Gen-Z language:

Title: ${title}
Description: ${description}

Response format (copy exactly):
🔥 Headline: [your spicy Gen-Z headline here]
📰 Summary: [1-2 sentences with emojis explaining what happened]
💭 Why care: [1 sentence why Gen-Z should care]`
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Grok API Error Response:', response.status, errorText);
        throw new Error(`Grok API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('🤖 Grok API Full Response:', data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('❌ Unexpected response structure:', data);
        return 'AI summary unavailable - unexpected response format';
      }
      
      const message = data.choices[0].message;
      let content = message.content || '';
      
      console.log('🔍 Raw content:', content);
      
      // Clean up any template placeholders or extra explanations
      if (content.includes('[your spicy Gen-Z headline here]')) {
        console.log('⚠️ Model returned template format, trying again...');
        return 'AI is being a bit template-y, try clicking again! 🤖';
      }
      
      // Extract just the formatted sections if there's extra text
      if (content.includes('🔥') && content.includes('📰') && content.includes('💭')) {
        const formatStart = content.indexOf('🔥');
        if (formatStart !== -1) {
          content = content.substring(formatStart);
          // Stop at any meta-commentary
          const stopPhrases = ['As a Gen-Z', 'Break it down', 'My response', '1. **Headline'];
          for (const phrase of stopPhrases) {
            if (content.includes(phrase)) {
              content = content.substring(0, content.indexOf(phrase)).trim();
              break;
            }
          }
        }
      }
      
      console.log('✅ Processed content:', content);
      
      if (!content || content.length < 20) {
        console.error('❌ Content too short or empty:', content);
        return 'AI gave a weird response, try again! 🤷‍♀️';
      }
      
      return content;
      
    } catch (error) {
      console.error('Grok API Error:', error);
      return 'Oops! 🤖 AI summary temporarily unavailable. Try again later!';
    }
  }

  // Test function to verify API connection
  async testConnection() {
    try {
      console.log('🔄 Testing Grok API with sample data...');
      const testSummary = await this.summarizeForGenZ(
        "Federal Reserve Raises Interest Rates",
        "The Federal Reserve announced a 0.25 percentage point increase in interest rates to combat inflation."
      );
      
      if (testSummary && !testSummary.includes('unavailable')) {
        console.log('✅ Grok API Test Success! Response:', testSummary);
        return true;
      } else {
        console.log('⚠️ Grok API Test returned fallback message:', testSummary);
        return false;
      }
    } catch (error) {
      console.error('❌ Grok API Test Failed:', error);
      return false;
    }
  }
}

export default new AIService();