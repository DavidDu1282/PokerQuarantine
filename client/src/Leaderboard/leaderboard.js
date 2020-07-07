import React from "react";
import './leaderboard.scss'
import { DarkContainer, LightContainer } from '.././components';
import { Typography } from '@material-ui/core';

const Board = () => {
    return (
        <div className="PanelContainer main">
        <div className="PanelContainer left">
        <DarkContainer style={{borderRadius: "4px 0 0 4px"}}>
          <Typography>Nagivation Bar</Typography>
        </DarkContainer>
        </div>
        <div className="PanelContainer right">
        <LightContainer style={{borderRadius: "0 4px 4px 0"}}>

        <div className="newsHeader"> <b><header>Leaderboard</header></b>
        <br></br><div id="container">
            <div class="row">
            <div class="name">Player1</div><div class="score">430</div>
            </div>
    
            <div class="row">
            <div class="name">Player2</div><div class="score">580</div>
            </div>
    
            <div class="row">
            <div class="name">Player3</div><div class="score">310</div>
            </div>
    
            <div class="row">
            <div class="name">Player4</div><div class="score">640</div>
            </div>
    
            <div class="row">
                <div class="name">Player5</div><div class="score">495</div>
            </div>
        </div>
        </div>
     

        </LightContainer>
        </div>
      </div>
    );
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    let elements = []
    let container = document.querySelector('#container')
    // Add each row to the array
    container.querySelectorAll('.row').forEach(el => elements.push(el))
    // Clear the container
    container.innerHTML = ''
    // Sort the array from highest to lowest
    elements.sort((a, b) => b.querySelector('.score').textContent - a.querySelector('.score').textContent)
    // Put the elements back into the container
    elements.forEach(e => container.appendChild(e))
  })

export default Board;