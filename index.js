import Swal from 'sweetalert2';
import './style.css';
import coinImg from './assets/coin.svg';

const coinInput = document.querySelector('#coin-input');
const search = document.querySelector('.btnSearch');
const title = document.querySelector('.coins-title');
const coinsList = document.querySelector('.coins');

const fetchAPI = (coin) => {
  return fetch(`https://api.exchangerate.host/latest?base=${coin}`)
    .then((response) => response.json())
    .then((data) => {
      if(data.base !== coin.toUpperCase()) {
        throw new Error('Moeda não existente');
      }
      return data.rates;
    }); 
}

const searchCoin = (event) => {
  event.preventDefault();
  const coin = coinInput.value.toUpperCase();

  if(!coin) {
    Swal.fire({
      icon: 'error',
      title: 'Ops',
      text: 'Error'
    });
    return;
  }

  title.textContent = `Valores referentes a 1 ${coin.toUpperCase()}`;
  fetchAPI(coin)
    .then(render)
    .catch((error) => {
      title.textContent = '';
      coinsList.innerHTML = '';
      Swal.fire({
        icon: 'error',
        title: 'Ops',
        text: error.message
      });
    });
}

function render(coins) {
  // console.log(coins);
  coinsList.innerHTML = '';
  const coinsArray = Object.entries(coins);
  
  coinsArray.forEach((coin) => {
    const [coinName, coinValue] = coin;

    console.log('Name', coinName);
    console.log('Value', coinValue);

    const img = document.createElement('img');
    const li = document.createElement('li');
    const span = document.createElement('span');
    img.src = coinImg;

    li.textContent = `${coinName} - `;
    span.textContent = `${coinValue}`;
    li.appendChild(img);
    li.appendChild(span);
    coinsList.appendChild(li);
  });
}

search.addEventListener('click', searchCoin);