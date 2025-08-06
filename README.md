# 🐒 GenZ.News

**Get your daily dose of news with a modern twist!**

NewsMonkey is a cutting-edge React-based news application that revolutionizes how you consume news. Powered by NewsAPI.org and enhanced with Grok AI, it delivers personalized news experiences including GenZ-friendly explanations, simplified content for all ages, and impact scoring specifically designed for the GenZ audience.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![NewsAPI](https://img.shields.io/badge/NewsAPI-FF6B35?style=for-the-badge&logo=rss&logoColor=white)
![Grok](https://img.shields.io/badge/Grok_AI-000000?style=for-the-badge&logo=openai&logoColor=white)

## 🌟 Features

### 🔥 Core Features
- **Real-time News Feed**: Latest headlines from trusted sources worldwide
- **Category Filtering**: Business, Entertainment, Health, Science, Sports, Technology, and more
- **Infinite Scrolling**: Seamless browsing experience with endless content loading
- **Responsive Design**: Perfect experience across all devices
- **Fast Loading**: Optimized performance with efficient API calls

### 🧠 AI-Powered Features (Grok Integration)
- **GenZ Mode** 🔥: News explained in GenZ terms with slang, emojis, and relatable language
- **ELI5 (Explain Like I'm 5)** 👶: Complex news simplified for easy understanding
- **Impact Score for GenZ** 📊: AI-powered relevance scoring showing how news affects the younger generation
- **Smart Summaries**: Concise, engaging news breakdowns

## 🚀 Quick Start

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn package manager
- NewsAPI.org API key ([Get yours here](https://newsapi.org/register))
- Grok API access ([Sign up here](https://grok.x.ai/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zishpanchal/newsmonkey.git
   cd newsmonkey
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_NEWS_API_KEY=your_newsapi_key_here
   REACT_APP_GROK_API_KEY=your_grok_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📸 Screenshots

<p align="center">
  <img src="/Sreenshots/image1.png" width="45%" alt="Image 1">
  <img src="image2.png" width="45%" alt="Image 2">
</p>

## 🎯 Usage

### Basic Navigation
1. **Browse Categories**: Use the navigation bar to filter news by category
2. **Infinite Scroll**: Simply scroll down to load more articles automatically
3. **Read Full Articles**: Click on any article to read the complete story

### AI Features
1. **GenZ Mode**: Toggle the GenZ switch to get news explained in modern slang
   - Example: "This crypto crash is giving major L energy 💀"
   
2. **ELI5 Mode**: Perfect for complex topics made simple
   - Example: "Think of inflation like when your allowance buys less candy than before"
   
3. **Impact Score**: See how relevant each story is to GenZ audiences (0-100 scale)

## 🏗️ Project Structure

```
newsmonkey/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── News.js          # Main news component
│   │   ├── NewsItem.js      # Individual news card
│   │   ├── Navbar.js        # Navigation component
│   │   └── Spinner.js       # Loading spinner
│   ├── services/
│   │   ├── newsAPI.js       # NewsAPI integration
│   │   └── grokAPI.js       # Grok AI integration
│   ├── App.js              # Main app component
│   ├── App.css             # Global styles
│   └── index.js           # Entry point
├── package.json
└── README.md
```

## 🔧 Configuration

### API Keys Setup
1. **NewsAPI**: Sign up at [newsapi.org](https://newsapi.org) for free (development) or paid plans
2. **Grok API**: Access through X.AI platform for advanced AI features

### Customization Options
- Modify categories in `App.js`
- Adjust page size and loading behavior
- Customize GenZ terminology in Grok integration
- Update styling in component CSS files

## 📱 Responsive Design

NewsMonkey is built with a mobile-first approach:
- **Mobile**: Optimized for touch interactions and small screens
- **Tablet**: Adapted layout for medium screens
- **Desktop**: Full-featured experience with sidebar navigation

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deployment Options
- **Vercel**: Easy deployment with GitHub integration
- **Netlify**: Continuous deployment from Git
- **GitHub Pages**: Free hosting for public repositories
- **Heroku**: Full-stack deployment with custom domains

### Environment Variables for Production
Make sure to set these in your deployment platform:
- `REACT_APP_NEWS_API_KEY`
- `REACT_APP_GROK_API_KEY`

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices
- Write clean, commented code
- Test new features thoroughly
- Update documentation as needed

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. **Check existing issues** on GitHub
2. **Create a new issue** with detailed description
3. **Include screenshots** if reporting UI bugs
4. **Provide error logs** for technical issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org) - For providing comprehensive news data
- [Grok AI](https://grok.x.ai/) - For powering our AI features
- [Create React App](https://create-react-app.dev/) - For the amazing React setup
- [Bootstrap](https://getbootstrap.com/) - For responsive design components
- The open-source community for inspiration and support

## 📊 Stats

- **Categories**: 7+ news categories
- **Sources**: 70+ trusted news sources
- **Languages**: English (with GenZ translations)
- **Update Frequency**: Real-time
- **AI Features**: 3 unique Grok-powered features

## 🔮 Future Roadmap

- [ ] Dark/Light theme toggle
- [ ] User authentication and preferences
- [ ] Bookmark articles functionality  
- [ ] Social sharing features
- [ ] Push notifications for breaking news
- [ ] Multi-language GenZ translations
- [ ] Voice-to-text article summaries
- [ ] Advanced filtering and search

---

**Made by [Zish Panchal](https://github.com/zishpanchal)**

*Don't forget to ⭐ this repo if you found it helpful!*
