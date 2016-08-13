import React from 'react'
import { browserHistory } from 'react-router'

export default class Friends extends React.Component {

  render () {
    return (
      <div>
        <div className='container-friend'>
          <div className='window friend-window'>
            <h2>Friends</h2>
            <div className='windowcontent'>
              <div className="friend-list">
                <div className="friend">
                  TehFuccboiHenjik
                </div>
                <div className="friend-pending">
                  TehFuccboiHenjik2
                  <button className="decline"/>
                  <button className="accept" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}