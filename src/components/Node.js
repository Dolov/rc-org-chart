import React from 'react'
import cls from 'classnames'
import { Icon } from 'antd'
import Context from './Context'
import { S } from 'xmlchars/xml/1.0/ed5';

const clsPrefix = 'cp-react-org-chart-node'

export default class Node extends React.PureComponent {

  state = {
    isDragging: false,
  }

  componentDidMount() {
    
  }

  onDragStart = (e, props) => {
    const { id } = props
    const { setIdentify, getNodeId } = this.context
    getNodeId('draggingNodeProps', props)
    setIdentify(id, true)
    this.setState({isDragging: true})
  }

  onDragEnd = (e, props) => {
    const { id } = props
    const { setIdentify, getNodeId } = this.context
    this.setState({isDragging: false})
    getNodeId('willDropNodeId', null)
    getNodeId('disableDropNodeId', null)
    getNodeId('draggingNodeProps', null)
    setIdentify(id, false)
  }

  onDragOver = (e, props) => {
    e.preventDefault()
  }

  onDragEnter = (e, props) => {
    const { id, droppable } = props
    if (!droppable) return 
    const { getNodeId, customDrag, draggingNodeProps } = this.context
    if (customDrag && typeof customDrag === 'function') {
      const isDrag = customDrag(props, draggingNodeProps)
      if (isDrag) {
        getNodeId('willDropNodeId', id)
      } else {
        getNodeId('disableDropNodeId', id)
      }
    } else {
      getNodeId('willDropNodeId', id)
    }
  }

  onDragLeave = (e, props) => {
    const { getNodeId } = this.context
    // getNodeId('willDropNodeId', null)
  }

  onDrop = (e, props) => {
    const { droppable } = props
    if (!droppable) return 
    const { customDrag, draggingNodeProps } = this.context
    if (customDrag && typeof customDrag === 'function') {
      const isDrag = customDrag(props, draggingNodeProps)
      if (!isDrag) return
      this.sureDrop(props, draggingNodeProps) 
    } else {
      this.sureDrop(props, draggingNodeProps)
    }
  }

  sureDrop = (dropProps, dragProps) => {
    const { moveNode, getNodeId } = this.context
    const { id: dropId } = dropProps
    const { id: dragId } = dragProps
    getNodeId('willDropNodeId', null)
    getNodeId('disableDropNodeId', null)
    getNodeId('draggingNodeProps', null)
    getNodeId('didMountNodeId', dragId)
    moveNode(dropId, dragId)
  }

  onChangeTreeDraggable = e => {
    const { onChangeTreeDraggable } = this.props
    onChangeTreeDraggable()
    e.stopPropagation()
  }

  getProps() {
    const { dragMode } = this.context
    const props = {
      onMouseDown(e) {
        e.stopPropagation()
      }
    }
    if (dragMode === 'tree') {
      props.onMouseUp = this.onChangeTreeDraggable
      props.onMouseDown = this.onChangeTreeDraggable
    }

    if (dragMode === 'node') {
      props.draggable = true
      props.onDragEnd = e => this.onDragEnd(e, this.props)
      props.onDragStart = e => this.onDragStart(e, this.props)
    }
    return props
  }

  static contextType = Context

  render() {
    const { isDragging } = this.state
    const { droppable, id } = this.props
    const { extraRender=() => {}, nodeRender, willDropNodeId, didMountNodeId, disableDropNodeId } = this.context
    const props = this.getProps()
    const disableDrop = disableDropNodeId === id
    const nodeJsx = nodeRender ? nodeRender(this.props): <DefaultNodeRender {...this.props} />
    return (
      <div className={clsPrefix}>
        <span className="span-wrapper">
          <div 
            className={cls("node-content", {
              'dragging': isDragging,
              'didMount': didMountNodeId === id,
              'droppable': droppable,
              'willDropNode': willDropNodeId === id,
              'disableDropNode': disableDrop,
            })} 
            {...props} 
          >
            <div 
              onDrop={e => this.onDrop(e, this.props)}
              onDragOver={e => this.onDragOver(e, this.props)}
              onDragEnter={e => this.onDragEnter(e, this.props)}
              onDragLeave={e => this.onDragLeave(e, this.props)}
            >
              {nodeJsx}
            </div>
            {disableDrop&&(<div className="error"><Icon type="exclamation-circle" /></div>)}
            <div>{extraRender(this.props)}</div>
          </div>
        </span>
      </div>
    )
  }
}




const DefaultNodeRender = ({id, name}) => (
  <div className="default-node-render">
    <div className="id">{id}</div>
    <div className="name">{name}</div>
  </div>
)