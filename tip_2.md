## Estratexias e decisións (pseudocódigo)

### Posicionamento dos hotspots

```
OBXECTIVO: Colocar cada hotspot sobre a imaxe de fondo de forma que,
          ao redimensionar a ventá, sigan estando no mesmo sitio relativo
          á imaxe.

PASOS:
1. Obter ancho e alto da ventá.
2. Calcular aspect ratio da ventá (windowWidth / windowHeight).
3. Comparar co aspect ratio da imaxe orixinal.

   SE windowAspectRatio > imageAspectRatio:
       # A ventá é máis ancha proporcionalmente
       # -> A imaxe axústase pola altura (todo o alto visible)
       # As coordenadas x, y tradúcense directamente a porcentaxes
       x% = (x_orixinal / imageWidth) * 100
       y% = (y_orixinal / imageHeight) * 100

   SENÓN:
       # A ventá é máis alta proporcionalmente
       # -> A imaxe axústase polo ancho, aparecen bandas negras arriba/abaixo
       # Hai que escalar as coordenadas porque a imaxe visible é máis pequena
       factorEscala = windowAspectRatio / imageAspectRatio
       x% = ( (x_orixinal / factorEscala) / imageWidth ) * 100
       y% = ( (y_orixinal / factorEscala) / imageHeight ) * 100

4. Aplicar os valores como marxes superiores e esquerdas en porcentaxe.
   Isto despraza o hotspot respecto ao seu contedor, que está centrado.
```

### Manexo do globo de fala

```
OBXECTIVO: Mostrar un globo con título e descrición ao pasar o rato
          sobre un hotspot, e ocultalo ao saír.

PASOS:
1. Ao detectar mouseover sobre un .hot-spot:
   - Obter índice do hotspot (dataset.index).
   - Recuperar título e descrición do array hotSpots.
   - Calcular posición do hotspot na pantalla (getBoundingClientRect).
   - Calcular a posición do globo: arriba do hotspot (top = topHotspot - altoGlobo).
   - Centrar horizontalmente respecto ao hotspot.
   - Encher o globo co título e descrición.
   - Amosar o globo (display:block) e facelo visible (opacity:1).

2. Ao detectar mouseout:
   - Comprobar que non nos movemos a outro hotspot (relatedTarget).
   - Se é unha saída real, iniciar fade out (opacity:0) e ocultar despois.
```

### Debounce para o resize

```
OBXECTIVO: Evitar chamadas excesivas a positionHotSpots mentres se redimensiona.

PASOS:
1. Crear unha función debounce que reciba outra función e un tempo de espera.
2. Cada vez que se dispare o evento resize, cancelar o temporizador anterior
   e programar un novo para executar a función despois do tempo de espera.
3. Así só se executa cando o usuario deixa de redimensionar durante ese tempo.
```

## 