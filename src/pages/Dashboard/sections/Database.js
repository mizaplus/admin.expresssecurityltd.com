//Importing helper functions
import React, { useState, useEffect } from "react";

//Importing core components
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";

//Importing styles
import styles from "../styles.module.css";

let chart_1_2_3_options = {
  curve: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
  },
};

const Database = ({ entries }) => {
  const [is14, setMode] = useState(false);
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    let GraphData = {
      biWeekly: (canvas) => {
        let ctx = canvas.getContext("2d");
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors//blue colors

        return {
          labels: entries.biWeekly.map(
            (item) =>
              `${item.date.split(" ")[1]} ${item.date
                .split(" ")[0]
                .slice(0, 3)}`
          ),
          datasets: [
            {
              label: "Database Performance",
              fill: true,
              tension: 0.35,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: entries.biWeekly.map((item) => item.performance),
            },
          ],
        };
      },
      weekly: (canvas) => {
        let ctx = canvas.getContext("2d");
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors//blue colors

        return {
          labels: entries.weekly.map(
            (item) =>
              `${item.date.split(" ")[1]} ${item.date
                .split(" ")[0]
                .slice(0, 3)}`
          ),
          datasets: [
            {
              label: "Database Performance",
              fill: true,
              tension: 0.35,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: entries.weekly.map((item) => item.performance),
            },
          ],
        };
      },
      options: chart_1_2_3_options,
    };
    // const weekly = {
    //   labels: entries.weekly.map((item) => item.date.split(" ")[1]),
    //   data: entries.weekly.map((item) => item.performance),
    // };
    // const biWeekly = {
    //   labels: entries.biWeekly.map((item) => item.date.split(" ")[1]),
    //   data: entries.biWeekly.map((item) => item.performance),
    // };
    setChartData(GraphData);
  }, [entries]);

  return (
    <div className={styles.graph}>
      <div className={styles.header}>
        <div>
          <p className={styles.tagline}>Database Engine: Dynamo DB</p>
          <h4 className={styles.title}>Database Performance.</h4>
        </div>
        <div className={styles.buttons}>
          <div
            className={!is14 ? styles.active : styles.inActive}
            onClick={() => setMode(false)}
          >
            <p>Past 7 Days.</p>
          </div>
          <div
            className={is14 ? styles.active : styles.inActive}
            onClick={() => setMode(true)}
          >
            <p>Past 14 Days.</p>
          </div>
        </div>
      </div>
      {chartData && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              <Line
                data={is14 ? chartData.biWeekly : chartData.weekly}
                options={chartData.options}
                className={styles.chart}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Database;
