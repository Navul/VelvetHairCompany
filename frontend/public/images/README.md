# Logo Setup Instructions

## Save Your Logo Here

Please save your Velvet Hair Wigs logo image as:

**`velvet-logo.png`**

### Steps:
1. Take the logo image you provided (the circular gold/purple emblem with "VELVET HAIR WIGS" text)
2. Save it as `velvet-logo.png` in this directory (`frontend/public/images/`)
3. The logo will automatically appear throughout your website:
   - Header navigation bar
   - Footer
   - Login page
   - Register page
   - Any other pages that reference the logo

### Optimal Image Specifications:
- **Format**: PNG (with transparent background recommended)
- **Size**: 200x200 pixels or larger (square aspect ratio)
- **File name**: `velvet-logo.png` (exact name required)

### Current Logo Usage:
The logo is now configured to display at:
- **Header**: 40-56px (responsive)
- **Footer**: 40px
- **Login/Register**: 80px

All logos will scale automatically while maintaining aspect ratio.

---

**Note**: If you want to use a different filename, you'll need to update the image src in:
- `src/components/layout/Header.js`
- `src/components/layout/Footer.js`
- `src/pages/auth/Login.js`
- `src/pages/auth/Register.js`
