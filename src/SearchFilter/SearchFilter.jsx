import React, { Component } from "react";
import DateTimePicker from 'react-datetime-picker';

class SearchFilter extends Component {
  state = { show: false, date: new Date() };

  onChange = date => this.setState({ date })
  
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <div className="searchcontainer">
          {this.props.itemsToDisplay.map(rest => {
            let areas = rest["Area"]
              .substring(0, rest["Area"].length)
              .split(",");
            return (
              <div className="rest">
                <div className="restinfo">
                  <i
                    className="fas fa-map-marker"
                    style={{ color: "orangered", fontSize: "12px" }}
                  ></i>
                  &nbsp;
                  <span className="restcity">{rest["City"]}</span>
                  <br />
                  <span className="restname">{rest["Name"]}</span>
                  <br />
                  <span className="restrent">Rent - {rest["Rent"]}</span>
                  <div className="restareas">
                    {areas.map(area => {
                      let areaToShow = area.substring(
                        0,
                        area.length
                      );
                      return (
                        <div pill className="restarea" variant="light">
                          {areaToShow}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="sepline"></div>
                <div className="reststats">
                  <div>
                    <i
                      style={{ fontSize: "15px" }}
                      className="far fa-comment-alt"
                    ></i>
                    &nbsp;
                    {rest["Bedrooms"]} Bedroom
                  </div>
                  <div>
                    <i style={{ fontSize: "15px" }} className="far fa-star"></i>
                    &nbsp;
                    Rating : {rest["Rating"]}
                  </div>
                </div>
                <div>
                  <Modal show={this.state.show} handleClose={this.hideModal} >
                      <div className="restname">
                        <h2>Schedule Visit</h2>
                        <DateTimePicker
                          onChange={this.onChange}
                          value={this.state.date}
                        />
                        <h1>&nbsp;</h1>
                      </div>
                    </Modal>
                </div>
                <div className="restbutton">
                  <button type='button' className="red" onClick={this.showModal}>Schedule Visit</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button className="red"
          onClick={handleClose}
        >
          Finalise Visit
        </button>
      </section>
    </div>
  );
};

export { SearchFilter };