```javascript

// ============================================
// CONFIGURACIÓN INICIAL (const para valores fixos)
// ============================================
// imageWidth e imageHeight
// imageAspectRatio = imageWidth / imageHeight; // 1.5 aproximadamente

// Lista de puntos interactivos (const porque non se reasigna)
// hotSpots = [ ... ]

// Referencias ao DOM (const, xa que son elementos fixos)
// container
// let speechBubble = null; // Crearémolo despois

// ============================================
// CREACIÓN DOS ELEMENTOS
// ============================================
function appendHotSpots() {
  // Por cada hotspot, creamos un div e engadímolo ao contedor
  // Engadimos un atributo data-index para saber a que hotspot corresponde
  // Melloramos accesibilidade
}

function appendSpeechBubble() {
  // Creamos o globo de fala unha soa vez
  // Oculto inicialmente
}

// ============================================
// POSICIONAMENTO DOS HOTSPOTS (cálculo porcentual)
// ============================================
function positionHotSpots() {
  // Seleccionamos todos os hotspots
  // Obtemos as coordenadas do hotspot correspondente
  // Calculamos a posición en porcentaxe segundo o aspect ratio
  // A ventá é máis ancha en proporción: axustamos por altura
  // A ventá é máis alta en proporción: aplicamos un factor de escala
  // Aplicamos as coordenadas como marxes (desprazamento respecto ao centro orixinal)
}

// ============================================
// MANEXO DO GLOBO DE FALA (mouseover / mouseout)
// ============================================
function handleHotSpotMouseover(event) {
  // 1. Encher o contido do globo
  // 2. Facelo visible pero transparente para poder medilo
  // 3. Forzar o reflow para que o navegador calcule as dimensións
  // 4. Obter dimensións reais
  // 5. Posición do hotspot
  // 6. Calcular a posición (centrada horizontalmente, enriba do hotspot)
  // 7. Aplicar as coordenadas
  // 8. Amosar coa transición (opacidade 1)
}

function handleHotSpotMouseout(event) {
  // Só se saímos do hotspot (non dos fillos)
  // Agardamos a que remate a transición para ocultalo
  // mesmo tempo que a transición CSS (se a houbese)
}

// ============================================
// DEBOUNCE PARA OPTIMIZAR O EVENTO RESIZE
// ============================================
function debounce(func, delay) {
  // ...
}

// ============================================
// INICIALIZACIÓN
// ============================================
function init() {
  // posición inicial
  // Engadimos escoitadores de eventos con delegación
  // Resize con debounce para non saturar
}

// Arrancamos cando o DOM estea listo
// document.addEventListener('DOMContentLoaded', init);

```