import React from 'react'


const clsPrefix = 'cp-react-org-chart-chart-wrapper'

export default class ChartWrapper extends React.PureComponent {

  static propTypes = {

  }

  static defaultProps = {
    maxZoom: 2,
    minZoom: 0.5,
    zoomStep: 0.03,
  }

  state = {
    scale: 1,
    isMove: false,
    translateX: 0,
    translateY: 0,
    originX: 0,
    originY: 0,
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove)
  }

  onZoom = e => {
    const { zoom, maxZoom, minZoom, zoomStep } = this.props

    if (!zoom) return 
    const { deltaY, pageX, pageY } = e

    const { offsetWidth, offsetHeight  } = this.wrapper
    let { scale } = this.state
    const { translateX, translateY } = this.state
    if (deltaY < 0 && scale < maxZoom) {
      scale += zoomStep
    } 
    if (deltaY > 0 && scale > minZoom) {
      scale -= zoomStep
    }
    this.setState({
      scale,
      originX: pageX,
      originY: pageY
    })
    
  }

  toggleMove(isMove) {
    this.setState({isMove})
  }

  onMouseDown = e => { 
    this.toggleMove(true)
    const { pageX, pageY } = e
    const { translateX, translateY } = this.state
    this.pageX = pageX
    this.pageY = pageY
    this.translateX = translateX
    this.translateY = translateY
  }

  onMouseUp = e => {
    this.toggleMove(false)
  }

  onMouseMove = e => {
    
    const { isMove, scale } = this.state
    if (!isMove) return 
    const { pageX, pageY } = e
    const x = (pageX - this.pageX) / scale + this.translateX
    const y = (pageY - this.pageY) / scale + this.translateY
    this.setState({
      translateX: x, 
      translateY: y,
    })
  }

  getProps() {
    const { zoom, pan } = this.props
    const props = {}
    if (zoom) {
      props.onWheel = this.onZoom
    }
    if (pan) {
      props.onMouseUp = this.onMouseUp
      props.onMouseDown = this.onMouseDown
      props.onMouseMove = this.onMouseMove
    }
    return props
  }

  render() {
    const { children } = this.props
    const { scale, translateX, translateY, isMove, originX, originY } = this.state
    const cursor = isMove ? 'move': 'default'
    const props = this.getProps()
    return (
      <div className={clsPrefix} style={{overflow:'hidden'}}>
        <div 
          ref={node => {this.wrapper=node}}
          style={{
            cursor,
            transform:`scale(${scale}) translate(${translateX}px, ${translateY}px)`,
            transformOrigin: `${originX}px ${originY}px`,
          }} 
          className="chart-wrapper-main"
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }
}