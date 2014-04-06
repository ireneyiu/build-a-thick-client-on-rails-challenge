var App = {};

App.View = function(selectors) {
  this.selectors = selectors;
};
App.View.prototype = {
  emptyQuizzes: function(){
    $(this.selectors.allQuizzes).empty();
  },

  emptyQuestions: function(){
    $(this.selectors.question).empty();
  },

  renderQuizzes: function(data) {
    var quizTemplate = HandlebarsTemplates['quizzes/index']({quizzes: data});
    $(this.selectors.allQuizzes).append(quizTemplate);
  },

  renderQuestion: function(data){
    var questionTemplate = HandlebarsTemplates['questions/next']({question: data.question, question_id: data.question_id, choices: data.choices});
    $(this.selectors.question).html(questionTemplate);
  },

  renderFeedback: function(isCorrect){
    var feedbackTemplate = HandlebarsTemplates['questions/feedback']({correct: isCorrect})
    $(this.selectors.feedback).html(feedbackTemplate);
  },

  renderResults: function(data){
    var resultsTemplate = HandlebarsTemplates['quizzes/results']({numCorrect: data.num_correct, numIncorrect: data.num_incorrect})
    $(this.selectors.feedback).append(resultsTemplate);
  }
};

App.Controller = function(view, session) {
  this.view = view;
  this.session = session;
};
App.Controller.prototype = {

  getQuizzes: function() {
    this.session.generateKey();
    $.ajax({
      type: 'GET',
      url: '/quizzes.json',
      context: this,
      dataType: 'json'
    }).done(function(data){
      this.view.renderQuizzes(data.quizzes);
    }).fail(function(){
      console.log("getQuizzes failed")
    });
  },

  getNextQuestion: function(quizId){
    $.ajax({
      type: "GET",
      url: "quizzes/" + quizId + "/questions/next.json",
      context: this,
      dataType: 'json',
      data: {session_key: this.session.getKey()},
    }).done(function(data) {
      this.view.emptyQuizzes();
      this.view.renderQuestion(data.question);
    }).fail(function(response) {
      console.log(response.responseJSON.message);
      console.log("getNextQuestion failed");
    })
  },

  submitAnswer: function(form) {
    var url = form.attributes.action.nodeValue;
    var formData = $(form).serialize();
    formData += "&session_key=" + this.session.getKey();
    $.ajax({
      type: "POST",
      url: url + ".json",
      context: this,
      dataType: 'json',
      data: formData,
    }).done(function(data) {
      var result = data.status;
      this.view.renderFeedback(result.correct);
      if (result.more_questions == true){
        this.getNextQuestion(result.quiz_id);
      } else {
        this.view.emptyQuestions()
        this.view.renderResults(result);
      }
    }).fail(function() {
      console.log("submitAnswer failed");
    });
  }
};

App.Binder = function(controller, selectors) {
  this.controller = controller;
  this.selectors = selectors;
}
App.Binder.prototype = {
  bind: function() {
    this.bindQuiz();
    this.bindQuestionSubmit();
  },
  bindQuiz: function(){
    var self = this;
    $(self.selectors.allQuizzes).on('click', self.selectors.quizLink, function(event){
      event.preventDefault();
      var id = $(this).data("id");
      self.controller.getNextQuestion(id);
    })
  },
  bindQuestionSubmit: function() {
    var self = this;
    $(self.selectors.question).on('submit', self.selectors.questionForm, function() {
      event.preventDefault();
      self.controller.submitAnswer(this);
    });
  }
};

App.Session = function() {
  var key = "";
  return {
    generateKey: function() {
      var str = "";
      for(var i = 0; i < 15; i++){
        str += Math.floor(Math.random()*10);
      }
      key = str;
      return key;
    },
    getKey: function() {
      return key;
    }
  };
};


$(document).on('ready', function() {
  var selectors = {
    allQuizzes: '#quizzes',
    question: '#question',
    quizLink: '.quiz-link',
    questionForm: '.question-form',
    feedback: '#feedback'
  };

  App.view = new App.View(selectors);
  App.session = new App.Session();
  App.controller = new App.Controller(App.view, App.session);
  new App.Binder(App.controller, selectors).bind();
  App.controller.getQuizzes();
});

