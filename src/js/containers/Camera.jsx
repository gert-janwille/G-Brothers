import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import TakenPicture from '../components/TakenPicture.jsx'

class Camera extends Component {

  snap = () => {
    this.ctx.translate(this.canvas.width, 0);
    this.ctx.scale(-1, 1);

    this.ctx.drawImage(this.video, 0,0, this.canvas.width, this.canvas.height);

    this.canvas.toBlob(blob => this.props.setBlob(blob));
  }

  componentDidMount = () => {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    if(!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) return;

    this.video = document.querySelector('.video');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;


    navigator.mediaDevices.getUserMedia({ video: {facingMode: "user"}, audio: false }).then(stream => {
        this.video.srcObject = stream;
        this.video.play();
    });

    document.querySelector('.snap-btn').addEventListener('click', this.snap);
  }

  render(){

    return (
        <div className="cam-con">

          <video className="video" autoPlay></video>
          <div className="snap-btn"></div>
          <img src="/assets/img/frame.png" className="frame" alt='frame'/>
          <canvas id="canvas"></canvas>

          {this.props.blob ? <TakenPicture {...this.props}/> : null}

        </div>
    );
  }
}

export default inject(
  ({store}) => ({
    setBlob: store.setBlob,
    blob: store.blob,
    remove: store.remove,
    use: store.use
  })
)(
  observer(Camera)
);
