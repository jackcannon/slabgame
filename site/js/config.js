var availableAnswers = ['block', 'pillar', 'slab', 'beam'];
var availableThoughts = ['block', 'pillar', 'slab', 'beam', 'football', 'pattinson', 'bed'];

var configFunctions = {
  getFromPage: function getFromPage() {
    var path = [];

    $('#rounds li').each(function (key, item) {
      path.push({
        answer: item.children[0].value,
        thought: item.children[1].value
      });
    });

    return path;
  },
  addListItemHtml: function (answer, thought) {
    var html = '<li>';

    html += 'Answer: <select class="answer input-small">';
    for(var a in availableAnswers) {
      html += '<option value="' + availableAnswers[a] + '">' + helper.capitalise(availableAnswers[a]) + '!</option>';
    }
    html += '</select>';

    html += '  Thought: <select class="thought input-medium">';
    for(var t in availableThoughts) {
      html += '<option value="' + availableThoughts[t] + '">' + availableThoughts[t] + '.png</option>';
    }
    html += '</select>';

    html += '<button class="delete btn btn-danger" type="button"><i class="icon-remove icon-white"></i> Delete</button>';
    html += '<div class="btn-group">';
    html += '<button class="moveUp btn" type="button"><i class="icon-arrow-up"></i></button>';
    html += '<button class="moveDown btn" type="button"><i class="icon-arrow-down"></i></button>';
    html += '</div>';
    html += '</li>';
    $('#rounds').append(html);

    if(answer) {
      $('#rounds li')[$('#rounds li').length-1].children[0].value = answer;
    }

    if(thought) {
      $('#rounds li')[$('#rounds li').length-1].children[1].value = thought;
    }

    $('.delete').unbind('click');
    $('.delete').click(function (e) {
      $(e.currentTarget).parent()[0].remove();
    });

    $('.moveUp').unbind('click');
    $('.moveUp').click(function (e) {
      $('#rounds li').each(function (key, item) {
        if(item == $(e.currentTarget).parent().parent()[0]) {
          configFunctions.swapValues(key-1, key);
        }
      })
    });

    $('.moveDown').unbind('click');
    $('.moveDown').click(function (e) {
      $('#rounds li').each(function (key, item) {
        if(item == $(e.currentTarget).parent().parent()[0]) {
          configFunctions.swapValues(key, key+1);
        }
      });
    });
  },
  swapValues: function (a, b) {
    if(a < 0 || b < 0) return;
    if(a >= $('#rounds li').length || b >= $('#rounds li').length) return;

    var vals = configFunctions.getFromPage();

    $('#rounds li')[a].children[0].value = vals[b].answer;
    $('#rounds li')[a].children[1].value = vals[b].thought;

    $('#rounds li')[b].children[0].value = vals[a].answer;
    $('#rounds li')[b].children[1].value = vals[a].thought;
  }
};

server.get(function (data) {
  for(var r in data) {
    configFunctions.addListItemHtml(data[r].answer, data[r].thought);
  }
});

$('#save').click(function () {
  server.set(configFunctions.getFromPage());
});

$('#addRound').click(function () {
  configFunctions.addListItemHtml();
});
