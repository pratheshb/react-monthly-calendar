import './App.css';
import { useState } from 'react';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const rows = Array(6).fill();
  const Days = [
    { fullName: 'Monday', shortName: 'Mo' },
    { fullName: 'Tuesday', shortName: 'Tu' },
    { fullName: 'Wednesday', shortName: 'We' },
    { fullName: 'Thursday', shortName: 'Th' },
    { fullName: 'Friday', shortName: 'Fr' },
    { fullName: 'Saturday', shortName: 'Sa' },
    { fullName: 'Sunday', shortName: 'Su' },
  ]
  function handleAction(changeInMonth, changeInYear) {
    setSelectedDate(new Date(year + changeInYear, month + changeInMonth));
  }
  return (
    <div className="App">
      <div id="calendar">
        <div className="tool-bar">
          <div id="calendar-label">
            {`${year} / ${month < 9 ? 0 : ''}${month + 1}`}
          </div>
          <div className="action">
            <button title="Previous year" onClick={() => handleAction(0, -1)} id="dec-year">&#171;</button>
            <button title="Previous month" onClick={() => handleAction(-1, 0)} id="dec-month">&#8249;</button>
            <button title="Next month" onClick={() => handleAction(+1, 0)} id="inc-month">&#8250;</button>
            <button title="Next year" onClick={() => handleAction(0, +1)} id="inc-year" >&#187;</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              {
                Days.map(day => (
                  <th key={day.shortName}>
                    <span className="visually-hidden">{day.fullName}</span>
                    <span aria-hidden="true">{day.shortName}</span>
                    </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              rows.map((_, rowIndex) => (
                <Row
                  key={rowIndex}
                  month={month}
                  year={year}
                  rowIndex={rowIndex}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ month, year, rowIndex }) {
  const cols = Array(7).fill();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const firstDay = [6, 0, 1, 2, 3, 4, 5][new Date(year, month).getDay()];
  function getDate(colIndex) {
    const date = (rowIndex * 7) + (colIndex - firstDay) + 1;

    if ((rowIndex === 0 && colIndex < firstDay) || date > lastDate) {
      return '';
    }

    return date;
  }
  return (
    <tr>
      {
        cols.map((_, colIndex) => (
          <Day
            key={colIndex}
            date={getDate(colIndex)}
            month={month}
            year={year}
          />
        ))
      }
    </tr>
  )
}

function Day({ date, month, year }) {
  const today = new Date();
  const isToday = year === today.getFullYear() && month === today.getMonth() && date === today.getDate();
  return (
    <td
      className={isToday ? 'current-date' : null}
    >
      {date}
    </td>
  )
}

export default App;
