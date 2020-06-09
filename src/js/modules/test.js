const data = [
   {id: 1, name: "Категория 1", parent_id: 0},
   {id: 2, name: "Категория 2", parent_id: 0},
   {id: 3, name: "Категория 3", parent_id: 1},
   {id: 4, name: "Категория 4", parent_id: 3},
   {id: 5, name: "Категория 5", parent_id: 1}
 ];
 
 const root = document.querySelector('ul');
 const getItem = (name, id) => `<li data-id="${id}">${name}</li>`;
 
 data.forEach((item) => {
    const child = root.querySelector(`[data-id="${item.parent_id}"]`);
   const itemMarkup = getItem(item.name, item.id);
   
   if (child) {
      const list = child.querySelector('ul');
     
     if (list) {
        list.insertAdjacentHTML('beforeend', itemMarkup);
     } else {
        child.insertAdjacentHTML('beforeend', `<ul>${itemMarkup}</ul>`);
     }
   } else {
      root.insertAdjacentHTML('beforeend', itemMarkup);
   }
 });