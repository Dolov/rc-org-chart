import "antd/es/icon/style/css";
import _Icon from "antd/es/icon";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cls from 'classnames';
import Context from './Context';
const clsPrefix = 'cp-react-org-chart-node';
export default class Node extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isDragging: false
    });

    _defineProperty(this, "onDragStart", (e, props) => {
      const {
        id
      } = props;
      const {
        setIdentify,
        getNodeId
      } = this.context;
      getNodeId('draggingNodeProps', props);
      setIdentify(id, true);
      this.setState({
        isDragging: true
      });
    });

    _defineProperty(this, "onDragEnd", (e, props) => {
      const {
        id
      } = props;
      const {
        setIdentify,
        getNodeId
      } = this.context;
      this.setState({
        isDragging: false
      });
      getNodeId('willDropNodeId', null);
      getNodeId('disableDropNodeId', null);
      getNodeId('draggingNodeProps', null);
      setIdentify(id, false);
    });

    _defineProperty(this, "onDragOver", (e, props) => {
      e.preventDefault();
    });

    _defineProperty(this, "onDragEnter", (e, props) => {
      const {
        id,
        droppable
      } = props;
      if (!droppable) return;
      const {
        getNodeId,
        customDrag,
        draggingNodeProps
      } = this.context;

      if (customDrag && typeof customDrag === 'function') {
        const isDrag = customDrag(props, draggingNodeProps);

        if (isDrag) {
          getNodeId('willDropNodeId', id);
        } else {
          getNodeId('disableDropNodeId', id);
        }
      } else {
        getNodeId('willDropNodeId', id);
      }
    });

    _defineProperty(this, "onDragLeave", (e, props) => {
      const {
        getNodeId
      } = this.context; // getNodeId('willDropNodeId', null)
    });

    _defineProperty(this, "onDrop", (e, props) => {
      const {
        droppable
      } = props;
      if (!droppable) return;
      const {
        customDrag,
        draggingNodeProps
      } = this.context;

      if (customDrag && typeof customDrag === 'function') {
        const isDrag = customDrag(props, draggingNodeProps);
        if (!isDrag) return;
        this.sureDrop(props, draggingNodeProps);
      } else {
        this.sureDrop(props, draggingNodeProps);
      }
    });

    _defineProperty(this, "sureDrop", (dropProps, dragProps) => {
      const {
        moveNode,
        getNodeId
      } = this.context;
      const {
        id: dropId
      } = dropProps;
      const {
        id: dragId
      } = dragProps;
      getNodeId('willDropNodeId', null);
      getNodeId('disableDropNodeId', null);
      getNodeId('draggingNodeProps', null);
      getNodeId('didMountNodeId', dragId);
      moveNode(dropId, dragId);
    });

    _defineProperty(this, "onChangeTreeDraggable", e => {
      const {
        onChangeTreeDraggable
      } = this.props;
      onChangeTreeDraggable();
      e.stopPropagation();
    });
  }

  componentDidMount() {}

  getProps() {
    const {
      dragMode
    } = this.context;
    const props = {
      onMouseDown(e) {
        e.stopPropagation();
      }

    };

    if (dragMode === 'tree') {
      props.onMouseUp = this.onChangeTreeDraggable;
      props.onMouseDown = this.onChangeTreeDraggable;
    }

    if (dragMode === 'node') {
      props.draggable = true;

      props.onDragEnd = e => this.onDragEnd(e, this.props);

      props.onDragStart = e => this.onDragStart(e, this.props);
    }

    return props;
  }

  render() {
    const {
      isDragging
    } = this.state;
    const {
      droppable,
      id
    } = this.props;
    const {
      extraRender = () => {},
      nodeRender,
      willDropNodeId,
      didMountNodeId,
      disableDropNodeId
    } = this.context;
    const props = this.getProps();
    const disableDrop = disableDropNodeId === id;
    const nodeJsx = nodeRender ? nodeRender(this.props) : React.createElement(DefaultNodeRender, this.props);
    return React.createElement("div", {
      className: clsPrefix
    }, React.createElement("span", {
      className: "span-wrapper"
    }, React.createElement("div", _extends({
      className: cls("node-content", {
        'dragging': isDragging,
        'didMount': didMountNodeId === id,
        'droppable': droppable,
        'willDropNode': willDropNodeId === id,
        'disableDropNode': disableDrop
      })
    }, props), React.createElement("div", {
      onDrop: e => this.onDrop(e, this.props),
      onDragOver: e => this.onDragOver(e, this.props),
      onDragEnter: e => this.onDragEnter(e, this.props),
      onDragLeave: e => this.onDragLeave(e, this.props)
    }, nodeJsx), disableDrop && React.createElement("div", {
      className: "error"
    }, React.createElement(_Icon, {
      type: "exclamation-circle"
    })), React.createElement("div", null, extraRender(this.props)))));
  }

}

_defineProperty(Node, "contextType", Context);

const DefaultNodeRender = ({
  id,
  name
}) => React.createElement("div", {
  className: "default-node-render"
}, React.createElement("div", {
  className: "id"
}, id), React.createElement("div", {
  className: "name"
}, name));