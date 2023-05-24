import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPause,
  faPlay,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import './Stopwatch.css';
import { useEffect, useRef, useState } from 'react';

function Stopwatch() {
  const [timer, setTimer] = useState('00 : 00');

  const [isPlay, setIsPlay] = useState(false);

  const [timeStart, setTimeStart] = useState(Date.now());

  const [timePause, setTimePause] = useState('');

  // const handlePlayPause = () => {
  //   isPlay && setTimePause(Date.now());
  //   setIsPlay((prev) => !prev);

  // };

  const handleFormatTime = (time) => {
    const days = Math.trunc(time / 86400000);
    time = time - days * 86400000;
    const daysToString = days < 1 ? '' : days < 10 ? `0${days} :` : `${days} 0`;

    const hours = Math.trunc(time / 3600000);
    time = time - hours * 3600000;
    const hoursToString =
      hours < 1 ? '' : hours < 10 ? `0${hours} :` : `${hours} :`;

    const minutes = Math.trunc(time / 60000);
    time = time - minutes * 60000;
    const minutesToString =
      minutes < 1 ? '00 :' : minutes < 10 ? `0${minutes} :` : `${minutes} :`;

    const seconds = Math.trunc(time / 1000);
    time = time - seconds * 1000;
    const secondsToString =
      seconds < 1 ? '00 :' : seconds < 10 ? `0${seconds} :` : `${seconds} :`;

    const ticks = Math.trunc(time / 10);
    const ticksToString = ticks < 10 ? `0${ticks}` : `${ticks}`;

    return (
      daysToString +
      hoursToString +
      minutesToString +
      secondsToString +
      ticksToString
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDiff = Date.now() - timeStart;
      const timer = handleFormatTime(timeDiff);
      setTimer(timer);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="stopwatch-container">
        <div className="stopwatch-container-display-time-line">
          <div className="stopwatch-container-display-time">{timer}</div>
        </div>

        {/* <div className="stopwatch-container-control">
          <div className="stopwatch-container-control-btn delete">
            <FontAwesomeIcon icon={faTrash} />
          </div>
          <div
            className="stopwatch-container-control-btn play"
            onClick={() => {
              handlePlayPause();
            }}
          >
            {isPlay ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </div>
          <div className="stopwatch-container-control-btn record">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Stopwatch;
