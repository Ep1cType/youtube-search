import React from "react";

import s from './ModalSelect.module.scss';
import {Select} from "antd";

const {Option} = Select;

const ModalSelect = ({label, options, value, setValue}) => {
  return (
    <div className={s.modalSelect}>
      <label className={s.modalSelect__label}>
        {label}
      </label>
      <Select value={value} onChange={(event) => setValue(event)} className={s.modalSelect__select}>
        {
          options.map((option) => (
            <Option key={option.id} value={option.value}>{option.label}</Option>
          ))
        }
      </Select>
    </div>
  );
};

export default ModalSelect;
