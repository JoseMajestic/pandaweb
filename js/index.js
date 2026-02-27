const imageWidth = 2048,
    imageHeight = 1364,
    imageAspectRatio = imageWidth / imageHeight,
    $window = $(window),
    $container = $('.container');

let $speechBubble = null;

const hotSpots = [{
  'title': 'Casa',
  'description': 'Morada.',
  'x': -500,
  'y': -50
}, {
  'title': 'Montaña',
  'description': 'Peligroso.',
  'x': 208,
  'y': 20
}, {
  'title': 'Estrellas',
  'description': 'Muchas.',
  'x': 40,
  'y': -240
}, {
  'title': 'Cielo',
  'description': 'Tranquilo.',
  'x': -245,
  'y': -145
}];

const appendHotSpots = () => {
  hotSpots.forEach((_, index) => {
    const $hotSpot = $('<div>')
      .addClass('hot-spot')
      .attr('data-index', index)
      .attr('role', 'button')
      .attr('tabindex', '0');
    $container.append($hotSpot);
  });
  positionHotSpots();
};

const appendSpeechBubble = () => {
  $speechBubble = $('<div>').addClass('speech-bubble').css({ display: 'none', opacity: 0 });
  $container.append($speechBubble);
};

const handleHotSpotMouseover = (e) => {
  const $currentHotSpot = $(e.currentTarget),
      currentIndex = Number($currentHotSpot.data('index')),
      title = hotSpots[currentIndex]['title'],
      description = hotSpots[currentIndex]['description'];

  if (!$speechBubble) {
    return;
  }

  $speechBubble.empty();
  $speechBubble.append($('<h1>').text(title));
  $speechBubble.append($('<p>').text(description));

  $speechBubble.css({ display: 'block', opacity: 0 });
  const speechWidth = $speechBubble.outerWidth();
  const speechHeight = $speechBubble.outerHeight();

  const hotSpotOffset = $currentHotSpot.offset();
  const hotSpotHalfSize = $currentHotSpot.width() / 2;
  const speechBubbleHalfSize = speechWidth / 2;
  const topTarget = hotSpotOffset.top - speechHeight;
  const leftTarget = (hotSpotOffset.left - speechBubbleHalfSize) + hotSpotHalfSize;

  $speechBubble.css({
    'top': topTarget - 20,
    'left': leftTarget
  }).stop().animate({
    opacity: 1
  }, 200);
};

const handleHotSpotMouseout = (e) => {
  if (!$speechBubble) {
    return;
  }
  const relatedHotSpot = $(e.relatedTarget).closest('.hot-spot');
  if (relatedHotSpot.length) {
    return;
  }
  $speechBubble.stop().animate({
    opacity: 0
  }, 200, () => {
    $speechBubble.css({ display: 'none' });
  });
};

const positionHotSpots = () => {
  const windowWidth = $window.width(),
    windowHeight = $window.height(),
    windowAspectRatio = windowWidth / windowHeight,
    $hotSpot = $('.hot-spot');

  $hotSpot.each(function(index) {
    let xPos = hotSpots[index]['x'],
        yPos = hotSpots[index]['y'];

    if (windowAspectRatio > imageAspectRatio) {
      yPos = (yPos / imageHeight) * 100;
      xPos = (xPos / imageWidth) * 100;
    } else {
      yPos = ((yPos / (windowAspectRatio / imageAspectRatio)) / imageHeight) * 100;
      xPos = ((xPos / (windowAspectRatio / imageAspectRatio)) / imageWidth) * 100;
    }

    const yValue = index === 2 ? `calc(${yPos}% + 123px)` : `${yPos}%`;

    $(this).css({
      'margin-top': yValue,
      'margin-left': xPos + '%'
    });

  });
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

const init = () => {
  appendHotSpots();
  appendSpeechBubble();
  positionHotSpots();

  const debouncedResize = debounce(positionHotSpots, 150);
  $(window).on('resize', debouncedResize);

  $container.on('mouseenter', '.hot-spot', handleHotSpotMouseover);
  $container.on('mouseleave', '.hot-spot', handleHotSpotMouseout);
};

$(init);