import { debounce } from './debounce';

(function initialize() {
  function checkSlide() {
    sliderImages.forEach((sliderImage) => {
      // halfway through the image
      const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
      // bottom of the image
      const imageBottom = sliderImage.offsetTop + sliderImage.height;

      const isHalfShown = slideInAt > sliderImage.offsetTop;
      const isNotScrolledPast = window.scrollY < imageBottom;

      if (isHalfShown && isNotScrolledPast) {
        console.log('adding active to this');
        sliderImage.classList.add('active');
      } else {
        sliderImage.classList.remove('active');
      }
    });
  }

  const sliderImages = document.querySelectorAll('.slide-in') as NodeListOf<HTMLImageElement>;
  // window.addEventListener('scroll', debounce(checkSlide, 100, { leading: true, trailing: false }));
  window.addEventListener('scroll', debounce(checkSlide, 50));
}());
