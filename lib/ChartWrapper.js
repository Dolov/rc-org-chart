function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
const clsPrefix = 'cp-react-org-chart-chart-wrapper';
export default class ChartWrapper extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      scale: 1,
      isMove: false,
      translateX: 0,
      translateY: 0,
      originX: 0,
      originY: 0
    });

    _defineProperty(this, "onZoom", e => {
      const {
        zoom,
        maxZoom,
        minZoom,
        zoomStep
      } = this.props;
      if (!zoom) return;
      const {
        deltaY,
        pageX,
        pageY
      } = e;
      const {
        offsetWidth,
        offsetHeight
      } = this.wrapper;
      let {
        scale
      } = this.state;
      const {
        translateX,
        translateY
      } = this.state;

      if (deltaY < 0 && scale < maxZoom) {
        scale += zoomStep;
      }

      if (deltaY > 0 && scale > minZoom) {
        scale -= zoomStep;
      }

      this.setState({
        scale,
        originX: pageX,
        originY: pageY
      });
    });

    _defineProperty(this, "onMouseDown", e => {
      this.toggleMove(true);
      const {
        pageX,
        pageY
      } = e;
      const {
        translateX,
        translateY
      } = this.state;
      this.pageX = pageX;
      this.pageY = pageY;
      this.translateX = translateX;
      this.translateY = translateY;
    });

    _defineProperty(this, "onMouseUp", e => {
      this.toggleMove(false);
    });

    _defineProperty(this, "onMouseMove", e => {
      const {
        isMove,
        scale
      } = this.state;
      if (!isMove) return;
      const {
        pageX,
        pageY
      } = e;
      const x = (pageX - this.pageX) / scale + this.translateX;
      const y = (pageY - this.pageY) / scale + this.translateY;
      this.setState({
        translateX: x,
        translateY: y
      });
    });
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  toggleMove(isMove) {
    this.setState({
      isMove
    });
  }

  getProps() {
    const {
      zoom,
      pan
    } = this.props;
    const props = {};

    if (zoom) {
      props.onWheel = this.onZoom;
    }

    if (pan) {
      props.onMouseUp = this.onMouseUp;
      props.onMouseDown = this.onMouseDown;
      props.onMouseMove = this.onMouseMove;
    }

    return props;
  }

  render() {
    const {
      children
    } = this.props;
    const {
      scale,
      translateX,
      translateY,
      isMove,
      originX,
      originY
    } = this.state;
    const cursor = isMove ? 'move' : 'default';
    const props = this.getProps();
    return React.createElement("div", {
      className: clsPrefix,
      style: {
        overflow: 'hidden'
      }
    }, React.createElement("div", _extends({
      ref: node => {
        this.wrapper = node;
      },
      style: {
        cursor,
        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        transformOrigin: `${originX}px ${originY}px`
      },
      className: "chart-wrapper-main"
    }, props), children));
  }

}

_defineProperty(ChartWrapper, "propTypes", {});

_defineProperty(ChartWrapper, "defaultProps", {
  maxZoom: 2,
  minZoom: 0.5,
  zoomStep: 0.03
});