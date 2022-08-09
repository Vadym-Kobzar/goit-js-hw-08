import Player from '@vimeo/player';
import { throttle } from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = localStorage.getItem("videoplayer-current-time");
console.log(LOCALSTORAGE_KEY);


player.setCurrentTime(LOCALSTORAGE_KEY).then(function (seconds) {
    // seconds = реальное время попыток
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // время было меньше 0 или больше
            break;

        default:
            // другая ошибка
            break;
    }
});

player.on('timeupdate', throttle(function (time) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(time.seconds));
 
}, 1000));