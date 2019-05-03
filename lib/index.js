function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import Chart from './Chart';
import ChartWrapper from './ChartWrapper';
import { Provider } from './Context';
export default class OrgChart extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      data: this.props.data,
      willDropNodeId: null,
      didMountNodeId: null,
      draggingNodeProps: null,
      disableDropNodeId: null
    });

    _defineProperty(this, "getNodeId", (type, id) => {
      this.setState({
        [type]: id
      }, () => {
        if (type === 'didMountNodeId') {
          this.clearDidMountNode();
        }
      });
    });

    _defineProperty(this, "moveNode", (dropId, dragId) => {
      const {
        data
      } = this.state;
      const dragNode = getNode(data, dragId, true);
      const dropNode = getNode(data, dropId);
      if (!dropNode || !dragNode) return;
      const children = dropNode.children || [];
      dropNode.children = [...children, dragNode];
      this.setState({
        data: [...clearIdentify(data)]
      });
    });

    _defineProperty(this, "setIdentify", (id, droppable) => {
      const {
        data
      } = this.state;
      const identifyData = setIdentify(data, id, droppable);
      this.setState({
        data: [...identifyData]
      });
    });
  }

  clearDidMountNode() {
    setTimeout(() => {
      this.setState({
        didMountNodeId: null
      });
    }, 2000);
  }

  render() {
    const {
      data,
      willDropNodeId,
      didMountNodeId,
      draggingNodeProps,
      disableDropNodeId
    } = this.state;
    const {
      pan,
      draggable,
      zoom,
      nodeRender,
      extraRender,
      maxZoom,
      minZoom,
      zoomStep,
      dragMode,
      customDrag
    } = this.props;
    return React.createElement(Provider, {
      value: {
        dragMode,
        draggable,
        customDrag,
        nodeRender,
        extraRender,
        willDropNodeId,
        didMountNodeId,
        disableDropNodeId,
        draggingNodeProps,
        moveNode: this.moveNode,
        setIdentify: this.setIdentify,
        getNodeId: this.getNodeId
      }
    }, React.createElement(ChartWrapper, {
      pan: pan,
      zoom: zoom,
      maxZoom: maxZoom,
      minZoom: minZoom,
      zoomStep: zoomStep
    }, data.map(item => {
      const {
        id
      } = item;
      return React.createElement(Chart, {
        key: id,
        data: item
      });
    })));
  }

}

_defineProperty(OrgChart, "defaultProps", {
  dragMode: 'node'
});

const getNode = (data, targetId, isDelete) => {
  for (const item of data) {
    const {
      id,
      children = []
    } = item;

    if (targetId === id) {
      if (isDelete) {
        const index = data.indexOf(item);
        data.splice(index, 1);
      }

      return item;
    } else {
      const node = getNode(children, targetId, isDelete);

      if (node) {
        return node;
      }
    }
  }
};

const setIdentify = (data, targetId, droppable) => {
  data.forEach(item => {
    const {
      id,
      children = []
    } = item;

    if (targetId !== id) {
      item.droppable = droppable;
      setIdentify(children, targetId, droppable);
    }
  });
  return data;
};

const clearIdentify = data => {
  data.forEach(item => {
    const {
      children = []
    } = item;
    item.droppable = false;
    setIdentify(children);
  });
  return data;
};