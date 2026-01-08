# Logan Cooper Resume Website

A dynamic, professional resume website with messaging capabilities, built with Express.js and Bulma CSS.

## 🌟 Features

- **Modern & Responsive Design** - Beautiful UI built with Bulma CSS framework
- **Dynamic Contact Form** - Send and receive messages with email notifications
- **Professional Layout** - Sections for About, Experience, Skills, and Contact
- **Message Storage** - Optional MongoDB integration to store messages
- **Rate Limiting** - Protection against spam submissions
- **Smooth Animations** - Engaging user experience with scroll animations
- **Mobile Friendly** - Fully responsive across all devices
- **Easy Deployment** - Ready to deploy on Render with one click

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- (Optional) MongoDB database for message storage
- (Optional) Gmail account for email notifications

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   NODE_ENV=development
   
   # Email Configuration (Gmail example)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   ADMIN_EMAIL=your-email@gmail.com
   
   # MongoDB (optional)
   MONGODB_URI=your-mongodb-connection-string
   
   SITE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📧 Email Setup (Gmail)

To enable email notifications:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the 16-character password
4. Use this password in your `.env` file as `EMAIL_PASS`

## 📝 Customization

### Personal Information

Edit `public/index.html` to update:
- Your name and title
- About section content
- Work experience
- Skills and percentages
- Contact information
- Social media links

### Styling

Customize colors and design in `public/css/style.css`:
```css
:root {
  --primary-color: #00d1b2;
  --secondary-color: #3273dc;
  --gradient-start: #667eea;
  --gradient-end: #764ba2;
}
```

### Resume PDF

Replace `Cooper_Logan_Resume.pdf` with your own resume PDF file.

## 🌐 Deployment to Render

### Method 1: Using Render Dashboard

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Create a new Web Service on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`

3. **Add Environment Variables**
   
   In the Render dashboard, add these environment variables:
   - `EMAIL_USER` - Your Gmail address
   - `EMAIL_PASS` - Your Gmail app password
   - `ADMIN_EMAIL` - Email where messages are sent
   - `MONGODB_URI` - (Optional) Your MongoDB connection string
   - `SITE_URL` - Your Render URL (e.g., https://your-app.onrender.com)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for the build to complete
   - Your site will be live!

### Method 2: Using Render Blueprint

The included `render.yaml` file makes deployment automatic:

```yaml
services:
  - type: web
    name: logan-cooper-resume
    env: node
    buildCommand: npm install
    startCommand: npm start
```

## 📱 Adding a Custom Domain

1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domain"
3. Follow instructions to add your domain
4. Update DNS records at your domain registrar

## 🗄️ MongoDB Setup (Optional)

To store messages in a database:

1. **Create a free MongoDB Atlas cluster**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create a database user
   - Whitelist IP addresses (or use 0.0.0.0/0 for all)

2. **Get connection string**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

3. **Add to environment variables**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume?retryWrites=true&w=majority
   ```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Run in production mode
npm start
```

## 📦 Project Structure

```
logan-cooper-resume-website/
├── public/
│   ├── css/
│   │   └── style.css          # Custom styles
│   ├── js/
│   │   └── script.js          # Frontend JavaScript
│   ├── images/                # Your images
│   └── index.html             # Main HTML file
├── server.js                  # Express server
├── package.json               # Dependencies
├── render.yaml                # Render deployment config
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## 🔒 Security Features

- Helmet.js for security headers
- CORS protection
- Rate limiting on contact form (3 requests per 15 minutes)
- Input validation and sanitization
- XSS protection

## 🎨 Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, Bulma CSS, Vanilla JavaScript
- **Database**: MongoDB (optional)
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting
- **Deployment**: Render

## 📄 License

MIT License - feel free to use this for your own resume website!

## 🤝 Support

If you have questions or need help:
- Check the [Render documentation](https://render.com/docs)
- Review the code comments in `server.js`
- Open an issue on GitHub

## 🎯 TODO / Future Enhancements

- [ ] Add authentication for admin dashboard
- [ ] Create admin panel to view messages
- [ ] Add blog section
- [ ] Implement dark mode toggle
- [ ] Add more animation effects
- [ ] Include project portfolio with images
- [ ] Add testimonials section
- [ ] Integrate analytics (Google Analytics)

---

Built with ❤️ by Logan Cooper
