import { useState, useRef, forwardRef,useImperativeHandle } from "react";
import ResultModal from "./ResultModal";

const ResultModal = forwardRef(function TimerChallenge({ title, targetTime }, ref) {

  useImperativeHandle(ref,()=>{
    return{
      open(){
        dialog.current.showModal();
      }
    }
  });

  const timer = useRef();
  const dialog = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  const handleStart = () => {
    timer.current = setTimeout(() => {
      setTimeExpired(true);
      dialog.current.open();
    }, targetTime * 1000);

    setTimerStarted(true);
  };

  const handleStop = () => {
    clearTimeout(timer.current);
  };

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        {timeExpired && <p>You Lost</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is Running..." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
})

export default ResultModal;