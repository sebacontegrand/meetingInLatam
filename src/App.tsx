import { ChangeEvent, useState } from "react";
import "./App.css";
import { dataArgentina } from "./dataArgentina";
import { dataColombia } from "./dataColombia";
import { dataMexico } from "./dataMexico";

function App() {
  const months: { [key: string]: number } = {
    enero: 0,
    febrero: 1,
    marzo: 2,
    abril: 3,
    mayo: 4,
    junio: 5,
    julio: 6,
    agosto: 7,
    septiembre: 8,
    octubre: 9,
    noviembre: 10,
    diciembre: 11,
  };
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(event.target.value));
  };
  const convertToDateFormat = (obj: { mes: any; dia: any }) => {
    const { mes, dia } = obj;
    const year = 2023;

    return new Date(year, months[mes], parseInt(dia));
  };

  const convertedDatesArgentina = dataArgentina.map(convertToDateFormat);
  const convertedDatesMexico = dataMexico.map(convertToDateFormat);
  const convertedDatesColombia = dataColombia.map(convertToDateFormat);
  const isMatchMexico = convertedDatesMexico.some((date) => {
    return (
      date.getDate() === selectedDate?.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  });
  const isMatchColombia = convertedDatesColombia.some((date) => {
    return (
      date.getDate() === selectedDate?.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  });
  const isMatchArgentina = convertedDatesArgentina.some((date) => {
    return (
      date.getDate() === selectedDate?.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  });
  const currentDay = selectedDate?.getDate();
  const currentMonth = selectedDate?.getMonth();
  const currentYear = selectedDate?.getFullYear();

  // Find the object with the matching date
  const feriadoArgentina = dataArgentina.find((obj) => {
    const { mes, dia } = obj;
    const objectDate = new Date(2023, months[mes], parseInt(dia));

    return (
      objectDate.getDate() === currentDay &&
      objectDate.getMonth() === currentMonth &&
      objectDate.getFullYear() === currentYear
    );
  });
  const feriadoMexico = dataMexico.find((obj) => {
    const { mes, dia } = obj;
    const objectDate = new Date(2023, months[mes], parseInt(dia));

    return (
      objectDate.getDate() === currentDay &&
      objectDate.getMonth() === currentMonth &&
      objectDate.getFullYear() === currentYear
    );
  });
  const feriadoColombia = dataColombia.find((obj) => {
    const { mes, dia } = obj;
    const objectDate = new Date(2023, months[mes], parseInt(dia));

    return (
      objectDate.getDate() === currentDay &&
      objectDate.getMonth() === currentMonth &&
      objectDate.getFullYear() === currentYear
    );
  });
  const motivoAr = feriadoArgentina
    ? feriadoArgentina.Motivo
    : "Motivo not found";
  const motivoMex = feriadoMexico ? feriadoMexico.Motivo : "Motivo not found";
  const motivoCol = feriadoColombia
    ? feriadoColombia.Motivo
    : "Motivo not found";
  const handleSelectChange = (event: {
    target: { value: any; checked: any };
  }) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedValue((prevSelectedValue) => [...prevSelectedValue, value]);
      console.log(isChecked);
    } else {
      setSelectedValue((prevSelectedValue) =>
        prevSelectedValue.filter((country) => country !== value)
      );
    }
  };
  const countries = [
    { id: "1", value: "Argentina", label: "Argentina" },
    { id: "2", value: "Mexico", label: "Mexico" },
    { id: "3", value: "Colombia", label: "Colombia" },
  ];
  const handleClick = () => {
    setSelectedDate(null);
    setSelectedValue([]);
  };
  return (
    <>
      {isMatchArgentina && selectedValue.includes("Argentina") ? (
        <p className="respuesta">
          {selectedDate &&
            `El dia ${selectedDate} es feriado en Argentina debido a: ${motivoAr}`}
        </p>
      ) : selectedDate ? (
        <h1>OK to Meet!!</h1>
      ) : (
        ""
      )}
      {isMatchMexico && selectedValue.includes("Mexico") ? (
        <p className="respuesta">
          {selectedDate &&
            `El dia ${selectedDate} es feriado en Mexico debido a: ${motivoMex}`}
        </p>
      ) : (
        ""
      )}
      {isMatchColombia && selectedValue.includes("Colombia") ? (
        <p className="respuesta">
          {selectedDate &&
            `El dia ${selectedDate} es feriado en Colombia debido a: ${motivoCol}`}
        </p>
      ) : (
        ""
      )}
      <header className="header">Next Latam Meeting </header>
      <section className="header1">
        <form>
          <hr className="line" />
          <hr />
          <label>Choose country</label>
          <hr />
          {countries.map((country) => (
            <div key={country.id}>
              <input
                type="checkbox"
                id={country.id}
                value={country.value}
                checked={selectedValue.includes(country.value)}
                onChange={handleSelectChange}
              />
              <label htmlFor={country.id}>{country.label}</label>
            </div>
          ))}
          <hr className="line1" />
          <label className="meet">Meeting Day?:</label>
          <hr className="line1" />
          <input
            value={selectedDate ? selectedDate.toISOString().split("-")[0] : ""}
            onChange={handleDateChange}
            type="datetime-local"
            id="meeting-time"
            name="meeting-time"
          />
          {selectedDate && <p>Selected Date: {selectedDate.toDateString()}</p>}
        </form>
        <hr className="line1" />
        <button onClick={handleClick}>Reset</button>
      </section>
    </>
  );
}

export default App;
