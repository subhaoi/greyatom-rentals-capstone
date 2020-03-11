import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { SearchFilter } from '../SearchFilter';
import { MapFilter } from '../MapFilter';
import { Tabs } from '../Tabs';

import data from "./data.json";
import "./App.css";
import { EntryPage } from '../EntryPage';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { show : true , buttontext: "Map View",
        itemsToDisplay: [],
        itemsToUse: [],
        areas: [],
        bedrooms : []
        };
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }


    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron customjumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/entry" component={EntryPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            <div className="restcontainer">
                    <h1>Western Suburbs House Rentals</h1>
                </div>
                <div className="restfilter">
                  <div>
                    Filter by area : &nbsp;
                    <select className="custom-select" id="restfilter" onChange={this.optionSelected}>
                      <option value="any">Choose Any</option>
                      {this.state.areas.map(area => {
                        return <option value={area}>{area}</option>;
                      })}
                    </select>
                  </div>
                  <div>
                  Filter by bedrooms : &nbsp;
                    <select className="custom-select"  id="restbedfilter" onChange={this.optionSelected}>
                      <option value="any">Choose Any</option>
                      {this.state.bedrooms.map(bedroom => {
                        return <option value={bedroom}>{bedroom}</option>;
                      })}
                    </select>
                  </div>
                  <div>
                    Sort by : &nbsp;
                    <select className="custom-select"  id="sortfilter" onChange={this.sortBy}>
                      <option value="rentdes">Rent: High to Low</option>
                      <option value="rentasc">Rent: Low to High</option>
                      <option value="ratingasc">Rating: Low to High</option>
                      <option value="ratingdes">Rating: High to Low</option>
                    </select>
                  </div>
                </div>  
              <Tabs>
                <div label="List View">
                  <SearchFilter itemsToDisplay={this.state.itemsToDisplay}/>
                </div>
                <div label="Map View">
                  <MapFilter itemsToDisplay={this.state.itemsToDisplay}/>
                </div>
              </Tabs>
            </div>
             
        );
    }
    
    filterOnSearch = event => {
      if (
        !event.target.value ||
        event.target.value === " " ||
        event.target.value === ""
      )
        this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
      else {
        let itemsToDisplay = [];
        itemsToDisplay = this.state.itemsToUse.filter(
          item =>
            item["Name"]
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
            item["Area"]
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
            item["City"].toLowerCase().includes(event.target.value.toLowerCase())
        );
        this.setState({ itemsToDisplay });
      }
    };
  
    optionSelected = () => {
      var e = document.getElementById("restbedfilter");
      var f = document.getElementById("restfilter");
      var bedselected = e.options[e.selectedIndex].text;
      var areaselected = f.options[f.selectedIndex].text;
  
      if (bedselected === "Choose Any" & areaselected === "Choose Any")
        this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
      else if (bedselected !== "Choose Any" & areaselected === "Choose Any")
      {
        let itemsToDisplay = [];
        itemsToDisplay = this.state.itemsToUse.filter(item =>
          item["Bedrooms"].toLowerCase().includes(bedselected.toLowerCase())
        );
  
        this.setState({ itemsToDisplay });
      }
      else if (bedselected !== "Choose Any" & areaselected !== "Choose Any")
      {
        let itemsToDisplay = [];
        itemsToDisplay = this.state.itemsToUse.filter(item =>
          item["Bedrooms"].toLowerCase().includes(bedselected.toLowerCase())).filter(item =>
          item["Area"].toLowerCase().includes(areaselected.toLowerCase())
        );
  
        this.setState({ itemsToDisplay });
      }
      else {
        let itemsToDisplay = [];
        itemsToDisplay = this.state.itemsToUse.filter(item =>
          item["Area"].toLowerCase().includes(areaselected.toLowerCase())
        );
        this.setState({ itemsToDisplay });
      }
    };
  
    sortBy = () => {
      var e = document.getElementById("sortfilter");
      var selected = e.options[e.selectedIndex].value;
  
      if (selected === "rentdes")
        {
        let itemsToDisplay = [...this.state.itemsToDisplay];
        itemsToDisplay.sort(function(a, b) {
          return b["Rent"] - a["Rent"];
        });
        this.setState({ itemsToDisplay });
      }
      else if (selected === "rentasc") {
        let itemsToDisplay = [...this.state.itemsToDisplay];
        itemsToDisplay.sort(function(a, b) {
          return a["Rent"] - b["Rent"];
        });
        this.setState({ itemsToDisplay });
      }
      else if (selected === "ratingasc") {
        let itemsToDisplay = [...this.state.itemsToDisplay];
        itemsToDisplay.sort(function(a, b) {
          return a["Rating"] - b["Rating"];
        });
        this.setState({ itemsToDisplay });
      }
      else if (selected === "ratingdes") {
        let itemsToDisplay = [...this.state.itemsToDisplay];
        itemsToDisplay.sort(function(a, b) {
          return b["Rating"] - a["Rating"];
        });
        this.setState({ itemsToDisplay });
      }
    };

    
    reRenderAreaList() {
      var areas = [];
      var itemsToDisplay = [];
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        itemsToDisplay.push(data[i]);
        data[i].Area
          .split(",")
          .forEach(area => {
            let c = area.substring(0, area.length);
            if (areas.indexOf(c) < 0) {
              areas.push(c);
            }
          });
      }
  
      this.setState({ areas });
  
      this.setState({ itemsToDisplay }, () => {
        this.setState({ itemsToUse: [...this.state.itemsToDisplay] });
      });
    }

    reRenderBedroomList() {
      var bedrooms = [1,2,3];
      this.setState({ bedrooms });
    }

    componentDidMount() {
      this.reRenderAreaList();
      this.reRenderBedroomList();
    }
}


function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };