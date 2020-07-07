import React from "react";
import './news.scss'
import { DarkContainer, LightContainer } from '.././components';
import { Typography } from '@material-ui/core';

const NewsPage = () => {
    return (
        <div className="PanelContainer main">
        <div className="PanelContainer left">
        <DarkContainer style={{borderRadius: "4px 0 0 4px"}}>
          <Typography>Nagivation Bar</Typography>
        </DarkContainer>
        </div>
        <div className="PanelContainer right">
        <LightContainer style={{borderRadius: "0 4px 4px 0"}}>

                <div className="newsHeader"> <b><header>NEWS</header></b>
                    <div className="main">
                        <div className="item">
                            <h3 className="item-head">Update 1</h3>
                            <img alt="article" className="item-image" src="https://www.pngitem.com/pimgs/m/29-291695_casino-chips-png-poker-chips-transparent-background-png.png" style={{width: 150, height: 100}}/>
                            <p className="item-desc">Description of news 
                                <br></br><a href="/">Read more</a>
                            </p>
                            <p className="item-time">Date published</p>
                        </div>
                        <div className="item">
                            <h3 className="item-head">Update 2</h3>
                            <img alt="article" className="item-image" src="https://www.pngitem.com/pimgs/m/29-291695_casino-chips-png-poker-chips-transparent-background-png.png" style={{width: 150, height: 100}}/>
                            <p className="item-desc">Description of news 
                                <br></br><a href="/">Read more</a>
                            </p>
                            <p className="item-time">Date published</p>
                        </div>
                    </div>
                </div>
     
        </LightContainer>
        </div>
      </div>
    );
  };
  

export default NewsPage;