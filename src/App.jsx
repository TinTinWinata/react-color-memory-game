import { useEffect, useState } from 'react';
import './App.css';
import Box from './Box';

const defaultColors = [
  'bg-primary',
  'bg-success',
  'bg-danger',
  'bg-warning',
  'bg-info',
  'bg-dark',
  'bg-primary',
  'bg-success',
  'bg-danger',
  'bg-warning',
  'bg-info',
  'bg-dark',
];

function App() {
  const [colors, setColors] = useState(defaultColors);

  const [shows, setShows] = useState([]);
  const [tries, setTries] = useState(0);
  const [solved, setSolved] = useState(0);
  const [currentCheck, setCurrentCheck] = useState(null);
  const [isMemory, setIsMemory] = useState(false);
  const memoryTime = 500;

  const shuffle = () => {
    setColors((prev) => {
      const temp = [...prev];
      temp.sort(() => Math.random() - 0.5);
      return temp;
    });
  };

  const reset = () => {
    shuffle();
    setTries(0);
    setShows([]);
    setSolved(0);
    setCurrentCheck(null);
  };

  const removeShow = (value) => {
    setShows((prev) => {
      const temp = [...prev];
      const index = prev.findIndex((valShow) => valShow === value);
      temp.splice(index, 1);
      return temp;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (solved === colors.length / 2) {
        alert(`You're finishing already with ${tries} tries!`);
      }
    }, 50);
  }, [solved, colors.length]);

  const addSolved = () => {
    setSolved((prev) => prev + 1);
  };

  const addTries = () => {
    setTries((prev) => prev + 1);
  };

  const handleClick = (index) => {
    if (shows.includes(index)) return;

    setShows((prev) => [...prev, index]);
    if (currentCheck === null) {
      setCurrentCheck(index);
    } else {
      // Kalau udah ada current check maka check
      if (colors[index] === colors[currentCheck]) {
        // Sama
        addSolved();
      } else {
        // Beda
        setIsMemory(true);
        setTimeout(() => {
          setIsMemory(false);
          removeShow(index);
          removeShow(currentCheck);
          addTries();
        }, memoryTime);
      }
      setCurrentCheck(null);
    }
  };

  return (
    <div className="center">
      <div className="w-fit">
        <div className="box-container ">
          {colors.map((color, index) => (
            <Box
              isMemory={isMemory}
              handler={handleClick}
              index={index}
              show={shows.includes(index)}
              key={index}
              color={color}
            ></Box>
          ))}
        </div>
        <div className="w-100 mb-2 mt-5 d-flex text-container justify-content-between display-6">
          <div className="d-flex ">
            <div className="">Try : </div>
            <div className="">{tries}</div>
          </div>
          <div className="d-flex">
            <div className="">Solved : </div>
            <div className="">{solved}</div>
          </div>
        </div>
        <button
          onClick={reset}
          className="w-100 btn btn-primary input-block-level form-control"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
