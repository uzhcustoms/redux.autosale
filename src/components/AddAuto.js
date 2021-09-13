import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveNewAuto, setAddAutoHidden, selectAutoHidden, selectArrYears, setAddAutoHiddenFalse  } from '../reducers/autoSlice';


export function AddAuto() {
  const dispatch = useDispatch();
  
//   const idxAuto = useSelector(selectIdxAuto);
  const arrYears = useSelector(selectArrYears);
  const autoHidden = useSelector(selectAutoHidden);
 
  const valuesAddAuto = () => {
    let markaValue = document.querySelector("#manufacturer");
    let modelValue = document.querySelector("#model");
    let yearValue = document.querySelector("#year");
    let volumeValue = document.querySelector("#volume");
    let priceValue = document.querySelector("#price");
    let colorValue = document.querySelector("#color");
    let descriptionValue = document.querySelector("#description");
    let imgValue = document.querySelector("#image");
    let objData = { marka: markaValue.value, 
                    model: modelValue.value,
                    year: yearValue.value, 
                    volume: volumeValue.value,
                    price: priceValue.value, 
                    color: colorValue.value,
                    description: descriptionValue.value,
                    img: imgValue.value
                  };
    return objData;
}

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveNewAuto(valuesAddAuto()));
    dispatch(setAddAutoHiddenFalse());
}

const cancelClich  = () => {
    dispatch(setAddAutoHiddenFalse());
}

const addClich = () => {
     dispatch(setAddAutoHidden());
}
  return (
      <>
{ autoHidden ? 
    <div className="add-auto">
      <form onSubmit={handleSubmit}>
        <div className="add-auto-item">
                <div className="add-auto-title">
                    <h3>Добавить авто</h3>
                </div>
               
                    <div className="add-auto-title">
                        <p>Марка</p>
                        <input id="manufacturer" type="text" placeholder="Марка" pattern="[A-Z]+|[a-z]+" required/>
                        
                    </div>
                    <div className="add-auto-title">
                        <p>Модель</p>
                        <input id="model"  type="text" placeholder="Модель"/>
                    </div>
                    <div className="add-auto-title">
                        <p>Год</p>
                    <div className="wrapper">
                            <select id="year" className="selection" required>
                                {arrYears.map((item, idx)=>
                                <option key={idx}>{item}</option>
                                )}
                                
                            </select>
                        </div>
                    </div>
                    <div className="add-auto-title">
                        <p>Объем</p>
                        <input id="volume" type="number" min="0.1" max="15.0" step="0.1" placeholder="1.6"/>
                        <span> л.</span>
                    </div>
                    <div className="add-auto-title">
                        <p>Цена</p>
                        <input id="price" type="number" min="100" max="1000000" step="100" placeholder="0"/>
                        <span> $</span>
                    </div>
                    <div className="add-auto-title">
                        <p>Цвет</p>
                        <input id="color" type="text" placeholder="белый"/>
                    </div>
                    <div className="add-auto-title">
                        <p>Описание</p>
                        <textarea id="description" rows="5" cols="45" name="text" defaultValue="Опишыте автомобиль"/>
                    </div>
                    <div className="add-auto-title">
                    <p>Фото</p>
                    <input id="image" type="text" placeholder="urlImg"/>
                    </div>
                
        </div>

        <div className="auto-save">
            <button onClick={cancelClich} id="cancel">Отменить</button>
            <button type="submit" id="save">Сохранить</button>
        </div>
      </form>     
    </div> 
    : <button id="addAuto" onClick={addClich}>Добавить авто</button> }
          </>                 
  );
}
