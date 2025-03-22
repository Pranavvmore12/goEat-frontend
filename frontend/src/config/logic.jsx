export const isPresentInFavorites=(favorites,restaurant)=>{
    for(let item of favorites){
      if(restaurant._id===item._id)return true
    }
    return false;
  }