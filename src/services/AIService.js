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
        throw new Error(`Grok API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        return 'AI summary unavailable - unexpected response format';
      }
      
      const message = data.choices[0].message;
      let content = message.content || '';
      
      // Clean up any template placeholders or extra explanations
      if (content.includes('[your spicy Gen-Z headline here]')) {
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
      
      if (!content || content.length < 20) {
        return 'AI gave a weird response, try again! 🤷‍♀️';
      }
      
      return content;
      
    } catch (error) {
      return 'Oops! 🤖 AI summary temporarily unavailable. Try again later!';
    }
  }

  async getGenZImpactScore(title, description) {
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
              content: `You rate how much news impacts Gen-Z (18-25 year olds). Reply ONLY with the score format. No explanations.`
            },
            {
              role: 'user',
              content: `Rate this news impact on Gen-Z (18-25):

Title: ${title}
Description: ${description}

Response format:
📊 Impact Score: [1-10]/10
💡 Why: [1 sentence explaining the score]

1-3 = Barely affects Gen-Z
4-6 = Moderate impact 
7-8 = High impact
9-10 = Major life impact`
            }
          ],
          max_tokens: 100,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`Grok API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';
      
      return content || 'Impact score unavailable';
      
    } catch (error) {
      return '📊 Impact Score: ?/10\n💡 Why: AI is taking a coffee break ☕';
    }
  }

  async explainLikeImFive(title, description) {
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
              content: `You explain complex news like you're talking to a 5-year-old. Use simple words, analogies, and emojis. No jargon or complex terms.`
            },
            {
              role: 'user',
              content: `Explain this news like I'm 5 years old:

Title: ${title}
Description: ${description}

Use:
- Simple words only
- Fun analogies (like comparing to playground, toys, etc)
- Emojis to make it fun
- 2-3 sentences max

Make it easy to understand but accurate!`
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Grok API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';
      
      return content || 'ELI5 explanation unavailable';
      
    } catch (error) {
      return 'Hmm, this is like when your toy breaks and you need a grown-up to explain what happened! 🧸 Try again later!';
    }
  }

  // Test function to verify API connection
  async testConnection() {
    try {
      const testSummary = await this.summarizeForGenZ(
        "Federal Reserve Raises Interest Rates",
        "The Federal Reserve announced a 0.25 percentage point increase in interest rates to combat inflation."
      );
      
      return testSummary && !testSummary.includes('unavailable');
    } catch (error) {
      return false;
    }
  }
}

export default new AIService();