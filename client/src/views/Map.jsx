import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

// Mapbox
import DeckGL, {TextLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';

// import IconClusterLayer from './icon-cluster-layer';
import TagmapLayer from './tagmap-layer';

// Set your mapbox access token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWRhcmlhbiIsImEiOiJjanJjdzlqdTYwOGc3NDlxcXU3M291cmx1In0.fceqY9ssXVrQxPh0ZJFXRw';

// sample data
const DATA_URL = 'https://rivulet-zhang.github.io/dataRepo/tagmap/hashtags10k.json';
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

const stopPropagation = evt => evt.stopPropagation();

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      hoveredItems: null,
      expanded: false
    };
    this._onHover = this._onHover.bind(this);
    this._onClick = this._onClick.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._renderhoveredItems = this._renderhoveredItems.bind(this);
  }

  _onHover(info) {
    if (this.state.expanded) {
      return;
    }

    const {x, y, object} = info;
    const z = info.layer.state.z;
    const {showCluster = true} = this.props;

    let hoveredItems = null;

    if (object) {
      if (showCluster) {
        hoveredItems = object.zoomLevels[z].points.sort((m1, m2) => m1.year - m2.year);
      } else {
        hoveredItems = [object];
      }
    }

    this.setState({x, y, hoveredItems, expanded: false});
  }

  _onClick() {
    this.setState({expanded: true});
  }

  _onPopupLoad(ref) {
    if (ref) {
      // React events are triggered after native events
      ref.addEventListener('wheel', stopPropagation);
    }
  }

  _closePopup() {
    this.setState({expanded: false, hoveredItems: null});
  }

  _renderhoveredItems() {
    const {x, y, hoveredItems, expanded} = this.state;

    if (!hoveredItems) {
      return null;
    }

    if (expanded) {
      return (
        <div
          className="tooltip interactive"
          ref={this._onPopupLoad}
          style={{left: x, top: y}}
          onMouseLeave={this._closePopup}
        >
          {hoveredItems.map(({name, year, mass, class: meteorClass}) => {
            return (
              <div key={name}>
                <h5>{name}</h5>
                <div>Year: {year || 'unknown'}</div>
                <div>Class: {meteorClass}</div>
                <div>Mass: {mass}g</div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="tooltip" style={{left: x, top: y}}>
        {hoveredItems.slice(0, 20).map(({name, year}) => (
          <div key={name}>
            <h5>
              {name} {year ? `(${year})` : ''}
            </h5>
          </div>
        ))}
      </div>
    );
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
            minFontSize: 14,
            maxFontSize: fontSize * 2 - 14
          })
        : new TextLayer({
            id: 'twitter-topics-raw',
            data,
            getText: d => d.label,
            getPosition: x => x.coordinates,
            getColor: d => DEFAULT_COLOR,
            getSize: d => 20,
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
                <CardHeader>Mapbox</CardHeader>
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
