import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAuto, setHidden, selectAutos, selectIdxAuto, selectArrYears, selectFilter, selectFilterMarka   } from '../reducers/autoSlice';


export function EditAuto() {
  const dispatch = useDispatch();
  const autos = useSelector(selectAutos);
  const idxAuto = useSelector(selectIdxAuto);
  const arrYears = useSelector(selectArrYears);
  const filter = useSelector(selectFilter);
  const filterMarka = useSelector(selectFilterMarka);

  let arr;
  if(filter) {
    arr = filterMarka
  } else {
    arr = autos
  }

  const valuesForm = () => {
    let priceValue = document.querySelector("#price");
    let yearValue = document.querySelector("#year");
    let volumeValue = document.querySelector("#volume");
    let colorValue = document.querySelector("#color");
    let descriptionValue = document.querySelector("#description");
    let objData = { price: priceValue.value, 
                    year: yearValue.value, 
                    volume: volumeValue.value,
                    color: colorValue.value,
                    description: descriptionValue.value,
                   
                  };
    return objData;
}

const saveClick = (e) => {
    console.log(valuesForm());
    dispatch(saveAuto({obj:valuesForm(), id: e.target.parentElement.id}));
}

const cancelClich = () => {
    dispatch(setHidden());
}
  return (
    <div className="edit">
        
            <div className="edit-auto-img">
                <img src={arr[idxAuto].img} alt="edit-img" width="100%"/>
            </div>

             <div className="edit-auto">
                <div className="edit-auto-title">
                    <h3>{arr[idxAuto].name}</h3>
                </div>
                <div className="edit-auto-title">
                    <p>Цена</p>
                    <input id="price" type="number" min="100" max="1000000" step="100" placeholder={arr[idxAuto].price}/>
                    <span> $</span>
                </div>
                <div className="edit-auto-title">
                    <p>Год</p>
                   <div className="wrapper">
                        <select id="year" className="selection">
                            {arrYears.map((item, idx)=>
                            <option key={idx}>{item}</option>
                            )}
                            <option selected>{arr[idxAuto].year}</option>
                        </select>
                    </div>
                </div>
                <div className="edit-auto-title">
                    <p>Объем</p>
                    <input id="volume" type="number" min="0.1" max="15.0" step="0.1" placeholder={arr[idxAuto].volume}/>
                    <span> л.</span>
                </div>
                <div className="edit-auto-title">
                    <p>Цвет</p>
                     <input id="color" type="text" placeholder={arr[idxAuto].color}/>
                </div>
                <div className="edit-auto-title">
                    <p>Описание</p>
                    <textarea id="description" rows="5" cols="45" name="text" defaultValue={arr[idxAuto].description}/>
                </div>
                 <div className="auto-save" id={arr[idxAuto].id}>
                    <button onClick={cancelClich} id="cancel">Отменить</button>
                    <button onClick={saveClick} id="save">Сохранить</button>
                </div>
            </div>

           
             
    </div>
  );
}
