
document.querySelector('.busca').addEventListener('submit', (event)=>{
  event.preventDefault();
  let input = document.querySelector('#searchInput').value;
  if(input !== ''){
      showWarning('Carregando...');
      getCity(input);
  }
});

function showWarning(msg){
  document.querySelector('.aviso').innerHTML = msg;
};

function getCity(city){
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`;
  let results = fetch(url);
  results.then(result => {
      return result.json();
  }).then(json => {
      showInfo({
          name: json.name,
          country: json.sys.country,
          city: json.sys.city,
          temp: json.main.temp,
          tempIcon: json.weather[0].icon,
          windSpeed: json.wind.speed,
          windAngle: json.wind.deg
      });
  });
};

function showInfo(json){
  showWarning('');
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
  document.querySelector('.resultado').style.display = 'block';
};

const getHours = () => {
  const clock = document.getElementsByClassName('clock')[0]
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const hour = hours < 10 ? `0${hours}` : hours
  const minute = minutes < 10 ? `0${minutes}` : minutes
  const second = seconds < 10 ? `0${seconds}` : seconds
  clock.innerHTML = `${hour}:${minute}:${second}`
}

setInterval(() => {
  getHours()
}, 1000)

const toggle = document.getElementById("toggle");
const refresh = document.getElementById("refresh");
const theme = window.localStorage.getItem("theme");

/* verifica se o tema armazenado no localStorage é escuro
se sim aplica o tema escuro ao body */
if (theme === "dark") document.body.classList.add("dark");

// event listener para quando o botão de alterar o tema for clicado//
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (theme === "dark") {
    window.localStorage.setItem("theme", "light");
  } else window.localStorage.setItem("theme", "dark");
});

refresh.addEventListener("click", () => {
  window.location.reload();
});
