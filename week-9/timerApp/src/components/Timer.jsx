import { useEffect, useState } from 'react';
import { calculateTime, formatTime } from '../utils/auxiliaryFunctions';
import style from './Timer.module.css';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [editField, setEditField] = useState({ field: null, value: '' });

  useEffect(() => {
    const progress =
      initialTime > 0 ? ((initialTime - time) / initialTime) * 100 : 0;
    document.documentElement.style.setProperty('--progress', `${progress}%`);
  }, [time, initialTime]);

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevState) => prevState - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      setTime(initialTime);
      document.documentElement.style.setProperty('--progress', `0%`);
    }

    return () => {
      clearInterval(interval);
    };
  }, [time, isRunning, initialTime]);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setEditField((prevState) => ({ ...prevState, value }));
  };

  const handleEditField = (field) => {
    if (editField.field === field) {
      const newTime = {
        ...formatTime(time),
        [field]: editField.value.padStart(2, '0'),
      };

      const calculatedTime = calculateTime(
        newTime.hours,
        newTime.minutes,
        newTime.seconds
      );

      setTime(calculatedTime);
      setInitialTime(calculatedTime);

      setEditField({ field: null, value: '' });
    } else {
      setIsRunning(false);
      setEditField({
        field,
        value: formatTime(time)[field].replace(/^0+/, ''),
      });
    }
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className={style.timerApp}>
      <div className={style.timerDisplay}>
        <div className={style.timerCircle}>
          <div className={style.timerTime}>
            {editField.field === 'hours' ? (
              <input
                type='text'
                onChange={handleInputChange}
                value={editField.value}
                onBlur={() => handleEditField('hours')}
                className={style.timeInput}
                autoFocus
              />
            ) : (
              <span
                className={style.timeUnit}
                onClick={() => handleEditField('hours')}
              >
                {hours}
              </span>
            )}
            :
            {editField.field === 'minutes' ? (
              <input
                type='text'
                onChange={handleInputChange}
                value={editField.value}
                onBlur={() => handleEditField('minutes')}
                className={style.timeInput}
                autoFocus
              />
            ) : (
              <span
                className={style.timeUnit}
                onClick={() => handleEditField('minutes')}
              >
                {minutes}
              </span>
            )}
            :
            {editField.field === 'seconds' ? (
              <input
                type='text'
                onChange={handleInputChange}
                value={editField.value}
                onBlur={() => handleEditField('seconds')}
                className={style.timeInput}
                autoFocus
              />
            ) : (
              <span
                className={style.timeUnit}
                onClick={() => handleEditField('seconds')}
              >
                {seconds}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={style.actionButtons}>
        <button
          className={style.actionButton}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className={style.action}
          onClick={() => {
            setTime(initialTime);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
