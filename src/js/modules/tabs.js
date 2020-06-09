const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = "block") => {
   const header = document.querySelector(headerSelector),
      tab = document.querySelectorAll(tabSelector),
      content = document.querySelectorAll(contentSelector);

   function hideTabContent() {
      content.forEach(item => {
         item.style.display = 'none';
      });
      tab.forEach(item => {
         item.classList.remove(activeClass);
      })
   }

   function showTabContent(i = 0) {
      content[i].style.display = display;
      tab[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();

   // дилигирование. проверяем клик на поле с табами. 
   header.addEventListener('click', (e) => {
      const target = e.target;
      if (target &&
         (target.classList.contains(tabSelector.replace(/\./, "")) || // обрезаем из класса точку которая передается в tabSelector
            target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
         tab.forEach((item, i) => { // передаем таб и его номер
            if (target == item || target.parentNode == item) {
               hideTabContent();
               showTabContent(i);
            }
         })
      }
   })
};

export default tabs;