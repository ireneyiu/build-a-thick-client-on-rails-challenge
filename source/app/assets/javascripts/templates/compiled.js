(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['feedback.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  return "\n<p>You answered correctly!</p>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "\n<p>Wrong!</p>\n";
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.correct), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"useData":true});
templates['next.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\n    <input type=\"radio\" name=\"choice_id\" value=\""
    + escapeExpression(((helper = helpers.choice_id || (depth0 && depth0.choice_id)),(typeof helper === functionType ? helper.call(depth0, {"name":"choice_id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = helpers.choice || (depth0 && depth0.choice)),(typeof helper === functionType ? helper.call(depth0, {"name":"choice","hash":{},"data":data}) : helper)))
    + "<br>\n  ";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<h1>"
    + escapeExpression(((helper = helpers.question || (depth0 && depth0.question)),(typeof helper === functionType ? helper.call(depth0, {"name":"question","hash":{},"data":data}) : helper)))
    + "</h1>\n<form action=\"/questions/"
    + escapeExpression(((helper = helpers.question_id || (depth0 && depth0.question_id)),(typeof helper === functionType ? helper.call(depth0, {"name":"question_id","hash":{},"data":data}) : helper)))
    + "/answers\" method=\"post\" class=\"question-form\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.choices), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n  <input type=\"submit\" value=\"Submit\">\n</form>";
},"useData":true});
templates['index.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\n  <li>\n    <a href=\"/quizzes/"
    + escapeExpression(((helper = helpers.quiz_id || (depth0 && depth0.quiz_id)),(typeof helper === functionType ? helper.call(depth0, {"name":"quiz_id","hash":{},"data":data}) : helper)))
    + "/questions/next\" data-id=\""
    + escapeExpression(((helper = helpers.quiz_id || (depth0 && depth0.quiz_id)),(typeof helper === functionType ? helper.call(depth0, {"name":"quiz_id","hash":{},"data":data}) : helper)))
    + "\" class=\"quiz-link\">"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n  </li>\n  ";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<ul>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.quizzes), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n</ul>";
},"useData":true});
})();