import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import axios from 'axios';
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";


class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  constructor(props){
    super(props);
    this.state={
      registeredUsers:0,
      monthYear:"",
      vendors:0,
      vendorRevenue:0,
      datapie: {
                  labels: [],
                  series: []
              },
      legendpie:{
                  names: ["Theatres", "Restaurants", "ID verification"],
                  types: ["info", "danger", "warning"]
                },
      databar:{
        labels: [],
        series: []
      },
      dataSales:{
        labels: [],
        series: []
      }
              
      
    }
  }

  componentDidMount() {
    axios.get(`http://information-xpress-node.herokuapp.com/users/count`, {
      headers:
        {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Content-Type': 'application/json'
        }
    })
      .then(res => {
        console.log(res);
        this.setState({registeredUsers:res.data.count});
        console.log("Registered Users");
        console.log(this.state.registeredUsers);
      });

      axios.get(`http://information-xpress-node.herokuapp.com/vendors/count`, {
        headers:
          {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            'Content-Type': 'application/json'
          }
      })
        .then(res => {
          console.log(res);
          this.setState({vendors:res.data.count});
          console.log("Vendors");
          console.log(this.state.vendors);
        });
      
        axios.get(`http://information-xpress-node.herokuapp.com/vendors/revenue`, {
          headers:
            {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
              'Content-Type': 'application/json'
            }
        })
          .then(res => {
            console.log(res);
            this.setState({vendorRevenue:res.data.revenue});
            console.log("vendor revenue");
            console.log(this.state.vendorRevenue);
          });

          axios.get(`http://information-xpress-node.herokuapp.com/month`, {
            headers:
              {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
                'Content-Type': 'application/json'
              }
          })
            .then(res => {
              console.log(res);
              this.setState({monthYear:res.data.month});
              console.log("month");
              console.log(this.state.monthYear);
            });

          //COMMENT FROM HERE


            axios.get(`http://information-xpress-node.herokuapp.com/charts/pie`, {
              headers:
                {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
                  'Content-Type': 'application/json'
                }
            })
              .then(res => {
                console.log("datapie");
                console.log(res);
                this.setState({datapie:res.data.datapie});
              });
            axios.get(`http://information-xpress-node.herokuapp.com/charts/bar`, {
                headers:
                  {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
                    'Content-Type': 'application/json'
                  }
              })
                .then(res => {
                  console.log("databar");
                  console.log(res);
                  this.setState({databar:res.data});
                });
            axios.get(`http://information-xpress-node.herokuapp.com/charts/line`, {
                  headers:
                    {
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
                      'Content-Type': 'application/json'
                    }
                })
                  .then(res => {
                    console.log("datasales");
                    console.log(res);
                    this.setState({dataSales:res.data});
                  });

  }



  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-success" />}
                statsText="Registered Users"
                statsValue={this.state.registeredUsers}
                statsIcon=""
                statsIconText=""
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-shopbag text-success" />}
                statsText="Vendors"
                statsValue={this.state.vendors}
                statsIcon=""
                statsIconText=""
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Vendor Revenue"
                statsValue={this.state.vendorRevenue}
                statsIcon=""
                statsIconText=""
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-timer text-success" />}
                statsText="Month/Year"
                statsValue={this.state.monthYear}
                statsIcon=""
                statsIconText=""
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Revenue distribution"
                category="Source of Revenue"
                stats="Revenue distribution stats"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={this.state.datapie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(this.state.legendpie)}</div>
                }
              />
            </Col>
            <Col md={6}>
            <Card
                id="chartActivity"
                title="Vendor Revenue in Thousands"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.databar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>
            <Col md={12} >
            <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Hits Per Vendor"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }

                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            
          </Row>
        </Grid>
        <center>
        <div id="chart_div" style={{"width": "900px", "height": "500px"}}></div>
        </center>
      </div>
    );
  }
}

export default Dashboard;
