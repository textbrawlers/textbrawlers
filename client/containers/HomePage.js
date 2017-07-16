import { connect } from 'react-redux'
import Home from 'client/components/Home.js'

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Home)
