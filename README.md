# Portfolio Website - Configurable Template

A modern, customizable portfolio website that loads all content and styling from a single `config.json` file. Perfect for GitHub Pages!

## 🚀 Features

- **Fully Configurable**: All content and styling controlled via `config.json`
- **Dynamic Rendering**: Content is rendered dynamically using JavaScript
- **Theme Customization**: Easy color, font, and background customization
- **Responsive Design**: Works beautifully on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Easy to Use**: Just edit `config.json` to customize everything

## 📁 File Structure

```
.
├── index.html          # Main HTML file (minimal structure)
├── styles.css          # CSS styling (uses CSS variables)
├── script.js           # JavaScript for dynamic rendering
├── config.json         # Configuration file (EDIT THIS!)
├── config.example.json # Example configuration template
└── appData/            # All portfolio assets
    ├── images/         # All portfolio images
    │   ├── Nadeem_Ali_2.JPG
    │   ├── Experience.jpg
    │   ├── Skills.jpg
    │   └── Education.jpg
    ├── resumes/        # Resume PDF files
    │   └── Nadeem_Ali_SRE_ATS_Sept.pdf
    └── certificates/   # Certificate images and PDFs
        ├── aws-certificate.jpg
        ├── aws-certificate.pdf
        └── ...
```

## 🎨 Customization Guide

### 1. Personal Information

Edit the `personalInfo` section in `config.json`:

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Hello! I'm Your Name",
    "profileImage": "appData/images/your-image.jpg",
    "email": "your.email@example.com",
    "summary": "Your professional summary",
    "about": "Your about paragraph"
  }
}
```

### 2. Social Links

Add or modify social links:

```json
{
  "socialLinks": [
    {
      "name": "LinkedIn",
      "url": "https://www.linkedin.com/in/yourprofile",
      "icon": "linkedin"
    },
    {
      "name": "GitHub",
      "url": "https://www.github.com/yourusername",
      "icon": "github"
    }
  ]
}
```

### 3. Experience

Add your work experience:

```json
{
  "experience": {
    "sectionTitle": "Experience",
    "sectionImage": "appData/images/Experience.jpg",
    "items": [
      {
        "title": "Your Job Title",
        "company": "Company Name",
        "period": "Jan 2020 - Present",
        "description": [
          "First bullet point",
          "Second bullet point",
          "Third bullet point"
        ]
      }
    ]
  }
}
```

### 4. Skills

Customize your skills with emoji icons:

**Available Icon Types:**
- `activity` 📊 - For metrics/analytics
- `code` 💻 - For programming languages
- `server` 🖥️ - For infrastructure/devops
- `eye` 👁️ - For monitoring/observability
- `cloud` ☁️ - For cloud platforms
- `tool` 🔧 - For tools
- `language` 🌐 - For languages
- `application` 📱 - For applications

Customize your skills:

```json
{
  "skills": {
    "sectionTitle": "Skills",
    "sectionImage": "appData/images/Skills.jpg",
    "categories": [
      {
        "title": "Tools",
        "icon": "tool",
        "items": "Tool 1, Tool 2, Tool 3"
      },
      {
        "title": "Languages",
        "icon": "language",
        "items": "Language 1, Language 2, Language 3"
      }
    ]
  }
}
```

**Available Icons**: `tool`, `language`, `application`, `cloud`

### 5. Projects

Add your projects:

```json
{
  "projects": {
    "sectionTitle": "Projects",
    "items": [
      {
        "title": "Project Name",
        "url": "https://project-url.com",
        "description": "Project description"
      },
      {
        "title": "Project Without Link",
        "url": null,
        "description": "Project description"
      }
    ]
  }
}
```

### 6. Education

Add your education:

```json
{
  "education": {
    "sectionTitle": "Education",
    "sectionImage": "appData/images/Education.jpg",
    "items": [
      {
        "title": "Degree Name",
        "period": "2010 - 2014",
        "description": "Education description"
      }
    ]
  }
}
```

### 7. Theme Customization

#### Colors

Customize the color scheme:

```json
{
  "theme": {
    "colors": {
      "primary": "#6366f1",
      "primaryDark": "#4f46e5",
      "secondary": "#8b5cf6",
      "accent": "#06b6d4",
      "textDark": "#1e293b",
      "textLight": "#64748b",
      "bgLight": "#f8fafc",
      "bgWhite": "#ffffff",
      "borderColor": "#e2e8f0"
    }
  }
}
```

#### Background

Choose from gradient, solid color, or image:

**Gradient Background:**
```json
{
  "theme": {
    "background": {
      "type": "gradient",
      "gradient": {
        "start": "#f5f7fa",
        "end": "#c3cfe2",
        "direction": "135deg"
      }
    }
  }
}
```

**Solid Color Background:**
```json
{
  "theme": {
    "background": {
      "type": "solid",
      "color": "#f0f0f0"
    }
  }
}
```

**Image Background:**
```json
{
  "theme": {
    "background": {
      "type": "image",
      "image": "appData/background.jpg",
      "size": "cover",
      "position": "center"
    }
  }
}
```

#### Fonts

Customize fonts:

```json
{
  "theme": {
    "fonts": {
      "primary": "Inter, sans-serif",
      "googleFont": "Inter",
      "googleFontWeights": "400;500;600;700;800"
    }
  }
}
```

**Popular Google Fonts:**
- Inter
- Roboto
- Open Sans
- Lato
- Montserrat
- Poppins
- Raleway

#### Effects

Toggle animations and effects:

```json
{
  "theme": {
    "effects": {
      "animations": true,
      "hoverEffects": true,
      "smoothScroll": true
    }
  }
}
```

### 8. Resume Files

Add resume download links:

```json
{
  "resume": {
    "sectionTitle": "Download Resume",
    "files": [
      {
        "name": "Download ATS Friendly Resume",
        "file": "appData/resumes/resume-ats.pdf"
      },
      {
        "name": "Download Advanced Resume",
        "file": "appData/resumes/resume-advanced.pdf"
      }
    ]
  }
}
```

### 9. Certificates

Add your certifications with modal viewing:

```json
{
  "certificates": {
    "sectionTitle": "Certifications 🏆",
    "items": [
      {
        "title": "AWS Certified Solutions Architect",
        "issuer": "Amazon Web Services",
        "date": "2023",
        "image": "appData/certificates/aws-certificate.jpg",
        "pdf": "appData/certificates/aws-certificate.pdf"
      },
      {
        "title": "Kubernetes Administrator",
        "issuer": "CNCF",
        "date": "2022",
        "image": "appData/certificates/kubernetes-certificate.jpg",
        "pdf": null
      }
    ]
  }
}
```

**Note**: 
- You can provide either `image`, `pdf`, or both
- Clicking on a certificate opens it in a modal
- Clicking again closes the modal
- PDFs are displayed in an iframe, images are displayed directly
- If both are provided, PDF takes priority for display

### 10. Meta Tags (SEO)

Customize SEO meta tags:

```json
{
  "meta": {
    "title": "Your Name | Portfolio",
    "description": "Your professional description for SEO",
    "keywords": "keyword1, keyword2, keyword3"
  }
}
```

## 🚀 Getting Started

1. **Clone or Download** this repository
2. **Create folders** under `appData/`:
   - `appData/images/` - for all images
   - `appData/resumes/` - for resume PDFs
   - `appData/certificates/` - for certificate files
3. **Add your files** to the appropriate folders:
   - Images → `appData/images/`
   - Resumes → `appData/resumes/`
   - Certificates → `appData/certificates/`
4. **Edit `config.json`** with your information (or use `config.example.json` as a template)
5. **Update file paths** in `config.json` to use `appData/` prefix (e.g., `appData/images/photo.jpg`)
6. **Test locally** by opening `index.html` in a browser
   - **Important**: For local testing, you need a local server (config.json won't load with `file://` protocol)
   - Use: `python -m http.server 8000` or `npx serve` or `php -S localhost:8000`
   - Then open: `http://localhost:8000`
7. **Deploy to GitHub Pages** or any web hosting service

## 📝 Notes

### Folder Organization
- **appData/images/**: All portfolio images (profile, section images, etc.)
- **appData/resumes/**: Resume PDF files
- **appData/certificates/**: Certificate images and PDFs
- All file paths in `config.json` should use `appData/` prefix (e.g., `appData/images/photo.jpg`)

### Important Notes
- The config.json file must be valid JSON (use a JSON validator if needed)
- Images should be optimized for web (use tools like TinyPNG)
- Resume files should be PDF format
- Certificate files can be JPG/PNG images or PDFs
- Emojis are supported in section titles and throughout the config

## 🎨 Color Scheme Ideas

### Professional Blue
```json
"colors": {
  "primary": "#2563eb",
  "secondary": "#1e40af",
  "accent": "#3b82f6"
}
```

### Modern Purple
```json
"colors": {
  "primary": "#7c3aed",
  "secondary": "#6d28d9",
  "accent": "#a78bfa"
}
```

### Elegant Green
```json
"colors": {
  "primary": "#059669",
  "secondary": "#047857",
  "accent": "#10b981"
}
```

### Warm Orange
```json
"colors": {
  "primary": "#ea580c",
  "secondary": "#c2410c",
  "accent": "#fb923c"
}
```

## 🔧 Troubleshooting

### Content not showing?
- Check browser console for errors
- Ensure `config.json` is valid JSON
- Verify all file paths are correct
- Make sure images exist in the specified paths

### Styling issues?
- Check that CSS variables are being applied
- Verify color values are valid hex codes
- Ensure Google Font name is correct

### Images not loading?
- Check file paths in `config.json`
- Verify images exist in `appData/` folder
- Ensure file names match exactly (case-sensitive)

## 📄 License

Feel free to use this template for your personal portfolio!

## 🤝 Contributing

Suggestions and improvements are welcome! Feel free to customize and enhance this template.

---

**Happy Customizing! 🎉**
