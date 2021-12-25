import React from "react";
import {Input} from "antd";

import s from './ModalInput.module.scss';

const ModalInput = ({inputLabel, inputValue, setInputValue, disabled}) => {
  return (
    <div className={s.modalInput}>
      <label>
        {inputLabel}
      </label>
      <Input
        className={s.modal__input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={disabled && disabled}
      />
    </div>
  );
};

export default ModalInput;
