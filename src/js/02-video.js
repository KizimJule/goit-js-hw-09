import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
// player.on('timeupdate', throttle(onPlay, 1000));

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function ({ seconds }) {
    console.log(seconds);
    localStorage.setItem('videoplayer-current-time', seconds);
  }, 1000)
);

const timePauseVideo = localStorage.getItem('videoplayer-current-time');
if (timePauseVideo) {
  player.setCurrentTime(timePauseVideo);
  // .then(function (seconds) {})
  // .catch(function (error) {
  //   switch (error.name) {
  //     case 'RangeError':
  //       console.log(
  //         'the time was less than 0 or greater than the video’s duration'
  //       );
  //       break;
  //     default:
  //       // some other error occurred
  //       break;
  //   }
  // });
}
