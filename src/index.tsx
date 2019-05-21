import React from "react";
import ReactDOM from "react-dom";
import { Rotate } from './lib/Rotate'
import axios from 'axios'
import 'normalize.css';

const requests = [69, 718, 620, 52, 332, 720, 433, 724, 87, 339, 165, 237].map((id) => axios.get(`https://www.superheroapi.com/api.php/1779843232115584/${id}`))


axios.all(requests)
  .then((results) => {
    const data = results.map((result: any) => (
      <div key={result.data.id} style={{
          height: '100%', 
          margin: '0', 
          borderRadius: '3px',
          fontFamily: '"Nanum Brush Script", cursive',
          backgroundImage: `url("${result.data.image.url}")`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color: '#fff',
        }}>
        <div style={{
          margin: 0,
          background: 'rgba(0,0,0,.3)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          borderRadius: '3px',
          padding: '0 0.6rem',
        }}>
          <span
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '-6px',
              padding: '0.2rem',
            }}
          >{result.data.name}</span>
        </div>
      </div>
    ))
    ReactDOM.render(
      <div style={{ 
        margin: 'auto', 
        padding: '0 24px',
        maxWidth: '1080px',
      }}>
        <link 
          href="https://fonts.googleapis.com/css?family=Caveat+Brush|Just+Me+Again+Down+Here|Nanum+Brush+Script" 
          rel="stylesheet"
        />
        <Rotate 
          numOfVisibleItems={5} 
          items={data} 
        />
      </div>
      , document.getElementById("root"));
  }).catch((errors) => {
    console.log(errors)
  });


