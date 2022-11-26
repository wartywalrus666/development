import './Card.css'

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
            {props.name}!
          </p>
          <p>
            {props.saturation}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
