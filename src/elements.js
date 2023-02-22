import { merge } from './objects/objects.js';

export const isElement = element => element instanceof Element;

export const createElement = ( tag, { innerHTML, children, listeners, initialize, style, ...properties } ) => {
  const element = document.createElement( tag );
  mergeStyle( element, style );
  if ( typeof innerHTML === 'string' ) element.innerHTML = innerHTML;
  if ( Array.isArray( children ) ) element.append( ...children.filter( child => !!child ) );
  for ( const key in ( listeners && typeof listeners === 'object' ? listeners : {} ) ){
    if ( typeof listeners[ key ] === 'function' ) element.addEventListener( key, listeners[ key ] );
    else if ( typeof listeners[ key ]?.listener === 'function' ) element.addEventListener( key, listeners[ key ].listener, listeners[ key ].useCapture );
  }
  if ( typeof properties === 'object' ) merge( properties, element );
  if ( typeof initialize === 'function' ) initialize( element );
  return element;
};

export const mergeStyle = ( target, style ) => {
  if ( isElement( target ) )
  for ( const key in ( style && typeof style === 'object' ) ){
    if ( style[ key ] ) target.style.setProperty( key, style[ key ] );
  }
  return target;
};