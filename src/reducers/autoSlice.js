import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 autos: [{
   id: 0,
   marka: "Audi",
   model: "A4",
   year: 2010,
   volume: '1.6',
   price: 11500,
   color: "серый",
   description: "В отличном состоянии, не требует ремонта.",
   img: "https://foothillsalesandleasing.com/wp-content/uploads/imgp/Audi-A4-1.6-2010-1-8911.jpg",
 },
 {
   id: 1,
   marka: "Audi",
   model: "A8",
   year: 2014,
   volume: '2.4',
   price: 16500,
   color: "чорный",
   description: "В отличном состоянии, не требует ремонта.",
   img: "https://upload.wikimedia.org/wikipedia/commons/9/98/Audi_A8-D5.jpg",
 },
{
   id: 2,
   marka: "BMW",
   model: "520d",
   year: 2014,
   volume: '2.0',
   price: 17500,
   color: "чорный",
   description: "В отличном состоянии, не требует ремонта. Только пригнана с Германии, первый владелец.",
   img: "https://cdn.myauto.ua/BMW-520-korichnevyiy-none-2014-230/thumb-wide/auto-44573771.jpeg",
 },
{
   id: 3,
   marka: "Mercedes",
   model: "E-class",
   year: 2016,
   volume: '2.0',
   price: 17500,
   color: "белый",
   description: "В отличном состоянии, не требует ремонта. Первый владелец, первая реестрация.",
   img: "https://s.auto.drom.ru/img4/catalog/photos/fullsize/mercedes-benz/e-class/mercedes-benz_e-class_35651.jpg",
 }],

 hidden: false,
 addAutoHidden: false,
 arrYears: Array.from({ length: 122 }, (v, k) => k + 1900),
 filter: false,
 
};



export const autoSlice = createSlice({
  name: 'auto',
  initialState,
  reducers: {
    editAuto: (state, action) => {
      if(state.filter) {
        state.idxAuto = state.filterMarka.findIndex((item => item.id == action.payload))
      } else {
        state.idxAuto = state.autos.findIndex((item => item.id == action.payload))
      }
      state.hidden = true;
    },

    deleteAuto: (state, action) => {
      
      if(state.filter) {
        let  idxMarka = state.filterMarka.findIndex((item => item.id == action.payload))
        state.filterMarka.splice(idxMarka, 1);
       }
      
      let  idx = state.autos.findIndex((item => item.id == action.payload))
        state.autos.splice(idx, 1);
    },

    saveAuto: (state, action) => {
      let  idx = state.autos.findIndex((item => item.id == action.payload.id))
      if(state.filter) {
        state.filterMarka[state.idxAuto].year = action.payload.obj.year;
        state.filterMarka[state.idxAuto].color = action.payload.obj.color;
        state.filterMarka[state.idxAuto].price = action.payload.obj.price;
        state.filterMarka[state.idxAuto].volume = action.payload.obj.volume;
        state.filterMarka[state.idxAuto].description = action.payload.obj.description;
        state.autos[idx].year = state.filterMarka[state.idxAuto].year
        state.autos[idx].color =state.filterMarka[state.idxAuto].color;
        state.autos[idx].price = state.filterMarka[state.idxAuto].price;
        state.autos[idx].volume = state.filterMarka[state.idxAuto].volume;
        state.autos[idx].description = state.filterMarka[state.idxAuto].description;
      } else {
        state.autos[state.idxAuto].year = action.payload.obj.year;
        state.autos[state.idxAuto].color = action.payload.obj.color;
        state.autos[state.idxAuto].price = action.payload.obj.price;
        state.autos[state.idxAuto].volume = action.payload.obj.volume;
        state.autos[state.idxAuto].description = action.payload.obj.description;
      }
      
      state.hidden = false;
    },

    saveNewAuto: (state, action) => {
      
      const objAuto = {
          id: (state.autos.length - 1) + 1,
          marka: action.payload.marka,
          model: action.payload.model,
          year: action.payload.year,
          volume: action.payload.volume,
          price: action.payload.price,
          color: action.payload.color,
          description: action.payload.description,
          img: action.payload.img
      }

      state.autos.unshift(objAuto);
      state.hidden = false;
    },

    setHidden: (state) => {
      state.hidden = false;
    },

    getHidden: (state) => {
      state.hidden = true;
    },

    setAddAutoHidden: (state) => {
      state.addAutoHidden = true;
    },

    setAddAutoHiddenFalse: (state) => {
      state.addAutoHidden = false;
    },

    searchInData: (state, action) => {
   
      if(action.payload.marka == "Любая" && action.payload.year == "Любой" && action.payload.color == "Любой" && action.payload.volume == "Любой") {
        state.filter = false;
      } else {
        let values = [];
        for(let item in action.payload) {
          values.push(action.payload[item]);
        }
       
      function filterResults(arr) {
        return state.autos
          .filter(function(el) {
            return arr.some(function(e) {
              return values[0] == "Любая" ? true : el.marka == e ;
            })
          })
          .filter(function(el) {
            return arr.some(function(e) {
              return values[1] == "Любой" ? true : el.year == e ;
            })
          })
          .filter(function(el) {
            return arr.some(function(e) {
              return values[2] == "Любой" ? true : el.color == e;
            })
          })
          .filter(function(el) {
            return arr.some(function(e) {
              return values[3] == "Любой" ? true : el.volume == e;
            })
          });
        }
        state.filterMarka = filterResults(values);
      state.filter = true;
     }
    },
  },
});

export const { editAuto, saveAuto, saveNewAuto, deleteAuto, setHidden, getHidden, setAddAutoHidden,setAddAutoHiddenFalse, searchInData } = autoSlice.actions;
export const selectAutos = (state) => state.auto.autos;
export const selectIdxAuto = (state) => state.auto.idxAuto;
export const selectHidden = (state) => state.auto.hidden;
export const selectArrYears = (state) => state.auto.arrYears;
export const selectAutoHidden = (state) => state.auto.addAutoHidden;
export const selectFilter = (state) => state.auto.filter;
export const selectFilterMarka = (state) => state.auto.filterMarka;

export default autoSlice.reducer;
