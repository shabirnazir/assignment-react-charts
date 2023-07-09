import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart(props) {
  const { populationData } = props;

  const mergeDataWithSameMonth = populationData.reduce((acc, curr) => {
    const found = acc.find((item) => item.month === curr.month);
    if (found) {
      found.deaths += curr.deaths;
      found.births += curr.births;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Population growth",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Deaths",
        data: labels.map((month) => {
          const found = mergeDataWithSameMonth.find(
            (item) => item.month === month
          );
          return found ? found.deaths : 0;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Births",
        data: labels.map((month) => {
          const found = mergeDataWithSameMonth.find(
            (item) => item.month === month
          );
          return found ? found.births : 0;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
