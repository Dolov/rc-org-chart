function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import Node from './Node';
import Context from './Context';
const unit = 2;
const clsPrefix = 'cp-react-org-chart-table';
export default class Chart extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      draggable: false
    });

    _defineProperty(this, "onChangeTreeDraggable", () => {
      const {
        draggable
      } = this.state;
      this.setState({
        draggable: !draggable
      });
    });

    _defineProperty(this, "onDragEnd", e => {
      this.onChangeTreeDraggable();
    });

    _defineProperty(this, "onDragStart", (e, props) => {
      const {
        id
      } = props;
      const {
        setIdentify
      } = this.context;
      e.dataTransfer.setData('dragId', props.id);
      setIdentify(id, true);
      e.stopPropagation();
    });
  }

  render() {
    const {
      data
    } = this.props;
    const {
      draggable
    } = this.state;
    const {
      children = []
    } = data;
    const {
      length
    } = children;
    const colSpan = length * unit;
    return React.createElement("table", {
      draggable: false,
      className: clsPrefix,
      onDragEnd: this.onDragEnd,
      onDragStart: e => this.onDragStart(e, this.props.data)
    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
      colSpan: colSpan,
      className: "td-node"
    }, React.createElement(Node, _extends({
      onChangeTreeDraggable: this.onChangeTreeDraggable
    }, data)))), React.createElement(LinesTr, {
      isRender: length > 0
    }, React.createElement("td", {
      colSpan: colSpan
    }, React.createElement("div", {
      className: "down-line"
    }))), React.createElement(LinesTr, {
      isRender: length > 0
    }, React.createElement(Lines, {
      colSpan: colSpan
    })), React.createElement("tr", null, children.map(child => {
      const {
        id
      } = child;
      return React.createElement("td", {
        key: id,
        colSpan: 2
      }, React.createElement(Chart, {
        data: child
      }));
    }))));
  }

}

_defineProperty(Chart, "contextType", Context);

const Lines = ({
  colSpan
}) => {
  const classNames = [];

  for (let i = 0; i < colSpan; i++) {
    if (i === 0) {
      classNames.push('right-line');
      continue;
    } else if (i === colSpan - 1) {
      classNames.push('left-line');
      continue;
    } else if (i % 2 === 0) {
      classNames.push('right-line top-line');
      continue;
    } else if (i % 2 === 1) {
      classNames.push('left-line top-line');
      continue;
    }
  }

  return classNames.map((className, index) => React.createElement("td", {
    key: index,
    className: className
  }));
};

const LinesTr = ({
  children,
  isRender
}) => {
  if (!isRender) return null;
  return React.createElement("tr", {
    className: "lines"
  }, children);
};