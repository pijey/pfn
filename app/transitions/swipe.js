import { stop, animate, Promise } from "liquid-fire";

export default function swipe(opts={}) {
  var direction = -1;
  if(this.oldValue > this.newValue){
    direction = 1;
  }
  var bigger = biggestSize(this, 'width');
  stop(this.oldElement);
  return Promise.all([
    animate(this.oldElement, { translateX: (bigger * direction) + 'px' }, opts),
    animate(this.newElement, { translateX: ["0px", (-1 * bigger * direction) + 'px'] }, opts),
  ]);
}


function biggestSize(context, dimension) {
  var sizes = [];
  if (context.newElement) {
    sizes.push(parseInt(context.newElement.css(dimension), 10));
    sizes.push(parseInt(context.newElement.parent().css(dimension), 10));
  }
  if (context.oldElement) {
    sizes.push(parseInt(context.oldElement.css(dimension), 10));
    sizes.push(parseInt(context.oldElement.parent().css(dimension), 10));
  }
  return Math.max.apply(null, sizes);
}