import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editAuto, deleteAuto, selectAutos, selectFilter, selectFilterMarka } from '../reducers/autoSlice';


export function Autos() {
  const dispatch = useDispatch();
  const autos = useSelector(selectAutos);
  const filter = useSelector(selectFilter);
  const filterMarka = useSelector(selectFilterMarka);

  let arr;
    if(filter) {
      arr = filterMarka
    } else {
      arr = autos
    }
   
  const deleteClick = (e) => {
    dispatch(deleteAuto(e.target.parentElement.id));
  }

   const editClick = (e) => {
    dispatch(editAuto(e.target.parentElement.id));
  }

  return (
    <div className="autos">
      {arr.length == 0 ? <h2>Нет автомобилей!</h2> : arr.map((item, idx) => 
      <div className="auto" key={idx} id={`auto-${idx}`}>
        <div className="auto-edit">
          <img src={item.img} alt={`auto-${idx}`} width="100%"/>
          <div className="setting" id={item.id}>
            <button onClick={editClick} id="edit">Редактировать</button>
            <button onClick={deleteClick} id="delete">Удалить</button>
          </div>
        </div>
        <div className="auto-item">
          <div className="auto-item-title">
            <p>Название</p>
            <span>{item.marka} {item.model}</span>
          </div>
          <div className="auto-item-title">
            <p>Цена</p>
            <span>{item.price} $</span>
          </div>
          <div className="auto-item-title">
            <p>Год</p>
            <span>{item.year}</span>
          </div>
          <div className="auto-item-title">
            <p>Объем</p>
            <span>{item.volume} л.</span>
          </div>
           <div className="auto-item-title">
            <p>Цвет</p>
            <span>{item.color}</span>
          </div>
          <div className="auto-item-title">
            <p>Описание</p>
            <span>{item.description}</span>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
