import React from 'react'
import { connect } from 'react-redux'
import LoadingIndicator from 'client/components/LoadingIndicator.js'

const GlobalLoadingIndicator = ({ isLoading, children }) =>
  isLoading ? <LoadingIndicator /> : children

const mapStateToProps = state => ({
  isLoading: state.globalLoading > 0
})

export default connect(mapStateToProps)(GlobalLoadingIndicator)

