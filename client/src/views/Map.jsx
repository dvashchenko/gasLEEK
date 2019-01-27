import React from "react";

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap";

// Mapbox
import DeckGL, {TextLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';

// import IconClusterLayer from './icon-cluster-layer';
import TagmapLayer from './tagmap-layer';

// Set your mapbox access token here
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

class Map extends React.Component {
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

export default Map;
