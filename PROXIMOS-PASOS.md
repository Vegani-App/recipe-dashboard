# Próximos Pasos para Deployment

## ✅ Lo que ya está listo:

1. Dashboard React completo con búsqueda de recetas
2. Netlify Functions para integración con Spoonacular
3. Sistema de almacenamiento en Netlify Blobs
4. Servicio iOS actualizado (pendiente configurar URL)
5. Documentación completa

## 📋 Pasos que debes seguir:

### 1. Instalar dependencias

```bash
cd veganmaps-featured-dashboard
npm install
```

### 2. Crear repositorio en GitHub

```bash
git init
git add .
git commit -m "Initial commit: VeganMaps Featured Dashboard"

# Si tienes GitHub CLI instalado:
gh repo create veganmaps-featured-dashboard --public --source=. --push

# O crea el repo manualmente en github.com y luego:
git remote add origin https://github.com/TU-USUARIO/veganmaps-featured-dashboard.git
git branch -M main
git push -u origin main
```

### 3. Deploy en Netlify

#### Opción A: Desde la interfaz web (Recomendado)

1. Ve a https://app.netlify.com/
2. Click en "Add new site" > "Import an existing project"
3. Conecta tu cuenta de GitHub
4. Selecciona el repo `veganmaps-featured-dashboard`
5. Configuración de build:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
6. Click en "Deploy site"
7. Espera a que termine el deploy (2-3 minutos)

#### Opción B: Con Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### 4. Configurar variable de entorno en Netlify

1. En el dashboard de Netlify, ve a tu sitio
2. Click en "Site configuration" > "Environment variables"
3. Click en "Add a variable"
4. Agrega:
   - **Key**: `SPOONACULAR_API_KEY`
   - **Value**: `4861a1c88533447d98231d89f094135a`
5. Click en "Create variable"
6. Haz un redeploy: "Deploys" > "Trigger deploy" > "Deploy site"

### 5. Copiar la URL de Netlify

Después del deploy, Netlify te dará una URL como:
- `https://your-site-name.netlify.app`

Copia esta URL, la necesitarás para el siguiente paso.

### 6. Actualizar el código iOS

1. Abre: `Vegan Restaurants/Classes/Models/Services/FeaturedRecipesService.swift`

2. En la línea 27, reemplaza:
   ```swift
   private let netlifyFunctionURL = "https://YOUR-NETLIFY-SITE.netlify.app/.netlify/functions/get-featured"
   ```

   Con tu URL real:
   ```swift
   private let netlifyFunctionURL = "https://your-site-name.netlify.app/.netlify/functions/get-featured"
   ```

3. Guarda el archivo

4. Compila y prueba la app en Xcode

### 7. Probar el dashboard

1. Abre tu URL de Netlify en el navegador
2. Busca "tacos" (por ejemplo)
3. Selecciona 3 recetas
4. Click en "Publicar en la App"
5. Deberías ver un mensaje de éxito

### 8. Verificar en la app iOS

1. Abre la app en el simulador
2. Ve a la sección de recetas
3. Deberías ver las 3 recetas que seleccionaste en el dashboard

### 9. Compartir con tu clienta

1. Envíale la URL del dashboard
2. Comparte el archivo `INSTRUCCIONES-PARA-CLIENTA.md`
3. Explícale cómo usarlo

## 🐛 Solución de Problemas

### El dashboard no carga
- Verifica que el deploy se completó exitosamente en Netlify
- Revisa los logs en Netlify Dashboard > Functions

### "API key not configured"
- Verifica que agregaste `SPOONACULAR_API_KEY` en las variables de entorno de Netlify
- Redeploya el sitio después de agregar la variable

### La app iOS no carga las recetas
- Verifica que la URL en `FeaturedRecipesService.swift` sea correcta
- Prueba el endpoint directamente en el navegador: `https://tu-sitio.netlify.app/.netlify/functions/get-featured`
- Debería devolver JSON con las recetas

### Error de búsqueda en el dashboard
- Abre la consola del navegador (F12)
- Ve a la pestaña "Network"
- Busca llamadas a `search-recipes`
- Revisa el error específico

## 📞 Soporte

Si tienes problemas con el deployment, revisa:
- README.md (documentación técnica completa)
- Netlify logs en el dashboard
- Consola del navegador (F12) para errores del frontend

## 🎉 ¡Listo!

Una vez completados estos pasos, tu clienta podrá gestionar las recetas destacadas de forma independiente sin necesidad de Google Sheets.
