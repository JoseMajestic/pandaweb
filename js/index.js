const imageWidth = 2048,
    imageHeight = 1364,
    imageAspectRatio = imageWidth / imageHeight,
    $window = $(window);

const hotSpots = [{
  'title': 'Mouth',
  'description': 'scream.',
  'x': -500,
  'y': -50
}, {
  'title': 'Body',
  'description': 'Look at it.',
  'x': 208,
  'y': 20
}, {
  'title': 'Antlers',
  'description': 'They crazy.',
  'x': 40,
  'y': -240
}, {
  'title': 'This Ear',
  'description': 'It can hear things.',
  'x': -245,
  'y': -145
}];

const appendHotSpots = () => {
  hotSpots.forEach(() => {
    const $hotSpot = $('<div>').addClass('hot-spot');
    $('.container').append($hotSpot);
  });
  positionHotSpots();
};

const appendSpeechBubble = () => {
  const $speechBubble = $('<div>').addClass('speech-bubble');
  $('.container').append($speechBubble);
};

const handleHotSpotMouseover = (e) => {
  const $currentHotSpot = $(e.currentTarget),
      currentIndex = $currentHotSpot.index(),
      $speechBubble = $('.speech-bubble'),
      title = hotSpots[currentIndex]['title'],
      description = hotSpots[currentIndex]['description'],
      hotSpotTop = $currentHotSpot.offset().top,
      hotSpotLeft = $currentHotSpot.offset().left,
      hotSpotHalfSize = $currentHotSpot.width() / 2,
      speechBubbleHalfSize = $speechBubble.width() / 2,
      topTarget = hotSpotTop - $speechBubble.height(),
      leftTarget = (hotSpotLeft - (speechBubbleHalfSize)) + hotSpotHalfSize;
  
  $speechBubble.empty();
  $speechBubble.append($('<h1>').text(title));
  $speechBubble.append($('<p>').text(description));
  
  $speechBubble.css({
    'top': topTarget - 20,
    'left': leftTarget,
    'display': 'block'
  }).stop().animate({
    opacity: 1
  }, 200);
};

const handleHotSpotMouseout = () => {
  const $speechBubble = $('.speech-bubble');
  $speechBubble.stop().animate({
    opacity: 0
  }, 200, () => {
    $speechBubble.hide();
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

    $(this).css({
      'margin-top': yPos + '%',
      'margin-left': xPos + '%'
    });

  });
};

appendHotSpots();
appendSpeechBubble();
$(window).resize(positionHotSpots);
$('.hot-spot').on('mouseover', handleHotSpotMouseover);
$('.hot-spot').on('mouseout', handleHotSpotMouseout);