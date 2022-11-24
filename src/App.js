import './App.css';
// import Card from './Card';
import { useState, useEffect } from 'react';
import './Card.css'

function App() {

  /*** defining colours ***/

  const colours = {
    'lightpink': ['reds'],
    'lightblue': ['blues'],
    'rosybrown': ['reds'],
    'khaki': ['yellows'],
    'lavender': ['blues'],
    'beige': ['yellows'],
    'rebeccapurple': ['blues'],
    'orange': ['yellows'],
    'darkolivegreen': ['greens'],
    'darkslategrey': ['greens', 'blues'],
    'forestgreen': ['greens'],
    'olive': ['greens', 'yellows']
  };

  const [allCards, setAllCards] = useState([]); // only populated once
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const cardsTemp = [];
    for (let c in colours) {
      cardsTemp.push(
        <div className='App-card'>
          <Card colour={c} name={c} key={c} filters={colours[c]} />
        </div>
      )
    }
    setAllCards(cardsTemp);
  }, []);

  /*** FILTERING ***/

  const [filters, setFilters] = useState([]);

  function toggle(colour) {
    // if colour in filters, remove
    if (filters.includes(colour)) {
      setFilters(filters.filter(f => f !== colour));
    } else { // else add to arr
      setFilters([colour].concat(filters));
    }
  }

  useEffect(() => {
    if (filters.length === 0) {
      setCards(allCards);
    } else {
      const cardsTemp = [];
      for (let c in colours) {
        for (let f of colours[c]) {
          // console.log(filters, colours[c][f])
          if (filters.includes(f)) {
            console.log('hooray!');
            cardsTemp.push(
              <div className='App-card'>
                <Card colour={c} name={c} key={c} filters={colours[c]} />
              </div>
            )
            break;
          }
        }
      }
      setCards(cardsTemp);
      console.log(cardsTemp);
    }
  }, [filters]);

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
          </div>
        </div>
      </div>
    );
  }

  // two filtering categories
  // one sorting feature
  // aggregating section with value on each card
  return (
    <div className="App">
      <div className='App-buttons'>
        <button onClick={() => toggle('reds')}><p>Filter Red</p></button>
        <button onClick={() => toggle('blues')}><p>Filter Blue</p></button>
        <button onClick={() => toggle('yellows')}><p>Filter Yellow</p></button>
        <button onClick={() => toggle('greens')}><p>Filter Green</p></button>
      </div>
      <div className='App-cards'>
        {cards}
      </div>
    </div>
  );
}

export default App;
