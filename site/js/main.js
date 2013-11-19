(function () {
  var images = [
    './img/apprentice.png',
    './img/beam.png',
    './img/bed.png',
    './img/bg.png',
    './img/block.png',
    './img/football.png',
    './img/pattinson.png',
    './img/pillar.png',
    './img/shine-green.png',
    './img/shine-red.png',
    './img/shine-white.png',
    './img/slab.png',
    './img/speech.png',
    './img/thought.png',
    './img/witt.png'
  ];
  helper.preload(images);


  var options = ['block', 'pillar', 'slab', 'beam'];
  var correctAnswer = '';
  var canClick = true;
  var round = 0;
  var path = [];

  $('.option').click(function (e) {
    if(canClick) {
      canClick = false;
      $(e.currentTarget).addClass('chosen');
      $('#speechBubble').hide();
      $('#thoughtBubble').hide();
      setTimeout(function () {
        setup();
      }, 3000);
    }
  });

  function setup() {
    var answer = path[round % path.length];
    correctAnswer = answer.answer;

    $('.option').removeClass('chosen');
    $('.option').removeClass('correct');
    $('.option').addClass('wrong');
    $('#' + correctAnswer).removeClass('wrong');
    $('#' + correctAnswer).addClass('correct');
    $('#speechText').html(helper.capitalise(correctAnswer) + '!');
    $('#speechBubble').show();
    setTimeout(function () {
      canClick = true;
      $('#thoughtImage').attr('src', './img/' + answer.thought + '.png');
      $('#thoughtBubble').show();
      round++;
    }, 1000);
  }

  server.get(function (data) {
    path = data;
    setup();
  });

}());