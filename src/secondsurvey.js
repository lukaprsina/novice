import React from 'react';
import * as Survey from "survey-react";
import "survey-react/survey.css";

class SecondSurvey extends React.Component {
 //Define Survey JSON
 //Here is the simplest Survey with one text question
  json = {"completedHtml":"<p>Hvala za vaš čas!<p>","pages":[{"name":"page1","elements":[{"type":"radiogroup","name":"question2","title":"Družabna","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question3","title":"Uspešna","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question4","title":"Egoistična","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question5","title":"Sodobna","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question6","title":"Inteligentna","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question1","title":"Avanturistična","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question18","title":"Zapravljiva","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question17","title":"Iznajdljiva","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question16","title":"Odgovorna","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question15","title":"Poštena","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question14","title":"Samostojna","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question13","title":"Ustvarjalna","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question12","title":"Ukazovalna","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question11","title":"Delovna","choices":["1","2","3","4","5"],"colCount":5},{"type":"radiogroup","name":"question10","title":"Spoštljiva","choices":["1","2","3","4","5"],"colCount":5}],"title":"Drugi vprašalnik za oceno Lane Novak","description":"Še drugič izpolnite anketo ter kliknite gumb \"complete\". Hvala za vaš čas!"}],"cookieName":"survey2"}

 //Define a callback methods on survey complete
 onComplete(survey, options) {
  //Write survey results into database
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "https://hookb.in/jeJar03NkxUeBB23OrW0", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          console.log("done.");
      }
  };
  
  xhr.send(JSON.stringify(survey.data));
 }
 render() {
  //Create the model and pass it into react Survey component
  //You may create survey model outside the render function and use it in your App or component
  //The most model properties are reactive, on their change the component will change UI when needed.
  var model = new Survey.Model(this.json);
  return (<Survey.Survey model={model} onComplete={this.onComplete}/>);
  /*
  //The alternative way. react Survey component will create survey model internally
  return (<Survey.Survey json={this.json} onComplete={this.onComplete}/>);
  */
  //You may pass model properties directly into component or set it into model
  // <Survey.Survey model={model} mode="display"/>
  //or 
  // model.mode="display"
  // <Survey.Survey model={model}/>
  // You may change model properties outside render function. 
  //If needed react Survey Component will change its behavior and change UI.
 }
} 

export default SecondSurvey;