---
title: "Bienvenido a mi Blog"
date: "2024-04-19"
tags: ["introducción", "markdown"]
excerpt: "Este es mi primer post. Te mostraré cómo funciona este blog creado con React y Markdown."
---

# Rodrigo Silva

**_⚙️ Sr Infrastructure Engineer | ⚙️ DevOps/GitOps Infrastructure |☁️ Cloud AWS Architect Associate | ☁️ Terraform Associate | 🐧 Linux_**

## About
![Perfil](/portfolio/profile.jpg)

**Ingeniero Electrónico** titulado y dedicado a la tecnología por más de 10 años.
Durante los últimos 5 años, con un especial énfasis en el diseño y el manejo de soluciones de infraestructura usando herramientas como **Docker, AWS, Terraform, Bash,** entre otras.

Siempre apuntando a la automatización a través de **CI/CD** bajo una metodología **DevOps.**

Responsable de roles tales como: **Sr infrastructure and Enterprise Engineer** y **Teach Lead System Admin.**

Certificado en **AWS Architect, Terraform Associate, ITIL4.** Y un ingles avanzado tanto escrito como hablado.

Formado con grandes valores interpersonales y una comunicación que facilita el buen trabajo en equipo

## Proyectos Personales

### Portafolio en Github Pages Desplegado Usando CI/CD (GitHub Actions)
Esta misma web ha es el reflejo del proyecto que se detalla a continuación.

Mas allá del `frontEnd` de `JavaScript + React` compilado con `Vite`, este proyecto intenta reflejar un flujo que usa `GiHub Actions` a modo de reflejar un despliegue `CI/CD`

Es decir, la aplicación se lleva a una imagen `Docker` que finalmente es desplegada en un `GitHub Pages`

- **Repositorio GitHub:** [portfolio](https://github.com/rodosilva/portfolio)

**Stack Tecnológico:**

**1. Frontend**
- `React 19 + Vite` como build tool
- Renderiza blog dinamicamente desde archivos Markdown
- `markdown-it` para conversión `MD → HTML`
- Estilos `CSS inline` (simplista)

**2. Procesamiento de Contenido**
- Posts almacenados en posts como archivos `.md`
- Loader personalizado `(markdown-loader.js)` que:
    - Importa archivos `Markdown` como `raw`
    - Elimina `YAML frontmatter`
    - Convierte a `HTML` con `markdown-it`

**3. Contenerización**
- Dockerfile multi-stage:
    - **Etapa 1 (builder):** `Node.js Alpine` → compila `React` con `Vite`
    - **Etapa 2 (runtime):** `Nginx Alpine` → sirve archivos estáticos
- Imagen final optimizada (~20MB aprox)

**4. Servicio Web**
- `Nginx` como servidor `HTTP`
Sirve archivos estáticos del directorio `/dist`
Puerto `80`

**5. CI/CD & Despliegue**
- `GitHub Actions` automatiza todo
- Construye imagen `Docker`
- Push a `registry` `(Docker Hub/GitHub Packages)`
- Despliega a `GitHub Pages`

**Flujo**
```
MarkDown edits → GitHub Push → GitHub Actions → Build Docker → Push Registry → Deploy GitHub Pages
```