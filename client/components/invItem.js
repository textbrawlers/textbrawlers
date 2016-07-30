import React from 'react'

export default class extends React.Component {

  constructor() {
    super()

    this.state = {
      tooltipVisible: false
    }

    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
  }

  handleMouseOver() {
    this.setState({
      tooltipVisible: true
    })
  } 
  handleMouseOut() {
    this.setState({
      tooltipVisible: false
    })
  }

  render() {
    const item = this.props.item
    console.log(this.props.item)

    const tooltipStyle = {
      position: 'absolute',
      left: 50,
      top: 0,
      display: this.state.tooltipVisible ? 'block' : 'none'
    }

    const tooltipContainerStyle = {
      position: 'relative'
    }

    const className = `item item-${item.rarity}`

    return (
      <div style={tooltipContainerStyle}>
        <img className={className} src={item.image} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}/>
        <div style={tooltipStyle}  className="tooltip">
          <h2>Test</h2>
          <div> test tooltip</div>
          <pre>{JSON.stringify(item, undefined ,4)}</pre>
        </div>
      </div>
    )
  }
}
