import React from "react";
import {Button} from "antd";

import s from './ModalFooter.module.scss';

const ModalFooter = ({cancelText, okText, onModalCancel, onModalSubmit}) => {
  return (
    <div className={s.modalFooter}>
      <Button className={s.modalFooter__button} onClick={() => onModalCancel()} size="large" type="default">
        {cancelText}
      </Button>
      <Button className={s.modalFooter__button} onClick={() => onModalSubmit()} size='large' type="primary">
        {okText}
      </Button>
    </div>
  );
};

export default ModalFooter;
