# Migration Guide - Organized Folder Structure

This guide helps you organize your files into the new folder structure under `appData/`.

## New Folder Structure

```
appData/
├── images/          # All portfolio images
├── resumes/         # Resume PDF files  
└── certificates/    # Certificate images and PDFs
```

## ✅ Files Already Organized

The following files have been automatically moved:

### Images (→ appData/images/)
- ✅ Nadeem_Ali_2.JPG
- ✅ Nadeem_Ali_3.jpg
- ✅ Experience.jpg
- ✅ Education.jpg
- ✅ Skills.jpg
- ✅ connect.jpg
- ✅ quotes.jpg
- ✅ app.svg
- ✅ cloud.svg
- ✅ code.svg
- ✅ tool.svg

### Resumes (→ appData/resumes/)
- ✅ Nadeem_Ali_SRE_ATS_Sept.pdf

### Certificates (→ appData/certificates/)
- 📁 Folder created and ready for your certificate files

## 📝 Config.json Updated

All file paths in `config.json` have been updated to use the new structure:
- `appData/images/` for images
- `appData/resumes/` for resumes
- `appData/certificates/` for certificates

## 🎯 Next Steps

### 1. Add Certificate Files (Optional)

If you have certificates, add them to `appData/certificates/`:

```bash
# Example: Add your certificate files
cp ~/Downloads/aws-certificate.pdf appData/certificates/
cp ~/Downloads/aws-certificate.jpg appData/certificates/
```

### 2. Update Certificate Paths in config.json

If you added certificates, update the paths in `config.json`:

```json
{
  "certificates": {
    "items": [
      {
        "title": "Your Certificate",
        "issuer": "Issuing Organization",
        "date": "2023",
        "image": "appData/certificates/your-certificate.jpg",
        "pdf": "appData/certificates/your-certificate.pdf"
      }
    ]
  }
}
```

### 3. Verify File Paths

Check that all paths in `config.json` use the `appData/` prefix:
- ✅ `appData/images/` for images
- ✅ `appData/resumes/` for resumes  
- ✅ `appData/certificates/` for certificates

### 4. Test Your Portfolio

1. Start a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

2. Open in browser: `http://localhost:8000`

3. Check browser console for any 404 errors

## 📋 File Path Examples

### Images
```json
"profileImage": "appData/images/Nadeem_Ali_2.JPG"
"sectionImage": "appData/images/Experience.jpg"
```

### Resumes
```json
"file": "appData/resumes/Nadeem_Ali_SRE_ATS_Sept.pdf"
```

### Certificates
```json
"image": "appData/certificates/aws-certificate.jpg"
"pdf": "appData/certificates/aws-certificate.pdf"
```

## ✅ Verification Checklist

- [x] Folders created under `appData/`
- [x] Images moved to `appData/images/`
- [x] Resumes moved to `appData/resumes/`
- [x] Certificates folder created
- [x] `config.json` updated with new paths
- [ ] Certificate files added (if applicable)
- [ ] Tested locally with web server
- [ ] All images load correctly
- [ ] Resume downloads work
- [ ] Certificates display (if added)

## 🆘 Troubleshooting

### Images not loading?
- Check file paths in `config.json` match actual file locations
- Verify files exist in `appData/images/`
- Check browser console for 404 errors
- Ensure file names are case-sensitive

### Resumes not downloading?
- Verify PDF files are in `appData/resumes/`
- Check file paths in `config.json`
- Test PDF file directly in browser

### Certificates not showing?
- Ensure certificate files are in `appData/certificates/`
- Check file paths in `config.json`
- Verify image/PDF file formats are supported

## 📁 Current Structure

```
nadeemali001.github.io/
├── index.html
├── styles.css
├── script.js
├── config.json
├── config.example.json
├── README.md
├── MIGRATION.md
└── appData/
    ├── images/
    │   ├── Nadeem_Ali_2.JPG
    │   ├── Experience.jpg
    │   ├── Education.jpg
    │   ├── Skills.jpg
    │   └── ...
    ├── resumes/
    │   └── Nadeem_Ali_SRE_ATS_Sept.pdf
    └── certificates/
        └── (add your certificates here)
```

---

**Migration Complete! 🎉** Your files are now organized and ready to use.
