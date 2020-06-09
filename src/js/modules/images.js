const images = () => {
   const imgPopup = document.createElement('div'),
      worksSection = document.querySelector('.works'),
      bigImage = document.createElement('img');

   imgPopup.classList.add('popup');
   worksSection.appendChild(imgPopup);

   imgPopup.style.justifyContent = 'center';
   imgPopup.style.alignItems = 'center';
   imgPopup.style.display = 'none';

   imgPopup.appendChild(bigImage);

   worksSection.addEventListener('click', e => {
      e.preventDefault();

      let target = e.target;

      if (target && target.classList.contains('preview')) {
         const path = target.parentNode.getAttribute('href');
         bigImage.setAttribute('src', path);
         imgPopup.style.display = 'flex';
         document.body.style.overflow = 'hidden';
      }

      if (target && target.matches('div.popup')) {
         imgPopup.style.display = 'none';
         document.body.style.overflow = '';
      }
   });
};

export default images;