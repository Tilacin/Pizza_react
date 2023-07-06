import React from "react";

import img2 from "./img/2.png"
import img3 from "./img/3.png"
import img4 from "./img/4.png"
import { Link } from "react-router-dom";
import  styles from './login.module.css'

const Login = () => {
  document.addEventListener("mousemove", (e) => {
    Object.assign(document.documentElement, {
      style: `
        --move-x: ${(e.clientX - window.innerWidth / 2) * -0.005}deg;
        --move-y: ${(e.clientY - window.innerHeight / 2) * -0.01}deg;
        `,
       
    });
  });
  return (
    <section className={styles.layers}>
      <div className={styles.container}>
        <div
          className={`${styles.item} ${styles.layer_1}`}></div>
        <div
          className={`${styles.item} ${styles.layer_2}`}>
          <img className={styles.layer_2_img} alt="Вкусная пицца" src={img2} />
        </div>
        <div
          className={`${styles.item} ${styles.layer_3}`}

        ></div>
        <div className={`${styles.item} ${styles.layer_4}`}>
          <Link to="home">
        <button className={`${styles.choice }`}>выбрать пиццу</button>
          </Link>
        </div>
        <div
          className={`${styles.item} ${styles.layer_5}`}>
          <img className={styles.layer_5_img} alt="Вкусная пицца" src={img3} />

        </div>
        <div
          className={`${styles.item} ${styles.layer_6}`}>
          <img className={styles.layer_6_img} alt="Вкусная пицца" src={img4} />

        </div>
      </div>
    </section>
  )
}

export default Login