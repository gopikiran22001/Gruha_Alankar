# 🏠 Gruha Alankara

**AI-Powered Interior Design Platform**

Transform your living spaces with cutting-edge artificial intelligence. Gruha Alankara combines computer vision, generative AI, and real-time analysis to deliver professional-grade interior design recommendations.

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org)
[![Flask](https://img.shields.io/badge/Flask-3.0+-000000.svg)](https://flask.palletsprojects.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Features

### 🎨 AI Design Studio
- **Style-based design generation** - Create rooms in Modern, Scandinavian, Industrial, Bohemian, or Luxury styles
- **Budget-aware recommendations** - Get furniture suggestions within your budget
- **Photorealistic rendering** - Generate high-quality design visualizations
- **Before/After comparisons** - See transformations side-by-side

### 📸 Live Room Scanner
- **Real-time object detection** - Identify furniture and decor instantly
- **Lighting analysis** - Measure ambient light levels (Lux ratings)
- **Space utilization metrics** - Analyze room efficiency and circulation
- **Virtual furniture placement** - Overlay furniture on camera feed
- **AI room staging** - Transform empty rooms into furnished spaces

### 🔍 AI Diagnostics
- **Spatial efficiency scores** - Get room optimization ratings
- **Illumination heatmaps** - Visual light distribution analysis
- **Object classification** - Detailed furniture detection with confidence scores
- **AI reasoning logs** - Understand design recommendations
- **Safety checks** - Clearance and spacing validation

### 💬 AI Design Assistant
- **Natural language chat** - Discuss design ideas conversationally
- **Multi-agent system** - Specialized agents for different tasks
- **Context-aware recommendations** - Remembers your preferences
- **Product suggestions** - Get furniture recommendations during chat
- **Image generation** - Create designs from descriptions

### 🛍️ Furniture Catalog
- **Smart search** - Find furniture by style, room, or budget
- **AI-powered matching** - Products that fit your design
- **Product comparison** - Side-by-side feature analysis
- **Direct booking** - Order furniture seamlessly

### 📦 Order Management
- **Track orders** - Real-time order status updates
- **Booking history** - View all past orders
- **Order details** - Complete product and delivery information

---

## 🏗️ Architecture

### Backend (Flask + Python)
```
Backend/
├── app/
│   ├── agents/              # AI Agent System
│   │   ├── buddy_agent.py       # Conversational AI
│   │   ├── vision_agent.py      # Computer vision (Florence2, YOLO, SAM2)
│   │   ├── design_agent.py      # Design generation
│   │   ├── furniture_agent.py   # Product recommendations
│   │   ├── budget_agent.py      # Cost calculations
│   │   ├── web_agent.py         # Web scraping
│   │   ├── booking_agent.py     # Order management
│   │   ├── memory_agent.py      # User preferences
│   │   ├── image_generation_agent.py  # SDXL image generation
│   │   └── supervisor_agent.py  # Agent orchestration
│   │
│   ├── api/                 # REST API Endpoints
│   │   ├── auth.py              # Authentication
│   │   ├── chat.py              # Chat interface
│   │   ├── design.py            # Design generation
│   │   ├── vision.py            # Image analysis
│   │   ├── furniture.py         # Product catalog
│   │   ├── booking.py           # Order management
│   │   └── image_generation.py  # Image creation
│   │
│   ├── database/            # Data Layer
│   │   ├── mongo.py             # MongoDB operations
│   │   ├── redis_cache.py       # Redis caching
│   │   └── vector_store.py      # ChromaDB embeddings
│   │
│   ├── llm/                 # Language Models
│   │   ├── groq_client.py       # Groq API (Llama 3.3)
│   │   ├── deepseek_client.py   # DeepSeek R1
│   │   ├── qwen_client.py       # Qwen models
│   │   └── embedding_client.py  # Text embeddings
│   │
│   └── orchestration/       # Workflow Management
│       ├── graph_builder.py     # LangGraph workflows
│       ├── executor.py          # Task execution
│       └── nodes.py             # Agent nodes
│
├── config/                  # Configuration
│   ├── settings.py
│   └── constants.py
│
└── data/                    # Data Storage
    ├── uploads/             # User uploads
    └── chromadb/            # Vector database
```

### Frontend (React + Vite)
```
Frontend/
├── src/
│   ├── pages/               # Page Components
│   │   ├── CameraPage.jsx       # Live scanner
│   │   ├── AiAnalysisPage.jsx   # Diagnostics
│   │   ├── DesignStudioPage.jsx # Design generation
│   │   ├── AssistantPage.jsx    # AI chat
│   │   ├── CatalogPage.jsx      # Furniture catalog
│   │   └── BookingPage.jsx      # Order management
│   │
│   ├── components/          # Reusable Components
│   │   ├── shared/              # Common UI
│   │   ├── canvas/              # 3D visualization
│   │   └── ui/                  # UI primitives
│   │
│   ├── store/               # State Management (Zustand)
│   │   ├── cameraStore.js       # Camera state
│   │   ├── designStore.js       # Design state
│   │   ├── chatStore.js         # Chat state
│   │   └── projectStore.js      # Project state
│   │
│   └── services/            # API Services
│       ├── apiClient.js         # HTTP client
│       ├── cameraApi.js         # Vision API
│       └── chatApi.js           # Chat API
```

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.11+** (⚠️ Python 3.13 has MongoDB TLS issues)
- **Node.js 18+**
- **MongoDB Atlas** account (or local MongoDB)
- **Redis** instance
- API keys: Groq, DeepSeek (optional)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/gruha-alankara.git
cd gruha-alankara
```

### 2. Backend Setup

#### Install Python 3.11 (if needed)
```bash
# Download from python.org
# Then create virtual environment:
py -3.11 -m venv myenv
myenv\Scripts\activate  # Windows
source myenv/bin/activate  # Linux/Mac
```

#### Install Dependencies
```bash
cd Backend
pip install -r requirements.txt
```

#### Configure Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

Required environment variables:
```env
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?appName=gruha
MONGODB_DB_NAME=gruha_alankara

# Redis
REDIS_URL=redis://user:pass@host:port/0

# Groq API (Required)
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile

# Optional: Separate keys for different agents
GROQ_BUDDY_API_KEY=key_for_chat
GROQ_DESIGN_API_KEY=key_for_design
GROQ_FURNITURE_API_KEY=key_for_furniture

# JWT
JWT_SECRET_KEY=your_secret_key_here
SECRET_KEY=your_flask_secret_key
```

#### Test MongoDB Connection
```bash
python test_mongo.py
```

#### Run Backend
```bash
python run.py
# or
python app_minimal.py
```

Backend will start at: **http://localhost:5000**

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend will start at: **http://localhost:5173**

---

## 🔧 Configuration

### Database Setup

#### MongoDB Collections
- `users` - User accounts
- `projects` - Saved designs
- `chat_history` - Conversation logs
- `agent_logs` - Agent execution logs
- `bookings` - Furniture orders
- `scraped_products` - Product catalog
- `designs` - Generated designs
- `furniture` - Furniture items

#### Redis Usage
- Session management
- Token blocklist
- Rate limiting
- Caching

#### ChromaDB Collections
- `user_memory` - User preferences
- `conversation_memory` - Chat history embeddings
- `design_memory` - Design patterns
- `style_memory` - Style preferences

### AI Model Configuration

#### LLM Providers
- **Groq** (Primary): Llama 3.3 70B, Llama 3.1 8B
- **DeepSeek** (Optional): DeepSeek R1
- **Qwen** (Optional): Qwen VL for vision

#### Vision Models (Optional - Local)
- **Florence2**: Image captioning
- **YOLOv11**: Object detection
- **SAM2**: Image segmentation

If vision model endpoints are not running:
- System falls back to simplified analysis
- Core features remain functional

#### Image Generation
- **Primary**: Local SDXL endpoint (if running)
- **Fallback**: Pollinations API (free tier)
- **Final Fallback**: Returns original image

---

## 📚 API Documentation

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/profile
GET  /api/auth/status
```

### Chat
```http
POST /api/chat/message
POST /api/chat/stream  # Server-sent events
GET  /api/chat/history
POST /api/chat/feedback
```

### Vision Analysis
```http
POST /api/vision/analyze
  - Body: multipart/form-data
  - Fields: image (file), task_type (string)
  - Returns: room analysis, objects, lighting, colors
```

### Design Generation
```http
POST /api/design/generate
  - Body: JSON
  - Fields: style, room_type, budget, image (optional)
  - Returns: design recommendations, furniture list
```

### Image Generation
```http
POST /api/image/generate
  - Body: JSON
  - Fields: prompt, style, base_image (optional)
  - Returns: generated image URL
```

### Furniture
```http
GET  /api/furniture/catalog
POST /api/furniture/recommend
GET  /api/furniture/:id
POST /api/furniture/compare
```

### Booking
```http
POST /api/booking/create
GET  /api/booking/list
GET  /api/booking/:id
PUT  /api/booking/:id/status
```

### Health Check
```http
GET /api/health
  - Returns: MongoDB, Redis, ChromaDB status
```

---

## 🎯 Usage Examples

### 1. Design a Room
```javascript
// Frontend
const response = await fetch('/api/design/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    style: 'modern',
    room_type: 'living_room',
    budget: '50000-100000',
  })
});
const design = await response.json();
```

### 2. Analyze Room from Camera
```javascript
// Capture from camera
const imageSrc = webcamRef.current.getScreenshot();

// Analyze
const formData = new FormData();
formData.append('image', imageBlob);
formData.append('task_type', 'full_analysis');

const response = await fetch('/api/vision/analyze', {
  method: 'POST',
  body: formData
});
const analysis = await response.json();
```

### 3. Chat with AI Assistant
```javascript
const response = await fetch('/api/chat/message', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    message: 'Show me modern sofas under $2000'
  })
});
const reply = await response.json();
```

### 4. Generate Furnished Room
```javascript
const response = await fetch('/api/image/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A beautifully furnished scandinavian living room',
    style: 'scandinavian',
    base_image: capturedImageBase64
  })
});
const stagedRoom = await response.json();
```

---

## 🧪 Testing

### Backend Tests
```bash
cd Backend

# Test MongoDB connection
python test_mongo.py

# Test service connectivity
python check_services.py

# Test MongoDB Atlas network
python check_mongodb_atlas.py

# Run all tests (if available)
pytest
```

### Frontend Tests
```bash
cd Frontend
npm run test
```

---

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Fails
**Problem**: `RuntimeError: MongoDB is not connected`

**Solutions**:
1. **Use Python 3.11** (not 3.13)
   ```bash
   py -3.11 -m venv myenv311
   myenv311\Scripts\activate
   ```

2. **Check MongoDB Atlas**:
   - Verify cluster is running (not paused)
   - Add your IP to Network Access whitelist
   - Verify connection string in `.env`

3. **Use Local MongoDB**:
   ```bash
   # Install MongoDB Community Edition
   # Update .env:
   MONGODB_URI=mongodb://localhost:27017/gruha_alankara
   ```

See `MONGODB_FIX_PYTHON313.md` for detailed guide.

#### Authentication Disabled
**Problem**: Login returns 503 "Authentication unavailable"

**Cause**: MongoDB not connected (app runs in degraded mode)

**Solution**: Fix MongoDB connection (see above)

#### Image Generation Fails
**Problem**: Generated images return original image

**Causes**:
- SDXL endpoint not running
- Pollinations API down
- API key issues

**Solution**: Check `check_services.py` output

#### Camera Not Working
**Problem**: "Camera hardware permission rejected"

**Solutions**:
- Allow camera permission in browser
- Check browser security settings
- Use HTTPS (not HTTP) for production
- Try different browser

#### Vision Analysis Shows Errors
**Problem**: "Vision analysis failed"

**Causes**:
- Florence2/YOLO/SAM2 not running (gracefully degrades)
- Image too large
- Network issues

**Solution**: System continues with basic analysis

---

## 📦 Deployment

### Production Checklist

- [ ] Update `SECRET_KEY` and `JWT_SECRET_KEY`
- [ ] Set `FLASK_ENV=production`
- [ ] Configure CORS origins
- [ ] Enable HTTPS
- [ ] Set up MongoDB indexes
- [ ] Configure Redis persistence
- [ ] Set up monitoring (logs, metrics)
- [ ] Configure backup strategy
- [ ] Set rate limits
- [ ] Enable CDN for static assets

### Docker Deployment (Coming Soon)
```bash
docker-compose up -d
```

### Environment Variables for Production
```env
FLASK_ENV=production
FLASK_DEBUG=0
SECRET_KEY=<long-random-string>
JWT_SECRET_KEY=<long-random-string>
CORS_ORIGINS=https://yourdomain.com
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint/Prettier for JavaScript
- Write clear commit messages
- Add tests for new features
- Update documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- **Groq** - Fast LLM inference
- **DeepSeek** - Advanced reasoning models
- **MongoDB** - Database
- **Redis** - Caching
- **ChromaDB** - Vector storage
- **Pollinations.ai** - Image generation fallback
- **LangGraph** - Agent orchestration
- **React** - Frontend framework
- **Framer Motion** - Animations

---

## 📞 Support

- **Documentation**: [Full Docs](docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/gruha-alankara/issues)
- **Email**: support@gruhaalankara.com
- **Discord**: [Join Community](https://discord.gg/yourserver)

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- ✅ AI Design Studio
- ✅ Live Room Scanner
- ✅ AI Diagnostics
- ✅ Chat Assistant
- ✅ Furniture Catalog
- ✅ Order Management
- ✅ Virtual Furniture Placement
- ✅ AI Room Staging

### Version 1.1 (Planned)
- [ ] AR Furniture Placement (mobile)
- [ ] 3D Room Walkthrough
- [ ] Social sharing features
- [ ] Designer marketplace
- [ ] Advanced budget planner
- [ ] Multi-room projects

### Version 2.0 (Future)
- [ ] VR room experience
- [ ] AI interior designer consultation
- [ ] Automated 3D modeling
- [ ] Smart home integration
- [ ] Sustainability scoring
- [ ] Material selection tool

---

## 📊 Tech Stack

### Backend
- **Framework**: Flask 3.0+
- **Language**: Python 3.11+
- **LLMs**: Groq (Llama 3.3), DeepSeek, Qwen
- **Vision**: Florence2, YOLOv11, SAM2
- **Image Gen**: SDXL, ControlNet
- **Database**: MongoDB Atlas
- **Cache**: Redis
- **Vector DB**: ChromaDB
- **Orchestration**: LangGraph
- **API**: RESTful + SSE

### Frontend
- **Framework**: React 18+
- **Build**: Vite
- **State**: Zustand
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP**: Axios
- **Camera**: react-webcam

### Infrastructure
- **Hosting**: TBD
- **CDN**: TBD
- **Monitoring**: TBD
- **CI/CD**: GitHub Actions

---

## 🔐 Security

- JWT-based authentication
- Password hashing (bcrypt)
- Rate limiting
- CORS protection
- Input validation
- SQL injection prevention
- XSS protection
- Token blocklisting

For security issues, email: security@gruhaalankara.com

---

## 📈 Performance

### Benchmarks
- **Chat Response**: < 2 seconds
- **Image Generation**: 15-30 seconds
- **Vision Analysis**: 3-5 seconds
- **Design Generation**: 5-10 seconds

### Optimization
- Redis caching for frequent queries
- ChromaDB for semantic search
- Lazy loading for images
- Code splitting for frontend
- CDN for static assets

---

## 🌍 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ❌ IE 11 (not supported)

---

**Built with ❤️ by the Gruha Alankara Team**

*Transform your space. Discover your style. Design with AI.*

---

## Quick Links

- [Installation Guide](docs/installation.md)
- [API Documentation](docs/api.md)
- [User Guide](docs/user-guide.md)
- [MongoDB Setup](MONGODB_FIX_PYTHON313.md)
- [Camera Features](Frontend/CAMERA_ENHANCEMENTS.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
