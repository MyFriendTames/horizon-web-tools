import {
  merge
} from './properties.js';

export const createElement = ( tag, { innerHTML, children, listeners, constructor, style, ...properties } ) => {
  const element = document.createElement( tag );
  if ( innerHTML ) element.innerHTML = innerHTML;
  if ( children ) element.append( ...children.filter( child => !!child ) );
  if ( listeners ) Object.keys( listeners ).forEach( key => {
    if ( typeof listeners[ key ] === 'function' ){
      element.addEventListener( key, listeners[ key ] )
    }else{
      element.addEventListener( key, listeners[ key ].listener, listeners[ key ].useCapture )
    }
  } );
  mergeStyle( element, style );
  if ( constructor ) constructor( element );
  if ( properties ) merge( properties, element );
  return element;
};

export const loadScript = ( src, properties ) => new Promise( ( resolve, reject ) => document.head.append( createElement( 'script', {
  src,
  constructor: element => {
    element.onload = () => resolve( element );
    element.onerror = error => reject( error );
  },
  ...properties
} ) ) );

export const loadStylesheet = ( src, properties ) => new Promise( ( resolve, reject ) => document.head.append( createElement( 'link', {
  href: src,
  rel: 'stylesheet',
  type: 'text/css',
  constructor: element => {
    element.onload = () => resolve( element );
    element.onerror = error => reject( error );
  },
  ...properties
} ) ) );

export const readFile = ( file, method = 'readAsText' ) => new Promise( resolve => {
  try{
    const reader = new FileReader();
    reader.onloadend = ( { target } ) => resolve( target.result );
    reader.onabort = () => resolve( null );
    reader.onerror = () => resolve( null );
    reader[ method ]( file );
  }catch{
    resolve( null );
  }
} );

export const getFileName = filePath => filePath.substr( filePath.search( /[^\/\\]+$/ ) );

export const getBaseName = filePath => getFileName( filePath ).replace( /\.[^.]+$/, '' );

export const getParentDirectory = filePath => filePath.replace( /(\\|\/)?([^\\\/]+)?$/g, '' );

export function currentPath( path = '' ){
  return `${ getParentDirectory( document.currentScript.src ) }/${ path?.replace( /^(\\|\/)+/g, '' ) || '' }`;
}

export const isLeapYear = year => ( ( year % 4 == 0 ) && ( year % 100 != 0 ) ) || ( year % 400 == 0 );

export const mergeStyle = ( target, style ) => {
  if ( style && typeof style === 'object' ) Object.keys( style ).forEach( key => style[ key ] && target.style.setProperty( key, style[ key ] ) );
  return target;
};