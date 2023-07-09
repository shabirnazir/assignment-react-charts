import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart(props) {
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
    plugins: {
      title: {
        display: true,
        text: "Population growth",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
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
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Births",
        data: labels.map((month) => {
          const found = mergeDataWithSameMonth.find(
            (item) => item.month === month
          );
          return found ? found.births : 0;
        }),
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
