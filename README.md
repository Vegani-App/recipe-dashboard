# VeganMaps Featured Recipes Dashboard

Web dashboard to manage the 3 featured recipes that appear in the VeganMaps app.

## Features

- Search for vegan recipes in Spoonacular API
- Visual selection of up to 3 recipes
- Automatic publishing to iOS app
- Storage in Netlify Blobs (free)
- Responsive and modern interface

## Technologies

- **Frontend**: React + Vite
- **Backend**: Netlify Functions (serverless)
- **Storage**: Netlify Blobs
- **Hosting**: Netlify
- **API**: Spoonacular

## Local Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Netlify account

### Steps

1. **Install dependencies**

```bash
cd veganmaps-featured-dashboard
npm install
```

2. **Configure environment variables**

Create a `.env` file in the project root:

```env
SPOONACULAR_API_KEY=4861a1c88533447d98231d89f094135a
```

3. **Run in development**

```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`

## Deployment on Netlify

### Option A: Deploy from GitHub (Recommended)

1. **Create GitHub repository**

✅ **DONE** - Repository: https://github.com/Vegani-App/recipe-dashboard

2. **Connect with Netlify**

- Go to https://app.netlify.com/
- Click "Add new site" > "Import an existing project"
- Connect your GitHub account
- Select the `Vegani-App/recipe-dashboard` repo
- Build configuration:
  - Build command: `npm run build`
  - Publish directory: `dist`
- Click "Deploy site"

3. **Configure environment variables in Netlify**

- In Netlify dashboard, go to: Site settings > Environment variables
- Add the variable:
  - Key: `SPOONACULAR_API_KEY`
  - Value: `4861a1c88533447d98231d89f094135a`
- Save and redeploy the site

### Option B: Deploy with Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Configure iOS App

Once the dashboard is deployed, you need to update the URL in the iOS code:

1. Open file: `Vegan Restaurants/Classes/Models/Services/FeaturedRecipesService.swift`

2. Replace the URL on line 27:

```swift
// Before:
private let netlifyFunctionURL = "https://YOUR-NETLIFY-SITE.netlify.app/.netlify/functions/get-featured"

// After (replace with your real URL):
private let netlifyFunctionURL = "https://veganmaps-dashboard.netlify.app/.netlify/functions/get-featured"
```

3. Save the file and build the app

## Dashboard Usage

### For your client:

1. **Access the dashboard**
   - URL: `https://your-site.netlify.app`

2. **Search recipes**
   - Type search term (e.g., "tacos", "pasta", "curry")
   - Click "Search"
   - Up to 20 vegan recipes will be displayed

3. **Select recipes**
   - Click on the recipes you want to feature
   - Select exactly 3 recipes
   - Selected recipes will appear in the right panel

4. **Publish**
   - Once 3 recipes are selected, click "Publish to App"
   - Confirmation message: "Recipes published successfully!"
   - The app will update automatically

## Architecture

```
Dashboard React (Netlify)
   ↓
   Calls: /.netlify/functions/search-recipes
   ↓
Netlify Function → Spoonacular API (with secure API key)
   ↓
   Returns results to Dashboard
   ↓
   User selects 3 recipes
   ↓
   Dashboard calls: /.netlify/functions/save-featured
   ↓
   Saved in Netlify Blobs
   ↓
iOS App reads from: /.netlify/functions/get-featured
```

## Endpoints

### 1. Search recipes (private - only from dashboard)
```
GET /.netlify/functions/search-recipes?query=tacos&number=20
```

### 2. Save featured recipes (private - only from dashboard)
```
POST /.netlify/functions/save-featured
Body: [
  {
    "id": 123,
    "title": "Vegan Tacos",
    "image": "https://...",
    "readyInMinutes": 30,
    "servings": 4
  },
  ...
]
```

### 3. Get featured recipes (public - used by iOS app)
```
GET /.netlify/functions/get-featured

Response: {
  "recipes": [...],
  "updatedAt": "2025-10-31T..."
}
```

## Costs

Everything is **FREE** for your use case:

- **Netlify Hosting**: Free (100GB bandwidth/month)
- **Netlify Functions**: Free (125k invocations/month)
- **Netlify Blobs**: Free (100GB storage, 1M reads/month)
- **Spoonacular API**: Depends on your current plan

## Project Structure

```
veganmaps-featured-dashboard/
├── netlify/
│   └── functions/
│       ├── search-recipes.js    # Proxy to Spoonacular
│       ├── save-featured.js     # Save to Netlify Blobs
│       └── get-featured.js      # Endpoint for iOS
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── RecipeGrid.jsx
│   │   ├── RecipeCard.jsx
│   │   └── FeaturedPanel.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
└── README.md
```

## Troubleshooting

### Dashboard doesn't show recipes
- Verify that `SPOONACULAR_API_KEY` environment variable is configured in Netlify
- Check logs in: Netlify Dashboard > Functions

### iOS app doesn't load featured recipes
- Verify the URL in `FeaturedRecipesService.swift` is correct
- Test the endpoint in browser: `https://your-site.netlify.app/.netlify/functions/get-featured`
- Should return JSON with correct structure

### Error when publishing recipes
- Verify you selected exactly 3 recipes
- Check browser console (F12) for errors

## Support

To report bugs or request help, contact the developer.

## License

Private use for VeganMaps.
