import Collapse from './collapse';

const container = document.querySelector('#widgets-container');

new Collapse(container, {
  title: 'Виджет',
  content: `
   Виджет с анимацией открывания
  `,
});

