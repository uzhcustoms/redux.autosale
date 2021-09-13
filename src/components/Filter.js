import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchInData, selectAutos, selectArrYears} from '../reducers/autoSlice';


export function Filter() {
  const dispatch = useDispatch();
  const autos = useSelector(selectAutos);
  const arrYears = useSelector(selectArrYears); 

  let arrSelectMarka = autos.reduce(function(a,b){
      if (a.indexOf(b.marka) < 0 ) a.push(b.marka);
      return a;
    },[]);
  
  let arrSelectColor = autos.reduce(function(a,b){
      if (a.indexOf(b.color) < 0 ) a.push(b.color);
      return a;
    },[]);

  let arrSelectVolume = autos.reduce(function(a,b){
      if (a.indexOf(b.volume) < 0 ) a.push(b.volume);
      return a;
    },[]).sort();

  console.log(arrSelectVolume);
    
  const searchClick = () => {
    let markaValue = document.querySelector(".searchMarka");
    let yearValue = document.querySelector(".searchYear");
    let colorValue = document.querySelector(".searchColor");
    let volumeValue = document.querySelector(".searchVolume");
    let priceValueFrom = document.querySelector(".searchPriceFrom");
    let priceValueTo = document.querySelector(".searchPriceTo");

    let objSearch = {
      marka: markaValue.value,
      year: yearValue.value,
      color: colorValue.value,
      volume: volumeValue.value,
      price: {from: priceValueFrom.value , to: priceValueTo.value}
    }
    dispatch(searchInData(objSearch))

  }

  return (
    <div className="filter">
      <h3>Поиск</h3>
      <div className="search-auto">
        <p>Марка</p>
        <select className="searchMarka">
          <option >Любая</option>
          {arrSelectMarka.map((item, idx) => <option key={idx}>{item}</option>)}
        </select>

        <p>Год выпуска</p>
        <select className="searchYear">
          <option >Любой</option>
           {arrYears.map((item, idx)=> <option key={idx}>{item}</option>)}
        </select>

        <p>Цвет</p>
        <select className="searchColor">
          <option >Любой</option>
          {arrSelectColor.map((item, idx) => <option key={idx}>{item}</option>)}
        </select>

         <p>Объем</p>
        <select className="searchVolume">
          <option >Любой</option>
          {arrSelectVolume.map((item, idx) => <option key={idx}>{item}</option>)}
        </select>

         <p>Цена</p>
        <div className="search-price">
          <input type="number" min="100" max="10000000" step="100" className="searchPriceFrom" placeholder="от"/>
          <input type="number" min="100" max="10000000" step="100" className="searchPriceTo" placeholder="до"/>
        </div>

      </div>
      <button id="search" onClick={searchClick}>Поиск</button>
    </div>
  );
}
