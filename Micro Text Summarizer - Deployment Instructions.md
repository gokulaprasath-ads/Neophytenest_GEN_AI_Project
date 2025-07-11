# Micro Text Summarizer - Deployment Instructions

## Project Overview

This is a complete web application for micro text summarization that works without transformers or external AI APIs. It uses custom extractive summarization algorithms to generate concise summaries from input text.

## Live Demo

The application is currently deployed and accessible at:
**https://nghki1c8680e.manus.space**

## Features

- **Lightning Fast**: Instant summarization without waiting for complex AI models
- **Privacy First**: Text is processed locally without external API calls
- **Customizable**: Choose summary length (1-5 sentences)
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Professional interface with smooth animations

## Project Structure

```
summarization-app/
├── src/
│   ├── main.py              # Flask application entry point
│   ├── summarizer.py        # Core summarization algorithm
│   ├── routes/
│   │   ├── summarize.py     # API endpoint for summarization
│   │   └── user.py          # User management (template)
│   ├── static/
│   │   ├── index.html       # Frontend HTML
│   │   ├── styles.css       # CSS styling
│   │   └── script.js        # JavaScript functionality
│   └── models/              # Database models (template)
├── venv/                    # Python virtual environment
└── requirements.txt         # Python dependencies
```

## Self-Deployment Options

### Option 1: Local Development

1. **Prerequisites**:
   - Python 3.11+
   - pip package manager

2. **Setup**:
   ```bash
   cd summarization-app
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Run locally**:
   ```bash
   python src/main.py
   ```
   Access at: http://localhost:5000

### Option 2: Deploy to Heroku

1. **Prerequisites**:
   - Heroku account
   - Heroku CLI installed

2. **Deployment**:
   ```bash
   # Create Heroku app
   heroku create your-app-name
   
   # Add Procfile
   echo "web: python src/main.py" > Procfile
   
   # Deploy
   git add .
   git commit -m "Deploy summarization app"
   git push heroku main
   ```

### Option 3: Deploy to Vercel

1. **Prerequisites**:
   - Vercel account
   - Vercel CLI installed

2. **Setup**:
   Create `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "src/main.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "src/main.py"
       }
     ]
   }
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option 4: Deploy to DigitalOcean App Platform

1. **Prerequisites**:
   - DigitalOcean account
   - GitHub repository

2. **Setup**:
   - Push code to GitHub
   - Create new app on DigitalOcean App Platform
   - Connect GitHub repository
   - Set build command: `pip install -r requirements.txt`
   - Set run command: `python src/main.py`

## API Documentation

### POST /api/summarize

Summarizes the provided text.

**Request Body**:
```json
{
  "text": "Your text to summarize...",
  "num_sentences": 2
}
```

**Response**:
```json
{
  "summary": "Generated summary text.",
  "original_length": 500,
  "summary_length": 150
}
```

## Algorithm Details

The summarization algorithm uses:
1. **Sentence Tokenization**: Splits text into individual sentences
2. **Word Frequency Analysis**: Calculates frequency of each word
3. **Sentence Scoring**: Scores sentences based on word frequencies
4. **Top Sentence Selection**: Selects highest-scoring sentences
5. **Order Preservation**: Maintains original sentence order in summary

## Customization

### Modify Summarization Algorithm

Edit `src/summarizer.py` to:
- Change scoring methodology
- Add stop word filtering
- Implement different summarization techniques

### Update UI/UX

Edit files in `src/static/`:
- `index.html`: Structure and content
- `styles.css`: Styling and animations
- `script.js`: Interactive functionality

### Add Features

Potential enhancements:
- User accounts and history
- Multiple summarization algorithms
- Export options (PDF, Word)
- Batch processing
- API rate limiting

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

2. **Dependencies not found**:
   ```bash
   pip install -r requirements.txt
   ```

3. **CORS errors**:
   - Ensure Flask-CORS is installed
   - Check CORS configuration in `main.py`

### Performance Optimization

- Use production WSGI server (Gunicorn)
- Enable gzip compression
- Implement caching for repeated requests
- Add CDN for static assets

## Security Considerations

- Input validation and sanitization
- Rate limiting for API endpoints
- HTTPS in production
- Environment variables for secrets

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Test with the live demo first
4. Ensure all dependencies are installed

---

**Note**: The current deployment at https://nghki1c8680e.manus.space is temporary and may not be permanent. For production use, please deploy using one of the self-deployment options above.

