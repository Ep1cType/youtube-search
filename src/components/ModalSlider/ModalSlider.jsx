import React from "react";

import s from "./ModalSlider.module.scss";

import {InputNumber, Slider} from "antd";

const ModalSlider = ({sliderTitle, value, setValue}) => {
  return (
    <div className={s.modalSlider}>
      <label className={s.modalSlider__label}>
        {sliderTitle}
      </label>
      <div className={s.modalSlider__content}>
        <Slider
          className={s.modalSlider__slider}
          min={5}
          max={50}
          value={value}
          onChange={setValue}
        />
        <InputNumber
          min={5}
          max={50}
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default ModalSlider;
