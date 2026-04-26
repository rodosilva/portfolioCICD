import markdownIt from 'markdown-it';
import bienvenidaRaw from '../assets/posts/bienvenida.md?raw';

const md = new markdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

// Remove YAML frontmatter from markdown
function stripFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (match) {
    return match[2];
  }
  return markdown;
}

// Wrap H2 and H3 sections with their content in divs with class h2-section or h3-section
function wrapHeadingSections(html) {
  // Create a temporary container
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  const elements = Array.from(temp.children);
  const result = [];
  let currentSection = null;
  let currentSectionType = null;
  
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const tagName = el.tagName.toLowerCase();
    
    // If we find an H2, create a new section
    if (tagName === 'h2') {
      // Close previous section if exists
      if (currentSection) {
        result.push(currentSection);
      }
      // Start new section
      currentSection = document.createElement('div');
      currentSection.className = 'h2-section';
      currentSectionType = 'h2';
      currentSection.appendChild(el.cloneNode(true));
    }
    // If we find an H3, create a new section
    else if (tagName === 'h3') {
      // Close previous section if exists
      if (currentSection) {
        result.push(currentSection);
      }
      // Start new section
      currentSection = document.createElement('div');
      currentSection.className = 'h3-section';
      currentSectionType = 'h3';
      currentSection.appendChild(el.cloneNode(true));
    }
    // If we find another heading (H1, H4, H5, H6), close the current section
    else if (/^h[1,4-6]$/.test(tagName)) {
      if (currentSection) {
        result.push(currentSection);
        currentSection = null;
        currentSectionType = null;
      }
      result.push(el.cloneNode(true));
    }
    // If we're in a section, add content to it
    else if (currentSection) {
      currentSection.appendChild(el.cloneNode(true));
    } 
    // Otherwise add to result
    else {
      result.push(el.cloneNode(true));
    }
  }
  
  // Don't forget the last section
  if (currentSection) {
    result.push(currentSection);
  }
  
  // Process H2 sections to extract images
  const processedResult = [];
  for (const item of result) {
    if (item.className === 'h2-section') {
      const imgs = item.querySelectorAll('img');
      if (imgs.length > 0) {
        // Restructure to have content on left and image on right
        item.classList.add('with-image');
        
        // Create content wrapper
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'h2-section-content';
        
        // Create image wrapper
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'h2-section-image';
        
        // Move all elements to content wrapper, except images which go to image wrapper
        const children = Array.from(item.children);
        for (const child of children) {
          if (child.tagName.toLowerCase() === 'img') {
            imageWrapper.appendChild(child.cloneNode(true));
          } else if (child.tagName.toLowerCase() === 'p' && child.querySelector('img')) {
            // Extract image from paragraph
            const img = child.querySelector('img');
            imageWrapper.appendChild(img.cloneNode(true));
            // Keep paragraph if it has other content
            if (child.textContent.trim()) {
              contentWrapper.appendChild(child.cloneNode(true));
            }
          } else {
            contentWrapper.appendChild(child.cloneNode(true));
          }
        }
        
        // Clear and rebuild the section
        item.innerHTML = '';
        item.appendChild(contentWrapper);
        item.appendChild(imageWrapper);
      }
    }
    processedResult.push(item);
  }
  
  // Convert back to HTML string
  const resultDiv = document.createElement('div');
  processedResult.forEach(el => resultDiv.appendChild(el));
  return resultDiv.innerHTML;
}

// Load and render markdown
export async function loadMarkdown() {
  try {
    // Strip YAML frontmatter and render markdown
    const cleanContent = stripFrontmatter(bienvenidaRaw);
    let html = md.render(cleanContent);
    
    // Wrap H2 and H3 sections
    html = wrapHeadingSections(html);
    
    return html;
  } catch (error) {
    console.error('Error loading markdown:', error);
    return '<p>Error cargando el contenido</p>';
  }
}
