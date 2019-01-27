import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "../variables/charts.jsx";

// REST Request
import Papa from 'papaparse';
import axios from 'axios';

// Mapbox
import DeckGL, {TextLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';

// import IconClusterLayer from './icon-cluster-layer';
import TagmapLayer from './tagmap-layer';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWRhcmlhbiIsImEiOiJjanJjdzlqdTYwOGc3NDlxcXU3M291cmx1In0.fceqY9ssXVrQxPh0ZJFXRw';

// sample data
const DATA_URL = 'https://raw.githubusercontent.com/plebeiathon/gasLEEK/master/client/src/variables/locations.json';
// mapbox style file path
const MAPBOX_STYLE =
  'https://rivulet-zhang.github.io/dataRepo/mapbox/style/map-style-dark-v9-no-labels.json';

const DEFAULT_COLOR = [29, 145, 192];

export const INITIAL_VIEW_STATE = {
  latitude: 39.1,
  longitude: -94.57,
  zoom: 3.8,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      gasPrice: {},
      gasPriceWt2: [],
      gasPriceWt3: [],
      gasPriceWt4: [], 
      gasPriceMt2: [],
      gasPriceMt3: [], 
      gasPriceMt4: [],
      gasPriceAt2: [], 
      gasPriceAt3: [], 
      gasPriceAt4: [],
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  componentDidMount() {
    axios.get(`https://raw.githubusercontent.com/plebeiathon/gasLEEK/master/data/cvs/PET_PRI_GND_A_EPM0_PTE_DPGAL_W/Data%202-Table%201.csv`)
      .then(res => {
        const gasPriceWt2 = Papa.parse(res.data, {
          delimiter: ',',
          header: true
        });

        this.setState({ gasPriceWt2 });
      });
  }

  _renderLayers() {
    const {data = DATA_URL, cluster = true, fontSize = 32} = this.props;

    return [
      cluster
        ? new TagmapLayer({
            id: 'twitter-topics-tagmap',
            data,
            getLabel: x => x.label,
            getPosition: x => x.coordinates,
            minFontSize: 22,
            maxFontSize: fontSize * 2 - 18
          })
        : new TextLayer({
            id: 'twitter-topics-raw',
            data,
            getText: d => d.label,
            getPosition: x => x.coordinates,
            getColor: d => DEFAULT_COLOR,
            getSize: d => 22,
            sizeScale: fontSize / 20
          })
    ];
  }

  render() {
    const {viewState, controller = true, baseMap = true} = this.props;

    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">California</h5>
                      <CardTitle tag="h2">Gas Prices</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Weekly
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Monthly
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data3"
                          })}
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Annual
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">6 Week Persistence Forecast</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                    Projected Gas Prices
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">300 Gallons Per Truck</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> Projected Refueling Savings
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">3,500,000 Truckers Refilling 130 Times a Year </h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    US Annual Savings
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <DeckGL
                      layers={this._renderLayers()}
                      initialViewState={INITIAL_VIEW_STATE}
                      viewState={viewState}
                      controller={controller}
                    >
                      {baseMap && (
                        <StaticMap
                          reuseMaps
                          mapStyle={MAPBOX_STYLE}
                          preventStyleDiffing={true}
                          mapboxApiAccessToken={MAPBOX_TOKEN}
                        />
                      )}
                    </DeckGL>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
