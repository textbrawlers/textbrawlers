import React from 'react'

export default class Friends extends React.Component {

  render () {
    console.log('reqs', this.props.social.requests)
    console.log(this.props)
    const friendRequests = this.props.social.requests.map((req, i) => {
      return (
        <div key={i} className='friend-pending'>
          {req.from.username}
          <button className='decline' />
          <button className='accept' />
        </div>
      )
    })

    return (
      <div>
        <div className='container-friend'>
          <div className='window friend-window'>
            <h2>Friends</h2>
            <div className='windowcontent'>
              <div className='friend-list'>
                <div className='friend'>
                  TehFuccboiHenjik
                </div>
                {friendRequests}
                <form>
                  <label htmlFor='friend-name'>
                    Friend username:
                  </label>
                  <br />
                  <input
                    className='input'
                    type='text'
                    id='friend-name' />
                  <div className='button-center'>
                    <input className='button' type='submit' value='Add friend' />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
