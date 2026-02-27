Para que este código sexa máis moderno, faltan varios aspectos clave que mellorarían a súa lexibilidade, mantibilidade e rendemento segundo os estándares actuais de desenvolvemento web. Vou comentar os máis salientables:

### 1. Uso de `var` en lugar de `let` / `const`

- **`var`** ten un ámbito de función e pode causar efectos inesperados. Hoxe empréganse **`let`** (para variábeis que cambian) e **`const`** (para as que non). Por exemplo:

  ```javascript
  const imageWidth = 2048;
  const imageHeight = 1364;
  let hotSpots = [...];
  ```

### 2. Dependencia de jQuery

- O código usa jQuery para manipulación do DOM e eventos. Nos navegadores modernos pódese facer o mesmo con JavaScript puro (vanilla JS) de forma máis lixeira e con mellor rendemento. Por exemplo:
  - `$(window)` → `window`
  - `$('.container').append(...)` → `document.querySelector('.container').appendChild(...)` ou `insertAdjacentHTML`
  - Eventos: `addEventListener` en lugar de `.on()`.
- Isto reduce o tamaño do código e elimina unha dependencia externa.

### 3. Estrutura de datos pouco semántica

- O array `hotSpots` usa claves con comiñas simples, pero podería ser un array de obxectos tipados (con TypeScript) ou polo menos con propiedades claras. Ademais, os valores `x` e `y` son números relativos á imaxe, pero non está claro a súa unidade (píxeles?). Sería mellor comentalo ou usar nomes máis descritivos.

### 4. Falta de modularización

- O código está todo no ámbito global. Sería moderno encapsular a funcionalidade nun módulo (usando **ES6 modules**) para evitar colisións e facilitar a reutilización:

  ```javascript
  export function initHotSpots() { ... }
  ```

### 5. Uso de funcións tradicionais vs arrow functions

- As funcións como `function appendHotSpots() { ... }` poden substituírse por **arrow functions** cando non necesiten o seu propio `this`, o que fai o código máis conciso:

  ```javascript
  const appendHotSpots = () => { ... };
  ```

### 6. Manexo de eventos sen delegación

- Engádense os eventos con `$('.hot-spot').on('mouseover', ...)` despois de crear os elementos. Se se engaden máis dinamicamente, non funcionarían. Unha alternativa moderna é usar **delegación de eventos** desde o contedor, ou reactividade cun framework.

### 7. Cálculo de posicións mellorábel

- O cálculo de `desiredLeft` e `desiredTop` defínese pero non se usa (sobra). Ademais, a lóxica de axuste da posición segundo o aspect ratio podería simplificarse empregando **CSS moderno** (como `object-fit` ou `background-size`) e posicionamento con unidades relativas, en lugar de recalcular manualmente en JavaScript.

### 8. Debounce no evento `resize`

- O evento `resize` dispárase moi a miúdo. Sería moderno usar **debounce** ou **throttle** para non executar `positionHotSpots` centos de veces mentres se redimensiona.

### 9. Accesibilidade

- Os hotspots son só `div`s sen roles ARIA nin descricións para lectores de pantalla. Engadir atributos como `role="button"`, `aria-label` ou `tabindex` faríao máis inclusivo.

### 10. Uso de template strings

- No canto de concatenar con `+`, empréganse **template literals** (con comiñas invertidas) para facer o código máis lexible:

  ```javascript
  $(this).css({
    'margin-top': `${yPos}%`,
    'margin-left': `${xPos}%`
  });
  ```

### 11. Separación de responsabilidades

- As funcións mesturan lóxica de negocio, manipulación do DOM e eventos. Sería máis moderno separar en capas: un modelo de datos, unha vista e un controlador (ou usar un framework como React/Vue).

### 12. Uso de `const` para elementos DOM que non cambian

- Por exemplo, `$speechBubble` podería definirse fóra das funcións como constante para non ter que buscalo cada vez.

### Exemplo de refactorización sinxela (con JavaScript moderno e sen jQuery):

```javascript
const image = { width: 2048, height: 1364, aspect: 2048/1364 };
const hotspots = [
  { title: 'Mouth', description: 'scream.', x: -500, y: -50 },
  // ...
];

const container = document.querySelector('.container');
let speechBubble;

function createHotspots() {
  hotspots.forEach((_, index) => {
    const div = document.createElement('div');
    div.className = 'hot-spot';
    div.dataset.index = index;
    container.appendChild(div);
  });
  positionHotspots();
  addEventListeners();
}

function positionHotspots() {
  const winAspect = window.innerWidth / window.innerHeight;
  const scale = winAspect > image.aspect ? 'height' : 'width';
  // ... cálculo usando scale
  document.querySelectorAll('.hot-spot').forEach((el, i) => {
    const { x, y } = hotspots[i];
    let xPos, yPos;
    if (scale === 'height') {
      xPos = (x / image.width) * 100;
      yPos = (y / image.height) * 100;
    } else {
      // ... outro cálculo
    }
    el.style.marginTop = `${yPos}%`;
    el.style.marginLeft = `${xPos}%`;
  });
}

// ... resto de funcións con addEventListener, debounce, etc.
```

En resumo, para ser moderno este código debería:

- Usar `let`/`const`, arrow functions, template strings.
- Eliminar jQuery se é posible.
- Modularizar e evitar o ámbito global.
- Mellorar a accesibilidade e o rendemento (debounce, delegación).
- Separar a lóxica de presentación.