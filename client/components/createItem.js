import React, { Component } from 'react'
import getPrefixes from 'common/items/prefixes.js'
import { getDroptable } from 'common/game/itemGenerator.js'
import 'core-js/fn/object/entries'
import request from 'common/api/request.js'

export default class CreateItem extends Component {
  constructor () {
    super()

    this.state = {
      droptable: [],
      allPrefixes: {},
      prefixes: [],
      itemId: 'shortsword'
    }

    this.addPrefix = this.addPrefix.bind(this)
    this.create = this.create.bind(this)
  }

  componentWillMount () {
    getDroptable().then(droptable => {
      this.setState({ droptable })
    })

    getPrefixes().then(({prefixes}) => {
      this.setState({ allPrefixes: prefixes })
    })
  }

  addPrefix () {
    this.setState({
      prefixes: [...this.state.prefixes, ['axe-prefixes', 'attack-speed', 'heavy']]
    })
  }

  removePrefix (i) {
    this.setState({
      prefixes: [...this.state.prefixes.slice(0, i), ...this.state.prefixes.slice(i + 1)]
    })
  }

  validatePrefix (prefix) {
    if (!this.state.allPrefixes[prefix[0]]) {
      prefix[0] = Object.keys(this.state.allPrefixes)[0]
    }

    const sub1 = this.state.allPrefixes[prefix[0]]

    if (!sub1[prefix[1]]) {
      prefix[1] = Object.keys(sub1)[0]
    }

    const sub2 = sub1[prefix[1]]

    if (!sub2) {
      window.alert('Fan då! Något här ser trasigt ut här :( (' + prefix[0] + ')')
      return ['axe-prefixes', 'attack-speed', 'heavy']
    }

    if (!sub2[prefix[2]]) {
      prefix[2] = Object.keys(sub2)[0]
    }

    return prefix
  }

  setPrefix1 (i, e) {
    let newPrefix = [e.target.value, ...this.state.prefixes[i].slice(1)]

    newPrefix = this.validatePrefix(newPrefix)

    this.setState({
      prefixes: [
        ...this.state.prefixes.slice(0, i),
        newPrefix,
        ...this.state.prefixes.slice(i + 1)
      ]
    })
  }

  setPrefix2 (i, e) {
    let newPrefix = [this.state.prefixes[i][0], e.target.value, this.state.prefixes[i][2]]

    newPrefix = this.validatePrefix(newPrefix)

    this.setState({
      prefixes: [
        ...this.state.prefixes.slice(0, i),
        newPrefix,
        ...this.state.prefixes.slice(i + 1)
      ]
    })
  }

  setPrefix3 (i, e) {
    let newPrefix = [...this.state.prefixes[i].slice(0, 2), e.target.value]

    newPrefix = this.validatePrefix(newPrefix)

    this.setState({
      prefixes: [
        ...this.state.prefixes.slice(0, i),
        newPrefix,
        ...this.state.prefixes.slice(i + 1)
      ]
    })
  }

  getItem () {
    return {
      id: this.state.itemId,
      rarity: 'legendary',
      prefixes: this.state.prefixes
    }
  }

  create () {
    request.post('/api/game/createCustomItem', this.getItem()).then(resp => {
      this.props.callback('item-created')
    }).catch(resp => window.alert(resp))
  }

  render () {
    return (
      <div>
        <label>
          <h2>Item type:</h2>
          <select value={this.state.itemId} onChange={e => this.setState({itemId: e.target.value})}>
            {this.state.droptable.map(({item}) => <option value={item.id}>{item.name} ({item.category} - {item.id})</option>)}
          </select>
        </label>
        <h2>Prefixes:</h2>
        {this.state.prefixes.map((prefix, i) => {
          return (
            <div key={i}>
              <select value={prefix[0]} onChange={e => this.setPrefix1(i, e)}>
                {Object.keys(this.state.allPrefixes).map((prefix, i) => <option key={i} value={prefix}>{prefix}</option>)}
              </select>
              <select value={prefix[1]} onChange={e => this.setPrefix2(i, e)}>
                {Object.keys(this.state.allPrefixes[prefix[0]]).map((prefix, i) => <option key={i} value={prefix}>{prefix}</option>)}
              </select>
              <select value={prefix[2]} onChange={e => this.setPrefix3(i, e)}>
                {Object.keys(this.state.allPrefixes[prefix[0]][prefix[1]]).map((prefix, i) => <option key={i} value={prefix}>{prefix}</option>)}
              </select>
              <button onClick={() => this.removePrefix(i)}>X</button>
            </div>
          )
        })}
        <button onClick={this.addPrefix}>+</button>
        <pre style={{maxHeight: 250, overflow: 'scroll'}}>{JSON.stringify(this.getItem(), undefined, 2)}</pre>
        <br />
        <button onClick={this.create}>Create</button>
        <button onClick={this.props.callback}>Close</button>
      </div>
    )
  }
}
