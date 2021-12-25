import React, {useRef, useState} from "react";

import s from "./ModalWindow.module.scss";

import {Modal} from "antd";

import ModalInput from "../ModalInput/ModalInput";
import ModalSelect from "../ModalSelect/ModalSelect";
import ModalSlider from "../ModalSlider/ModalSlider";
import ModalFooter from "../ModalFooter/ModalFooter";
import {useLocation, useSearchParams} from "react-router-dom";
import {useParams} from "react-router";

const options = [
  {
    id: 1,
    value: "relevance",
    label: "Без сортировки"
  },
  {
    id: 2,
    value: "date",
    label: "Дате"
  },
  {
    id: 3,
    value: "rating",
    label: "Рейтингу"
  },
  {
    id: 4,
    value: "title",
    label: "Названию"
  },
  {
    id: 5,
    value: "videoCount",
    label: "Количеству видео"
  },
  {
    id: 6,
    value: "viewCount",
    label: "Количеству просмотров"
  },
];

const ModalWindow = (
  {
    isModalVisible,
    isEditMode,
    onModalCancel,
    searchValue,
    setSearchValue,
    maxResult,
    setMaxResult,
    favouriteName,
    setFavouriteName,
    onModalSubmit,
    orderBy,
    setOrderBy
  }
) => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  console.log("Параметры в модалке", searchParams.get("max_result"), searchParams.get("search_query"))

  const [vis, setVis] = useState(false);

  const okText = isEditMode ? "Изменить" : "Сохранить";
  const cancelText = isEditMode ? "Не изменять" : "Не сохранять";
  // const onOk = isEditMode ? handleEditOk : handleSubmitOk;
  const modalTitle = isEditMode ? "Изменить запрос" : "Сохранить запрос";


  return (
    <Modal
      centered
      visible={isModalVisible}
      okText={okText}
      cancelText={cancelText}
      onOk={onModalSubmit}
      onCancel={onModalCancel}
      footer={[
        <ModalFooter cancelText={cancelText} okText={okText} />
      ]}
    >
      <div className={s.modal__container}>
        <h3 className={s.modal__title}>{modalTitle}</h3>
        <ModalInput
          inputLabel="Запрос:"
          disabled={!isEditMode}
          inputValue={searchValue}
          setInputValue={setSearchValue}
        />
        <ModalInput
          inputLabel="Название:"
          inputValue={favouriteName}
          setInputValue={setFavouriteName}
        />
        <ModalSelect
          value={orderBy}
          setValue={setOrderBy}
          options={options}
          label="Сортировать по:"
        />
        <ModalSlider
          sliderTitle="Максимальное количество:"
          value={maxResult}
          setValue={setMaxResult}
        />
      </div>
    </Modal>
  );
};

export default ModalWindow;
