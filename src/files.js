import { createElement } from './elements.js';

// Returns everything after the last '/' character
export const getFileName = filePath => typeof filePath === 'string' ? filePath.substring( filePath.search( /[^\/\\]+$/ ) ) : '';

// Returns everything after the last '/' and before the last '.' characters
export const getBaseName = filePath => getFileName( filePath ).replace( /\.[^.]+$/, '' );

// Returns everything before the last '/' character
export const getParentDirectory = filePath => typeof filePath === 'string' ? filePath.replace( /(\\|\/)?([^\\\/]+)?$/g, '' ) : '';

// Returns the current script path
/*
  - Must be used carefully
  - Call in the global context 'only', otherwise the currentScript variable could have an wrong value
*/
export function currentPath( path = '' ){
  return `${ getParentDirectory( document?.currentScript?.src ) }/${ path?.replace( /^(\\|\/)+/g, '' ) || '' }`;
}

// Asynchronously loads a script into the head element
export const loadScript = ( src, properties ) => new Promise( ( resolve, reject ) => document.head.append( createElement( 'script', {
  src,
  constructor: element => {
    element.onload = () => resolve( element );
    element.onerror = error => reject( error );
  },
  ...properties
} ) ) );

// Asynchronously loads a stylesheet into the head element
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

// Asynchronously reads a file
export const readFile = ( file, method = 'readAsText', riseExceptions = false ) => new Promise( ( ...resolve ) => {
  try{
    const reader = new FileReader();
    reader.onloadend = ( { target } ) => resolve( target.result );
    reader.onabort = () => resolve[ !!riseExceptions ]( null );
    reader.onerror = () => resolve[ !!riseExceptions ]( null );
    reader[ method ]( file );
  }catch{
    resolve[ !!riseExceptions ]( null );
  }
} );