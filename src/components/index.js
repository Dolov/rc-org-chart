import React, { PureComponent } from 'react'

import Chart from './Chart'
import ChartWrapper from './ChartWrapper'
import { Provider } from './Context'



export default class OrgChart extends PureComponent {

  static defaultProps = {
    dragMode: 'node'
  }

  state = {
    data: this.props.data,
    willDropNodeId: null,
    didMountNodeId: null,
    draggingNodeProps: null,
    disableDropNodeId: null,
  }

  getNodeId = (type, id) => {
    this.setState({
      [type]: id
    }, () => {
      if (type === 'didMountNodeId') {
        this.clearDidMountNode()
      }
    })
  }

  clearDidMountNode() {
    setTimeout(() => {
      this.setState({
        didMountNodeId: null,
      })
    }, 2000)
  }

  moveNode = (dropId, dragId) => {
    const { data } = this.state
    const dragNode = getNode(data, dragId, true)
    const dropNode = getNode(data, dropId)
    if (!dropNode || !dragNode) return 
    const children = dropNode.children || []
    dropNode.children = [...children, dragNode]
    this.setState({
      data: [...clearIdentify(data)],
    })
  }

  setIdentify = (id, droppable) => {
    const { data } = this.state
    const identifyData = setIdentify(data, id, droppable)
    this.setState({
      data: [...identifyData],
    })
  }

  render() {
    const { data, willDropNodeId, didMountNodeId, draggingNodeProps, disableDropNodeId } = this.state
    const { pan, draggable, zoom, nodeRender, extraRender, maxZoom, minZoom, zoomStep, dragMode, customDrag } = this.props
    return (
      <Provider value={{
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
        getNodeId: this.getNodeId,
      }}>
        <ChartWrapper 
          pan={pan} 
          zoom={zoom} 
          maxZoom={maxZoom} 
          minZoom={minZoom} 
          zoomStep={zoomStep}
        >
          {data.map(item => {
            const { id } = item
            return <Chart key={id} data={item} />
          })}
        </ChartWrapper>
      </Provider>
    )
  }
}




const getNode = (data, targetId, isDelete) => {
  for (const item of data) {
    const { id, children=[] } = item
    if (targetId === id) {
      if (isDelete) {
        const index = data.indexOf(item)
        data.splice(index, 1)
      }
      return item
    } else {
      const node = getNode(children, targetId, isDelete)
      if (node) {
        return node
      }
    }
  }
}

const setIdentify = (data, targetId, droppable) => {
  data.forEach(item => {
    const { id, children=[] } = item
    if (targetId !== id) {
      item.droppable = droppable
      setIdentify(children, targetId, droppable)
    }
  })
  return data
}

const clearIdentify = data => {
  data.forEach(item => {
    const { children=[] } = item
    item.droppable = false
    setIdentify(children)
  })
  return data
}