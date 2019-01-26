import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

// Mapbox
import DeckGL, {LineLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWRhcmlhbiIsImEiOiJjanJjdzlqdTYwOGc3NDlxcXU3M291cmx1In0.fceqY9ssXVrQxPh0ZJFXRw';

// Initial viewport settings
const initialViewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];

class Map extends React.Component {
  render() {
    const layers = [
      new LineLayer({id: 'line-layer', data})
    ];

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>Mapbox</CardHeader>
                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <DeckGL
                      initialViewState={initialViewState}
                      controller={true}
                      layers={layers}
                    >
                      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
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

export default Map;
