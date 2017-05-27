import React, { Component } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';


class WebcamCapture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenshot: null,
        }
        this.handleClick = this.handleClick.bind(this);
        this.ocr = this.ocr.bind(this);
    };

    handleClick(event) {
        event.preventDefault();
        const screenshot = this.webcam.getScreenshot();
        this.setState({
            screenshot
        })
        console.log('after handleclick');
        this.ocr();
   
    }

    ocr() {
      console.log('ocr has awoken!');
      const apiKey = "cfb3a32bd888957";
      const photoUrl = "http://i.imgur.com/wgXuL7s.jpg"; //hard code for testing, this will be the screenshot data URL from WebcamCapture

      axios.get(`https://api.ocr.space/parse/imageurl?apikey=${apiKey}&url=${photoUrl}`)
        .then((res) => {
            // console.log(res);
            let upcFromPhoto = res.data.ParsedResults[0].ParsedText;
            console.log(`yay! from pic: ${upcFromPhoto}`);
        })

    }

    render() {
        return (
            <div className="container">
                <div className="webcam">
                    <Webcam
                        audio={false}
                        height={400}
                        ref={node => this.webcam = node}
                        screenshotFormat="image/jpeg"
                        width={400}
                    />
                    <br/>
                    <button className="searchProduct" onClick={this.handleClick}>Capture photo</button>

            <div className="sceenshot">
                {this.state.photo ? <img src={this.state.photo} alt="webcam" /> : null}
            </div>
            </div>
        </div>
            );
      }
};

export default WebcamCapture;