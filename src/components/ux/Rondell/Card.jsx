'use client'

import "./Rondell.css";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Button from "./Button";

function Card({ imagen, text, title }) {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.1)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)"
  });
  return (
    <animated.div
      className="rondell_card"
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img className="rondell_card_image" src={imagen} alt="" />
      <h4 className="rondell_card_heading">{title}</h4>
      <p className="rondell_card_text">{text}</p>
      <div className="rondell_card_button">
        <Button text="Anschauen" />
      </div>
    </animated.div>
  );
}

export default Card;
