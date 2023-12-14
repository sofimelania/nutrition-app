import { Nutrition } from './Nutrition'
import { useEffect, useState } from 'react';
import './App.css';
import LoaderPage from './Loader/LoaderPage';

function App() {
const [mySearch, setMySearch]=useState();
const [wordSubmitted, setWordSubmitted]=useState('');
const [myNutrition, setMyNutrition]=useState();
const [stateLoader, setStateLoader]=useState(false);

const APP_ID='4e9e8e0b';
const APP_KEY='144572513fa06c21f7ce94fa55168f66	';
const APP_URL='https://api.edamam.com/api/nutrition-details';

const fetchData=async (ingr) =>{
  setStateLoader(true)

  const response=await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingr: ingr })
  })

  if(response.ok) {
    setStateLoader(false);
    const data=await response.json();
    setMyNutrition(data);
  } else {
    setStateLoader(false);
    alert('ingredients entered incorrectly');
  }
}
const myRecipeSearch= e => {
  e.preventDefault();
  setWordSubmitted(mySearch);
}

useEffect(() =>{
  if (wordSubmitted !== '') {
   let ingr=wordSubmitted.split(/[,,;,\n,\r]/);
    fetchData(ingr);
  }
}, [wordSubmitted])
  return (
    <div className="App">
     {stateLoader && <LoaderPage/>} 
     <h1>Nutrition Analysis</h1>
     <form onSubmit={finalSearch}>
     
<input placeholder='Search...'onChange={myRecipeSearch}/>
<button type='submit'>Search</button>
</form>
<div>
{
  myNutrition && Object.values(myNutrition.totalNutrients).map(({label, quantity, unit})=>
  <Nutrition
  label={label}
  quantity={quantity}
  unit={unit}
  />
 )
}

</div>
 </div>

  );
}

export default App;
