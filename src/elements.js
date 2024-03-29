import { isObject, merge } from './objects';

export const isElement = element => element instanceof Element;

export const createElement = ( tag, { innerHTML, children, listeners, initialize, style, attributes, ...properties } ) => {
  const element = document.createElement( tag );
  mergeStyle( element, style );
  if ( typeof innerHTML === 'string' ) element.innerHTML = innerHTML;
  if ( Array.isArray( children ) ) element.append( ...children.filter( child => !!child ) );
  for ( const key in ( listeners && typeof listeners === 'object' ? listeners : {} ) ){
    if ( typeof listeners[ key ] === 'function' ) element.addEventListener( key, listeners[ key ] );
    else if ( typeof listeners[ key ]?.listener === 'function' ) element.addEventListener( key, listeners[ key ].listener, listeners[ key ].useCapture );
  }
  if ( isObject( attributes ) ){
    for ( const key in attributes ){
      element.setAttribute( key, attributes[ key ] );
    }
  }
  if ( isObject( properties ) ) merge( properties, element );
  if ( typeof initialize === 'function' ) initialize( element );
  return element;
};

export const mergeStyle = ( target, style ) => {
  if ( isElement( target ) && isObject( style ) )
  for ( const key in style ){
    if ( style[ key ] ) target.style.setProperty( key, style[ key ] );
  }
  return target;
};