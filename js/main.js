'use strict';

{
  const targets = document.querySelectorAll('.item > div');
  const body = document.querySelector('body');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const links = document.querySelectorAll('.link');
  const menuBtns = document.querySelectorAll('.menu-btn');
  const menu = document.querySelector('.menu');

  function callBack(entries, obs){
    entries.forEach(entry =>{
      if(!entry.isIntersecting){
        return;
      }

      entry.target.classList.add('move');
      obs.unobserve(entry.target);
    });
  }

  function invert(entries){
    if(!entries[0].isIntersecting && !entries[0].target.classList.contains('white')){
      return;
    }

    body.classList.toggle('black');
    footer.classList.toggle('white');
    links.forEach(link =>{
      link.classList.toggle('blue');
    });
  }

  const option = {threshold: 0.8}
  const footerOption = {threshold: 0.5}

  const observer = new IntersectionObserver(callBack, option);
  targets.forEach(target =>{
    observer.observe(target);
  });

  const footerObserver = new IntersectionObserver(invert, footerOption);
  footerObserver.observe(footer);

  menuBtns.forEach(menuBtn =>{
    menuBtn.addEventListener('click', () =>{
      menuBtns[0].classList.toggle('hidden');
      menuBtns[1].classList.toggle('hidden');
      menu.classList.toggle('open');
      body.classList.toggle('menu-open');
      header.classList.toggle('menu-open');
    });
  });
}