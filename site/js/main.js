(function () {
  var options = ['block', 'pillar', 'slab', 'beam'];
  var correctAnswer = '';
  var canClick = true;
  var round = 0;
  var path = [
    { answer: 'slab', thought: 'slab' },
    { answer: 'block', thought: 'block' },
    { answer: 'pillar', thought: 'beam' },
    { answer: 'pillar', thought: 'football' }
  ];

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

  var helper = {
    capitalise: function capitalise(str) {
      if(typeof str !== 'string' || str.length == 0) return str;
      if(str.length == 1) return s.toUpperCase();
      return str.substr(0,1).toUpperCase() + str.substr(1).toLowerCase();
    }
  }

  setup();

  window.helper = helper;

}());