import React from 'react'
import Node from './Node'
import Context from './Context'

const unit = 2
const clsPrefix = 'cp-react-org-chart-table'

export default class Chart extends React.Component {

  state = {
    draggable: false,
  }

  onChangeTreeDraggable = () => {
    const { draggable } = this.state
    this.setState({
      draggable: !draggable,
    })
  }

  onDragEnd = e => {
    this.onChangeTreeDraggable()
  }

  onDragStart = (e, props) => {
    const { id } = props
    const { setIdentify } = this.context
    e.dataTransfer.setData('dragId', props.id)
    setIdentify(id, true)
    e.stopPropagation()
  }

  static contextType = Context

  render() {
    const { data } = this.props
    const { draggable } = this.state
    const { children=[] } = data
    const { length } = children
    const colSpan = length * unit
    return (
      <table 
        draggable={false}
        className={clsPrefix}
        onDragEnd={this.onDragEnd}
        onDragStart = {e => this.onDragStart(e, this.props.data)}
      >
        <tbody>
          <tr>
            <td colSpan={colSpan} className="td-node">
              <Node onChangeTreeDraggable={this.onChangeTreeDraggable} {...data} />
            </td>
          </tr>
          <LinesTr isRender={length>0}>
            <td colSpan={colSpan}>
              <div className="down-line" />
            </td>
          </LinesTr>
          <LinesTr isRender={length>0}>
            <Lines colSpan={colSpan} />
          </LinesTr>
          <tr>
            {children.map(child => {
              const { id } = child
              return (<td key={id} colSpan={2}><Chart data={child} /></td>)
            })}
          </tr>
        </tbody>
      </table>
    )
  }
}


const Lines = ({ colSpan }) => {
  const classNames = []
  for (let i = 0; i < colSpan; i++) {
    if (i === 0) {
      classNames.push('right-line')
      continue
    } else if (i === colSpan - 1) {
      classNames.push('left-line')
      continue
    } else if (i % 2 === 0) {
      classNames.push('right-line top-line')
      continue
    } else if (i % 2 === 1) {
      classNames.push('left-line top-line')
      continue
    }
  }
  return classNames.map((className, index) => <td key={index} className={className} />)
}

const LinesTr = ({children, isRender}) => {
  if (!isRender) return null
  return (
    <tr className="lines">{children}</tr>
  )
}