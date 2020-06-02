import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
} from "reactstrap";
import "./LineChart.css";

export default class BarChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
    };
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.currencyfrom !== this.props.currencyfrom ||
      prevProps.currencyto !== this.props.currencyto
    ) {
      this.componentDidMount();
    }
  }

  OneYearClose = () => {
    console.log("one year data");
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&outputsize=full&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        let close_rates = [];

        var OneYear = Object.keys(response.data["Time Series FX (Daily)"]);
        var date1 = OneYear.filter(function (obj) {
          var temp = new Date(obj);
          var date2 = temp.getDate();
          var month = (temp.getMonth()+1);
          var year = temp.getFullYear();
          return (
            (date2 <= dd && month <= mm && year == yyyy) ||
            (date2 >= dd && month >= mm && year == yyyy - 1)
          );
        });
        //console.log(date1);

        for (var i = 0; i < date1.length; i++) {
          close_rates.push(
            Object.values(response.data["Time Series FX (Daily)"])[i][
              "4. close"
            ]
          );
        }
        this.setState({
          Data: {
            labels: date1,
            datasets: [
              {
                label: "Closing Rates for the year",
                data: close_rates,
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
              },
            ],
          },
        });
      });
  };

  OneMonthClose = () => {
    console.log("one month data");
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&outputsize=full&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");

        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!

        var yyyy = today.getFullYear();

        let close_rates = [];

        var OneMonth = Object.keys(response.data["Time Series FX (Daily)"]);

        var date1 = OneMonth.filter(function (obj) {
          var temp = new Date(obj);
          var date2 = temp.getDate();
          var month = (temp.getMonth()+1);
          var year = temp.getFullYear();
         
          return (
            (date2 <= dd && month == mm && year == yyyy) ||
            (month == mm-1 && year == yyyy)
          );
        });

        console.log("data", date1);

        for (var i = 0; i < date1.length; i++) {
          close_rates.push(
            Object.values(response.data["Time Series FX (Daily)"])[i][
              "4. close"
            ]
          );
        }
        this.setState({
          Data: {
            labels: date1,
            datasets: [
              {
                label: "Closing Rates for the Month",
                data: close_rates,
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
              },
            ],
          },
        });
      });
  };

  OneWeekClose = () => {
    console.log("1 week close data");
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        const data = response.data["Time Series FX (Daily)"];
        let dates = [];
        let close_rate = [];
        for (var i = 0; i <= 5; i++) {
          dates.push(Object.keys(response.data["Time Series FX (Daily)"])[i]);
          close_rate.push(
            Object.values(response.data["Time Series FX (Daily)"])[i][
              "4. close"
            ]
          );
        }
        this.setState({
          Data: {
            labels: dates,
            datasets: [
              {
                label: "Closing Rate for the week",
                data: close_rate,
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
              },
            ],
          },
        });
      });
  };
  componentDidMount = () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&interval=30min&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        var close_rates = [];
        var dates = [];
        console.log("load data for the day");
        const data = response.data["Time Series FX (30min)"];
        //console.log(response.data["Time Series FX (30min)"]);

        const Oneday_date = Object.keys(
          response.data["Time Series FX (30min)"]
        );

        var date1 = Oneday_date.filter(function (obj) {
          var temp = new Date(obj);

          var date2 = temp.getDate();

          var today = new Date().getDate();

          return date2 == today;
        });
        //console.log(date1);
        for (var i = 0; i < date1.length; i++) {
          close_rates.push(
            Object.values(response.data["Time Series FX (30min)"])[i][
              "4. close"
            ]
          );
        }
        //console.log(close_rates);
        this.setState({
          Data: {
            labels: date1,
            datasets: [
              {
                label: "Closing Rates for the day",
                data: close_rates,
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
              },
            ],
          },
        });
      });
  };

  render() {
    return (
      <div>
        <div className="chart_container">
          <h4>
            Time Series Graph for {this.props.currencyfrom} to{" "}
            {this.props.currencyto}
          </h4>
          <Line 
            data={this.state.Data}
            options={{
              responsive: true,

              scales: {
               
                xAxes: [
                  {
                    display: false,
                  },
                ],
                yAxes: [
                  {
                    display: true,
                  },
                ],
              },
              legend: {
                labels: {
                  fontColor: "black",
                  fontSize: 15,
                },
              },
            }}
          />
        </div>
        <div id="button_wrapper">
          <button
            name="5day"
            className="button"
            //onClick={this.OneDayClose}
            onClick={this.componentDidMount}
          >
            1 D
          </button>

          <button name="1month" className="button" onClick={this.OneWeekClose}>
            1 W
          </button>

          <button
            name="6months"
            className="button"
            onClick={this.OneMonthClose}
          >
            1 M
          </button>

          <button name="ytd" className="button" onClick={this.OneYearClose}>
            1 Y
          </button>
        </div>
      </div>
    );
  }
}
