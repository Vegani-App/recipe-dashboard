# Next Steps for Deployment

## ✅ What's already ready:

1. Complete React dashboard with recipe search
2. Netlify Functions for Spoonacular integration
3. Storage system in Netlify Blobs
4. iOS service updated (pending URL configuration)
5. Complete documentation

## 📋 Steps you need to follow:

### 1. Install dependencies

```bash
cd veganmaps-featured-dashboard
npm install
```

### 2. Create GitHub repository

✅ **DONE** - Repository already created at: https://github.com/Vegani-App/recipe-dashboard

### 3. Deploy to Netlify

#### Option A: From web interface (Recommended)

1. Go to https://app.netlify.com/
2. Click "Add new site" > "Import an existing project"
3. Connect your GitHub account
4. Select the `Vegani-App/recipe-dashboard` repo
5. Build configuration:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
6. Click "Deploy site"
7. Wait for deployment to finish (2-3 minutes)

#### Option B: With Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### 4. Configure environment variable in Netlify

1. In the Netlify dashboard, go to your site
2. Click "Site configuration" > "Environment variables"
3. Click "Add a variable"
4. Add:
   - **Key**: `SPOONACULAR_API_KEY`
   - **Value**: `your_spoonacular_api_key`
   - Mark as "Contains secret values"
5. Click "Create variable"
6. Redeploy: "Deploys" > "Trigger deploy" > "Deploy site"

### 5. Copy Netlify URL

After deployment, Netlify will give you a URL like:
- `https://your-site-name.netlify.app`

Copy this URL, you'll need it for the next step.

### 6. Update iOS code

1. Open: `Vegan Restaurants/Classes/Models/Services/FeaturedRecipesService.swift`

2. On line 27, replace:
   ```swift
   private let netlifyFunctionURL = "https://YOUR-NETLIFY-SITE.netlify.app/.netlify/functions/get-featured"
   ```

   With your real URL:
   ```swift
   private let netlifyFunctionURL = "https://your-site-name.netlify.app/.netlify/functions/get-featured"
   ```

3. Save the file

4. Build and test the app in Xcode

### 7. Test the dashboard

1. Open your Netlify URL in the browser
2. Search for "tacos" (for example)
3. Select 3 recipes
4. Click "Publish to App"
5. You should see a success message

### 8. Verify in iOS app

1. Open the app in the simulator
2. Go to the recipes section
3. You should see the 3 recipes you selected in the dashboard

### 9. Share with your client

1. Send them the dashboard URL
2. Share the `CLIENT-INSTRUCTIONS.md` file
3. Explain how to use it

## 🐛 Troubleshooting

### Dashboard doesn't load
- Verify that deployment completed successfully in Netlify
- Check logs in Netlify Dashboard > Functions

### "API key not configured"
- Verify you added `SPOONACULAR_API_KEY` in Netlify environment variables
- Redeploy the site after adding the variable

### iOS app doesn't load recipes
- Verify the URL in `FeaturedRecipesService.swift` is correct
- Test the endpoint directly in browser: `https://your-site.netlify.app/.netlify/functions/get-featured`
- Should return JSON with recipes

### Search error in dashboard
- Open browser console (F12)
- Go to "Network" tab
- Look for calls to `search-recipes`
- Check the specific error

## 📞 Support

If you have deployment issues, check:
- README.md (complete technical documentation)
- Netlify logs in the dashboard
- Browser console (F12) for frontend errors

## 🎉 Ready!

Once you complete these steps, your client will be able to manage featured recipes independently without needing Google Sheets.
