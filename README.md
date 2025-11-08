# VajraEdge Website

Official website for VajraEdge - Advanced Load Testing Tool

🚧 **Currently Under Construction** 🚧

## GitHub Pages Setup

This site is configured for GitHub Pages deployment.

### To Deploy:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit - Under construction page"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to **Pages** section (under Code and automation)
   - Under **Source**, select **Deploy from a branch**
   - Select branch: `main` and folder: `/src`
   - Click **Save**

3. **Your site will be available at:**
   ```
   https://happysantoo.github.io/vajraedge-site/
   ```

### Custom Domain Setup

If you've purchased a custom domain (e.g., `vajraedge.com`):

1. **The CNAME file is already in src/:**
   - Located at `src/CNAME`
   - Update it with your domain name (remove comments, just add the domain)

2. **Configure DNS settings with your domain registrar:**

   **For apex domain (vajraedge.com):**
   - Add these A records pointing to GitHub's servers:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

   **For www subdomain (www.vajraedge.com):**
   - Add a CNAME record:
     ```
     www  CNAME  happysantoo.github.io.
     ```

3. **Update GitHub Pages settings:**
   - Go to repository **Settings** → **Pages**
   - Enter your custom domain in the **Custom domain** field
   - Click **Save**
   - Enable **Enforce HTTPS** (recommended, may take a few minutes)

4. **Wait for DNS propagation:**
   - DNS changes can take up to 24-48 hours
   - You can check status at: https://www.whatsmydns.net/

### Local Development

To preview the site locally:

1. **Simple HTTP server (from src directory):**
   ```bash
   cd src
   python3 -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

2. **Using Node.js (from src directory):**
   ```bash
   cd src
   npx serve
   ```

### Project Structure

```
vajraedge-site/
├── src/                        # Published content (GitHub Pages serves from here)
│   ├── index.html              # Main landing page
│   ├── css/
│   │   └── styles.css          # Stylesheet
│   ├── assets/
│   │   └── images/             # Image assets (logos, icons, etc.)
│   └── CNAME                   # Custom domain configuration
├── .gitignore                  # Git ignore file
└── README.md                   # This file (not published)
```

**Note:** Only content in the `src/` folder will be published to GitHub Pages. This keeps your repository clean and separates documentation from the actual website.

### Next Steps

Once the main VajraEdge tool is ready, we can expand this site with:
- Full documentation pages
- Getting started guides
- API reference
- Examples and tutorials
- Download/installation instructions
- Performance benchmarks
- Blog posts

---

© 2025 VajraEdge. All rights reserved.