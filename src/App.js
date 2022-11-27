import './App.css';
// import Card from './Card';
import { useState, useEffect } from 'react';
import './Card.css'

function App() {

  /*** defining colours ***/

  const colours = {
    '#8c8b75': ['greens'],
    '#232620': ['blues', 'greens'],
    '#edf1f0': ['blues', 'greens'],
    '#5c331d': ['reds'],
    '#d6ba8d': ['yellows'],
    '#b7c8ad': ['greens'],
    '#795842': ['reds'],
    '#55615b': ['blues', 'greens'],
    '#a7b3ab': ['blues', 'greens'],
    '#0c361e': ['greens'],
    '#5a6f4a': ['greens'],
    '#223f49': ['blues'],
    '#8a957e': ['greens'],
    '#a78781': ['reds'],
    '#b5bfc9': ['blues'],
    '#7395a0': ['blues']
  };

  const [allCards, setAllCards] = useState([]); // only populated once
  const [cards, setCards] = useState([]); // card to show
  const [unsort, setUnsort] = useState(0);

  const [likes, setLikes] = useState([]);
  const [saved, setSaved] = useState([]);

  const [filters, setFilters] = useState([]);
  const [satSort, setSatSort] = useState(false);
  const [totalSat, setTotalSat] = useState(0);
  const [avgSat, setAvgSat] = useState(0);

  // load all cards
  useEffect(() => {
    const cardsTemp = [];
    for (let c in colours) {
      let s = getSaturation(c);
      cardsTemp.push(
        <div className='App-card'>
          <Card colour={c} name={c} key={c} saturation={s} filters={colours[c]} />
        </div>
      )
    }
    setAllCards(cardsTemp);
  }, [likes]);

  function getSaturation(hex) {
    let r = 0, g = 0, b = 0;
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];

    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      s = 0, l = 0;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    // console.log(s)
    return s
  }

  /*** FILTERING ***/

  function toggle(elt, arr, setter) {
    // if elt in list, remove
    if (arr.includes(elt)) {
      console.log('delete')
      setter(arr.filter(f => f !== elt));
    } else { // else add to arr
      console.log('concat')
      setter([elt].concat(arr));
    }
  }

  useEffect(() => {
    console.log('filters', filters)
    if (filters.length === 0) {
      setCards(allCards);
    } else {
      const cardsTemp = [];
      for (let c of allCards) {
        let cardColours = c.props.children.props.filters; // colour groups card falls under
        for (let cc of cardColours) {
          if (filters.includes(cc)) {
            cardsTemp.push(c);
            break;
          }
        }
      }
      setCards(cardsTemp);
    }
    setSatSort(false);
  }, [filters, allCards]);

  // sort
  useEffect(() => {
    console.log(satSort);
    if (satSort === true) {
      let sorted = [...cards];
      sorted = sorted.sort(
        function (a, b) {
          return a.props.children.props.saturation - b.props.children.props.saturation;
        }
      );
      setCards(sorted);
    }
  }, [satSort]);

  // save card
  useEffect(() => {
    let temp = [];
    let ts = 0;
    for (let l of likes) {
      ts += getSaturation(l);
      temp.push(
        <li style={{ 'fontSize': '12px' }}>
          {l}
        </li>
      )
    }
    setSaved(temp);
    setTotalSat(ts);
    if (ts !== 0) {
      setAvgSat(ts / (likes.length));
    } else {
      setAvgSat(0);
    }
  }, [likes]);

  function reset() {
    setFilters([]);
    setSatSort(false);
    setLikes([]);
  }

  function Card(props) {
    return (
      <div className="Card">
        <div className="Card-border">
          <div className="Card-colour" style={{ backgroundColor: props.colour }} />
          <div className='Card-text'>
            <h1>
              PANTONE
            </h1>
            <p>
              {props.name}
            </p>
            <p>
              Saturation: {props.saturation}%
              <button className='Card-button' onClick={() => toggle(props.name, likes, setLikes)}><h3>{likes.includes(props.name) ? 'unlike' : 'like'}</h3></button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // aggregating section with value on each card
  return (
    <div className="App">
      <div className='App-buttons'>
        <button onClick={() => toggle('reds', filters, setFilters)} style={{ 'backgroundColor': filters.includes('reds') ? '#55615b' : 'white' }}><p>Filter Red</p></button>
        <button onClick={() => toggle('blues', filters, setFilters)} style={{ 'backgroundColor': filters.includes('blues') ? '#55615b' : 'white' }}><p>Filter Blue</p></button>
        <button onClick={() => toggle('yellows', filters, setFilters)} style={{ 'backgroundColor': filters.includes('yellows') ? '#55615b' : 'white' }}><p>Filter Yellow</p></button>
        <button onClick={() => toggle('greens', filters, setFilters)} style={{ 'backgroundColor': filters.includes('greens') ? '#55615b' : 'white' }}><p>Filter Green</p></button>

        <button onClick={() => satSort === true ? setSatSort(false) : setSatSort(true)} style={{ 'backgroundColor': satSort === true ? '#55615b' : 'white' }}><p>Sort by saturation</p></button>
        <button onClick={() => reset()}><p>Reset</p></button>
      </div>
      <div className='App-body'>
        <div className='App-list'>
          <h1>Saved</h1>
          <h3>{saved.length !== 0 ? saved : 'like colours to add to saved list'}</h3>
          <p>Total saturation: {totalSat}</p>
          <p>Average saturation: {avgSat}</p>
        </div>
        <div className='App-cards'>
          {cards}
        </div>
      </div>
    </div >
  );
}

export default App;
