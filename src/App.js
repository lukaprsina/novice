import React from 'react';
import ReactDOM from 'react-dom';
import FirstSurvey from './firstsurvey'
import SecondSurvey from './secondsurvey'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      papers: [0, 1, 2, 3, 4],
    }
    this.handleMove = this.handleMove.bind(this);
    this.maxPapers = 4;
  }

  swipeHandler() {
    let touchstartX = 0;
    let touchendX = 0;
    
    const gestureZone = document.getElementById('canvas');
    
    gestureZone.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);
    
    gestureZone.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleGesture();
        
    }, false);
    
    function handleGesture() {
      if ((touchendX <= touchstartX) && ((touchstartX - touchendX) >  100)) {
        document.getElementsByClassName("move")[1].click()
      }
      
      if ((touchendX >= touchstartX) && ((touchendX - touchstartX) >  100)) {
        document.getElementsByClassName("move")[0].click()
      }
    }
  }

  handleMove(value) {
    var move = 0;
    var papers = this.state.papers;
    var papersLength = papers.length - 1;

    value.target.id === "left" ? move = 1 : move = -1;

    switch(move) {
      case -1:
        if(papersLength > 0) {
          papers.pop();
        }
        break;

      case 1:
        if(papersLength < this.maxPapers) {
          papers.push(papersLength + 1)
        }
        break;

      default:
        console.log("Error. Not enough papers");
    }

    this.setState({
      "papers": papers,
    });
  }

  componentDidMount() {
    function vignetteResize() {
      var vignette = document.getElementById("vignette");
      var maxVignette = Math.max(window.screen.width, window.screen.height);
      vignette.style.width = maxVignette + "px";
      vignette.style.height = maxVignette + "px";
    }

    document.getElementsByTagName("body")[0].onresize = function() {vignetteResize()};
    vignetteResize();

    this.swipeHandler();
    
  }

  render() {
    const papers = this.state.papers.map((number) =>
      <Paper key={number} active={(this.state.papers.length - 1)  === number} number={number}/>
    );

    return(
      <div id="canvas">
        <div id="vignette"></div>
        <Move
          dir="left"
          onMove={this.handleMove}
        />
          <div id="papers">
            {papers}
          </div>
        <Move
          dir="right"
          onMove={this.handleMove}
        />
      </div>
    );
  }
}

class Move extends React.Component {
  constructor(props) {
    super(props);
    this.handleMove = this.handleMove.bind(this);
  }

  handleMove(event) {
    this.props.onMove(event);
  }

  render() {
    return (
      <button
        className="move"
        id={this.props.dir}
        onClick={this.handleMove}
      >
        <img src={require("./img/arrow.svg")} alt="move" id={this.props.dir}></img>
      </button>
    )
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

class Paper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ""}
    this.handleChange = this.handleChange.bind(this);

    this.mystyle = {
      transform: "translate(-50%,-50%) rotate(" + randInt(-20, 20)/10 + "deg) translate(" + randInt(-20, 20)/10 + "px, " + randInt(-20, 20)/10 + "px)",
      transformOrigin: randInt(0, 1000)/10 + "% " + randInt(0, 1000)/10 + "%",
    };
  }
  
  handleChange(value) {
    this.setState({
      text: value,
    })
  }

  render() {
    switch(this.props.number) {
      case 0:
        return (
          <div className="paper" style={this.props.active ? {} : this.mystyle} id={this.props.active ? "active" : ""}>
            <SecondSurvey />
          </div>
        );

      case 1:
        return(
          <div className="paper" style={this.props.active ? {} : this.mystyle} id={this.props.active ? "active" : ""}>
            <p>Po pritožbi Lane na sodišče je ponovne raziskava ugotovila, da so v podjetju nakupili okna višjega kvalitetnega razreda, kot je občina v načrtu predvidevala.</p>
            <p>Izplačali so ji odškodnino v višini 30.000 € in ji izbrisali kazen iz kartoteke.</p>
            <br /><br />
            
            <p><i>Še enkrat izpolnite anketo.</i></p>
          </div>
        );

      case 2:
        return (
          <div className="paper" style={this.props.active ? {} : this.mystyle} id={this.props.active ? "active" : ""}>
            <p>Lanino podjetje je večja občina najela za izgradnjo novega stanovanjskega objekta. Firma je finančno plat podjetja prepustilo Lani.</p>
            <p>Ko se je gradnja približevala koncu, so ugotovili, da jim manjka 10.000 €. Po krajši raziskavi so obtožili Lano in sodišče ji je naložilo 20.000€ globe in 100 ur družbeno-koristnega dela.</p>
          </div>
        );

      case 3:
        return (
          <div className="paper" style={this.props.active ? {} : this.mystyle} id={this.props.active ? "active" : ""}>
            <FirstSurvey />
          </div>
        );

      case 4:
        return (
          <div className="paper" style={this.props.active ? {} : this.mystyle} id={this.props.active ? "active" : ""}>
            <p>Lana Novak je tajnica v uspešnem gradbenem podjetju. Na svoje delo vedno prihaja pravočasno in nadrejeni pravijo, da dela uspešno in samostojno.</p>
            <p>Stara je 36 let in živi v srečni družini. Mož Borut je zaposlen v znanem lokalnem računalniškem podjetju. Imata 2 otroka, dečka Luko in deklico Ano.</p>
            <p>V prostem času rada kolesari in se sprehaja v naravi. Z družino zelo radi hodijo na izlete v tuje dežele, Ana pa se rada lepo oblači ter občasno uporablja modne dodatke.</p>
            <br /><br />
            
            <p><i>Prosimo, da se pomaknete na naslednjo stran. Na računalniku se pomikate z uporabo gumbov, na telefonu pa z drsanjem. Vedno se lahko vrnete tudi na prejšnje strani.</i></p>
          </div>
        );

      default:
        return(null);
    }
  }
}



var rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


export default App;