
# WEB APP BASADA EN JAVASCRIPT Y REACT CONTENERIZADO Y DESPLEGADO EN GITHUB PAGES

## DESCRIPCIÓN 
La idea en general es tener una página estática tipo blog. Siendo está creada gracias a lenguajes y frameworks tales como `React` y `Javascript`.

No obstante, se desea que el despliegue sea mediante una metodología `CICD`. Es por ello que esta `web app` se conteneriza mediante `Docker` y se sube a un `registry`.

Dicha imagen, es finalmente utilizada para el despliegue hacia un `GitHub Pages`.

Todos los pasos son ejecutados por `GitHub Actions`. Es por ello que el único trabajo del usuario (osea nosotros) es actualizar el `MarkDown` para añadir contenido a la web.

## ARQUITECTURA

### Stack Tecnológico:

#### 1. Frontend
- `React 19 + Vite` como build tool
- Renderiza blog dinamicamente desde archivos Markdown
- `markdown-it` para conversión `MD → HTML`
- Estilos `CSS inline` (simplista)

#### 2. Procesamiento de Contenido
- Posts almacenados en posts como archivos `.md`
- Loader personalizado `(markdown-loader.js)` que:
    - Importa archivos `Markdown` como `raw`
    - Elimina `YAML frontmatter`
    - Convierte a `HTML` con `markdown-it`

#### 3. Contenerización
- Dockerfile multi-stage:
    - **Etapa 1 (builder):** `Node.js Alpine` → compila `React` con `Vite`
    - **Etapa 2 (runtime):** `Nginx Alpine` → sirve archivos estáticos
- Imagen final optimizada (~20MB aprox)

#### 4. Servicio Web
- `Nginx` como servidor `HTTP`
Sirve archivos estáticos del directorio `/dist`
Puerto `80`

#### 5. CI/CD & Despliegue
- `GitHub Actions` automatiza todo
- Construye imagen `Docker`
- Push a `registry` `(Docker Hub/GitHub Packages)`
- Despliega a `GitHub Pages`

### Flujo
```
MarkDown edits → GitHub Push → GitHub Actions → Build Docker → Push Registry → Deploy GitHub Pages
```

## DESARROLLO


### Markdown
Todo empieza con el `Markdown`. Que al día de la fecha es este: 
- [Bienvenida](./src/assets/posts/bienvenida.md)

Es aquí donde deberemos actualizar lo que deseamos todo el formato `.md`

### Dockerfile
Si quisiéramos probar de forma local, podríamos hacerlo.

Primero creando la imagen:
```bash
source .env.local
docker build -t $DOCKER_IMAGE_NAME:$DOCKER_TAG .
```

Y luego corriendo el contenedor:
```bash
docker run --name $DOCKER_CONTAINER_NAME --rm --publish $PORT:$PORT $DOCKER_IMAGE_NAME:$DOCKER_TAG
```

