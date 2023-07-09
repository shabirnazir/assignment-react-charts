import React, { useState } from "react";
import { BarChart } from "../BarChart/BarChart";
import { LineChart } from "../LineChart/LineChart";
import css from "./LandingPage.module.css";

import Navbar from "../NavBar/NavBar";
const LandingPage = (props) => {
  const { socket } = props;
  const [chartType, setChartType] = useState("bar");
  const [data, setData] = useState([
    {
      month: "January",
      deaths: 4000,
      births: 2400,
    },
    {
      month: "February",
      deaths: 3000,
      births: 1398,
    },
    {
      month: "March",
      deaths: 2000,
      births: 9800,
    },
    {
      month: "April",
      deaths: 2780,
      births: 3908,
    },
    {
      month: "December",
      deaths: 1890,
      births: 4800,
    },
    {
      month: "January",
      deaths: 2000,
      births: 3800,
    },
  ]);
  socket.on("data", (data) => {
    setData(data);
  });
  let chart;
  switch (chartType) {
    case "bar":
      chart = <BarChart populationData={data} />;
      break;
    case "line":
      chart = <LineChart populationData={data} />;
      break;
    default:
      chart = <BarChart populationData={data} />;
  }
  const changeChart = (e) => {
    setChartType(e);
  };

  return (
    <div className={css.container}>
      <Navbar chartType={chartType} changeChart={changeChart} socket={socket} />

      <div className={css.chart}>{chart}</div>
    </div>
  );
};

export default LandingPage;
