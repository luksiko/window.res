import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
   let windowForm = document.querySelectorAll('.balcon_icons_img'),
      windowWidth = document.querySelectorAll('#width'),
      windowHeight = document.querySelectorAll('#height'),
      windowType = document.querySelectorAll('#view_type'),
      windowProfile = document.querySelectorAll('.checkbox');

   // проверка на введенность символов - только цифры
   checkNumInputs('#width');
   checkNumInputs('#height');

   // функция для добавления данных с всех форм в переменную changeModal
   function bindActionsToEvents(event, elem, prop) {
      elem.forEach((item, i) => {
         item.addEventListener(event, () => {
            // точно определяем в какой элемент кликнул пользователь
            switch (item.nodeName) {
               case 'SPAN':
                  state[prop] = i;
                  break;
               case 'INPUT':
                  if (item.getAttribute('type') === 'checkbox') {
                     i === 0 ? state[prop] = "Холодное" : state[prop] = "Тёплое";
                     //очищать все чекбоксы кроме чекнутого 
                     elem.forEach((box, j) => {
                        box.checked = false;
                        if (i == j) {
                           box.checked = true;
                        }
                     })
                     //
                  } else {
                     state[prop] = item.value; // добавляем свойство обьекта с именем prop
                  }
                  break;
               case 'SELECT':
                  state[prop] = item.value;
                  break;
            }
            console.log(state);
         });
      });
   }
   bindActionsToEvents('click', windowForm, 'form');
   bindActionsToEvents('input', windowHeight, 'height');
   bindActionsToEvents('input', windowWidth, 'width');
   bindActionsToEvents('change', windowType, 'type');
   bindActionsToEvents('change', windowProfile, 'profile');

   windowForm = '';
   windowWidth = '';
   windowHeight = '';
   windowType = '';
   windowProfile = '';

};

export default changeModalState;