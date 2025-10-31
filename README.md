# VeganMaps Featured Recipes Dashboard

Dashboard web para gestionar las 3 recetas destacadas que aparecen en la app VeganMaps.

## Características

- Búsqueda de recetas veganas en Spoonacular API
- Selección visual de hasta 3 recetas
- Publicación automática a la app iOS
- Almacenamiento en Netlify Blobs (gratis)
- Interfaz responsive y moderna

## Tecnologías

- **Frontend**: React + Vite
- **Backend**: Netlify Functions (serverless)
- **Almacenamiento**: Netlify Blobs
- **Hosting**: Netlify
- **API**: Spoonacular

## Instalación Local

### Prerequisitos

- Node.js 18+
- npm o yarn
- Cuenta en Netlify

### Pasos

1. **Instalar dependencias**

```bash
cd veganmaps-featured-dashboard
npm install
```

2. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
SPOONACULAR_API_KEY=4861a1c88533447d98231d89f094135a
```

3. **Ejecutar en desarrollo**

```bash
npm run dev
```

El dashboard estará disponible en `http://localhost:5173`

## Deployment en Netlify

### Opción A: Deploy desde GitHub (Recomendado)

1. **Crear repositorio en GitHub**

```bash
cd veganmaps-featured-dashboard
git init
git add .
git commit -m "Initial commit: VeganMaps Featured Dashboard"
gh repo create veganmaps-featured-dashboard --public --source=. --push
```

2. **Conectar con Netlify**

- Ve a https://app.netlify.com/
- Click en "Add new site" > "Import an existing project"
- Conecta tu cuenta de GitHub
- Selecciona el repo `veganmaps-featured-dashboard`
- Configuración de build:
  - Build command: `npm run build`
  - Publish directory: `dist`
- Click en "Deploy site"

3. **Configurar variables de entorno en Netlify**

- En el dashboard de Netlify, ve a: Site settings > Environment variables
- Agrega la variable:
  - Key: `SPOONACULAR_API_KEY`
  - Value: `4861a1c88533447d98231d89f094135a`
- Guarda y redeploy el sitio

### Opción B: Deploy con Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Configurar la App iOS

Una vez deployado el dashboard, necesitas actualizar la URL en el código iOS:

1. Abre el archivo: `Vegan Restaurants/Classes/Models/Services/FeaturedRecipesService.swift`

2. Reemplaza la URL en la línea 27:

```swift
// Antes:
private let netlifyFunctionURL = "https://YOUR-NETLIFY-SITE.netlify.app/.netlify/functions/get-featured"

// Después (reemplaza con tu URL real):
private let netlifyFunctionURL = "https://veganmaps-dashboard.netlify.app/.netlify/functions/get-featured"
```

3. Guarda el archivo y compila la app

## Uso del Dashboard

### Para tu clienta:

1. **Acceder al dashboard**
   - URL: `https://tu-sitio.netlify.app`

2. **Buscar recetas**
   - Escribir término de búsqueda (ej: "tacos", "pasta", "curry")
   - Click en "Buscar"
   - Se mostrarán hasta 20 recetas veganas

3. **Seleccionar recetas**
   - Click en las recetas que quieras destacar
   - Selecciona exactamente 3 recetas
   - Las recetas seleccionadas aparecerán en el panel derecho

4. **Publicar**
   - Una vez seleccionadas las 3 recetas, click en "Publicar en la App"
   - Mensaje de confirmación: "¡Recetas publicadas exitosamente!"
   - La app se actualizará automáticamente

## Arquitectura

```
Dashboard React (Netlify)
   ↓
   Llama a: /.netlify/functions/search-recipes
   ↓
Netlify Function → Spoonacular API (con API key segura)
   ↓
   Devuelve resultados al Dashboard
   ↓
   Usuario selecciona 3 recetas
   ↓
   Dashboard llama a: /.netlify/functions/save-featured
   ↓
   Se guarda en Netlify Blobs
   ↓
App iOS lee de: /.netlify/functions/get-featured
```

## Endpoints

### 1. Búsqueda de recetas (privado - solo desde dashboard)
```
GET /.netlify/functions/search-recipes?query=tacos&number=20
```

### 2. Guardar recetas featured (privado - solo desde dashboard)
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

### 3. Obtener recetas featured (público - usado por app iOS)
```
GET /.netlify/functions/get-featured

Response: {
  "recipes": [...],
  "updatedAt": "2025-10-31T..."
}
```

## Costos

Todo es **GRATIS** para tu caso de uso:

- **Netlify Hosting**: Gratis (100GB bandwidth/mes)
- **Netlify Functions**: Gratis (125k invocaciones/mes)
- **Netlify Blobs**: Gratis (100GB storage, 1M lecturas/mes)
- **Spoonacular API**: Depende de tu plan actual

## Estructura del Proyecto

```
veganmaps-featured-dashboard/
├── netlify/
│   └── functions/
│       ├── search-recipes.js    # Proxy a Spoonacular
│       ├── save-featured.js     # Guardar en Netlify Blobs
│       └── get-featured.js      # Endpoint para iOS
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

## Solución de Problemas

### El dashboard no muestra recetas
- Verifica que la variable de entorno `SPOONACULAR_API_KEY` esté configurada en Netlify
- Revisa los logs en: Netlify Dashboard > Functions

### La app iOS no carga las recetas featured
- Verifica que la URL en `FeaturedRecipesService.swift` sea correcta
- Prueba el endpoint en el navegador: `https://tu-sitio.netlify.app/.netlify/functions/get-featured`
- Debe devolver JSON con la estructura correcta

### Error al publicar recetas
- Verifica que hayas seleccionado exactamente 3 recetas
- Revisa la consola del navegador (F12) para ver errores

## Soporte

Para reportar bugs o pedir ayuda, contacta al desarrollador.

## Licencia

Uso privado para VeganMaps.
