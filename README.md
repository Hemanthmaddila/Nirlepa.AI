# Nirlepa - Agricultural AI Landing Page

A sophisticated, single-page landing site for Nirlepa showcasing our integrated AI solutions for agriculture. Designed to communicate our mission to investors, partners, and industry stakeholders.

## 🚀 Features

- **Agricultural AI Focus**: Specialized content for precision agriculture and AgTech
- **3D Hero Animation**: Stunning Three.js background representing data networks and nature
- **Investor-Ready Design**: Professional presentation for partnerships and funding
- **Interactive Technology Tabs**: Deep dive into our technological foundation
- **Phased Strategy Timeline**: Visual roadmap from saffron to global expansion
- **Partner-Focused Contact**: Designed for investors, partners, and collaborators
- **Responsive & Modern**: Optimized for all devices with smooth animations
- **Performance Optimized**: Fast loading with 3D animations that scale based on device capability

## 🛠 Tech Stack

- **HTML5**: Semantic markup optimized for agricultural AI content
- **CSS3**: Modern styling with agricultural color palette and sophisticated layouts
- **Three.js**: 3D particle animations representing agricultural data networks
- **JavaScript**: Vanilla JS for tab interactions and form handling
- **AOS**: Animate on scroll library for engaging section reveals
- **Font Awesome**: Icons for agricultural and technology themes
- **Google Fonts**: Inter font family for professional readability

## 📱 Landing Page Sections

1. **Hero Section**: "Cultivating the Future with Integrated AI" with 3D background
2. **Challenge Section**: Modern agriculture's unprecedented pressures
3. **Solution Section**: Our synergistic ecosystem of hardware, software, and R&D
4. **Technology Deep Dive**: Interactive tabs showcasing our core technologies
5. **Phased Strategy**: Visual timeline from saffron cultivation to global platform
6. **Contact Section**: Partner and investor focused with strategic messaging
7. **Footer**: Agricultural AI focused links and partnerships

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/nirlepa-ai-website.git
cd nirlepa-ai-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Alternative: Simple HTTP Server

If you prefer not to use build tools:

```bash
npm run serve
```

## 📁 Project Structure

```
nirlepa-website/
├── assets/
│   ├── css/
│   │   └── main.css           // Main stylesheet with agricultural AI theme
│   ├── js/
│   │   ├── main.js            // General interactivity and tab switching
│   │   └── three-scene.js     // Three.js 3D hero background animation
│   └── images/
│       ├── logo.svg           // Nirlepa company logo
│       ├── icon-iot.svg       // IoT & Computer Vision icon
│       ├── icon-ai.svg        // AI & Machine Learning icon
│       ├── icon-cea.svg       // Controlled Environment Agriculture icon
│       └── icon-automation.svg // AI Automation icon
├── index.html                 // Single-page landing site
├── package.json
├── vite.config.js
├── LICENSE
└── README.md
```

## 🎨 Customization

### Colors

The website uses a modern color palette. Main colors are defined in CSS:

- Primary: `#667eea` (Blue)
- Secondary: `#764ba2` (Purple)
- Background: `#f8fafc` (Light gray)
- Text: `#333` (Dark gray)

### Fonts

The website uses the Inter font family from Google Fonts. You can change this in the HTML head section.

### Content

1. **Update Company Information**: Edit the text content in `index.html`
2. **Add Your Logo**: Replace `assets/images/logo.png` with your company logo
3. **Update Contact Details**: Modify the contact section with your actual information
4. **Add Your Images**: Replace placeholder images in the `assets/images/` folder

## 📧 Contact Form Setup

The contact form currently shows a success message for demonstration. To make it functional:

1. **Backend Integration**: Replace the `submitContactForm()` function in `script.js` with your API endpoint
2. **Email Service**: Integrate with services like EmailJS, Netlify Forms, or your backend
3. **Validation**: The form includes client-side validation; add server-side validation as needed

### Example with EmailJS:

```javascript
async function submitContactForm(data) {
    try {
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data);
        showNotification('Message sent successfully!', 'success');
    } catch (error) {
        showNotification('Error sending message. Please try again.', 'error');
    }
}
```

## 🔧 Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run serve` - Start simple HTTP server

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 480px - 767px
- Small Mobile: < 480px

## ♿ Accessibility

The website follows accessibility best practices:

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages

1. Run `npm run build`
2. Push the `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect the build settings

## 📈 Performance

The website is optimized for performance:

- Lazy loading for images
- Minified CSS and JavaScript
- Optimized fonts loading
- Compressed images
- Efficient animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help with customization:

- Email: hello@nirlepa.ai
- Website: [www.nirlepa.ai](https://www.nirlepa.ai)

## 🎯 Roadmap

- [ ] Blog section
- [ ] Client testimonials carousel
- [ ] Portfolio/case studies page
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced animations
- [ ] Performance analytics

---

**Made with ❤️ by Nirlepa.AI Team** 