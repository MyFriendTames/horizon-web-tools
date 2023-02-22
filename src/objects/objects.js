import { listenerWrapperName } from "./change-listeners";

// Determines if value is a non-null object
export const isObject = value => typeof value === 'object' && value !== null;

// Merges 'source' into 'target' and returns target
export const merge = ( source, target ) => {
  const mergeCallback = ( source, path ) => {
    for ( const key in source ){
      if ( source[ key ] != null && typeof source[ key ] === 'object' ){
        target[ key ] = Array.isArray( source[ key ] ) ? [] : {};
        mergeCallback( source[ key ], [ ...path, key ] );
      } else setProperty( target, [ ...path, key ].join( '.' ), source[ key ] );
    }
  };
  if ( isObject( target ) && isObject( source ) ) mergeCallback( source, '' );
  return target;
};

// Gets a property value
export const getProperty = ( object, property ) => typeof property === 'string' && property.split( '.' ).reduce( ( obj, key ) => obj?.[ key ], object );

// Sets a property value
export const setProperty = ( object, property, value, callbacks = [] ) => !!object && property.split( '.' ).forEach( ( key, i, path ) => {
  const currentObject = object;
  const changeListeners = object[ listenerWrapperName ];
  if ( typeof changeListeners === 'object' ) callbacks.splice( 0, 0, ( oldValue, newValue ) => Object.values( changeListeners ).forEach( listener => typeof listener === 'function' && listener( currentObject, path.slice( i ).join( '.' ), oldValue, newValue, path.slice( 0, i ).join( '.' ) ) ) );
  if ( i < path.length - 1 ){
    if ( object[ key ] == null || typeof object[ key ] !== 'object' ){
      if ( /^\d+$/.test( path[ i + 1 ] ) && !Array.isArray( object[ key ] ) ){
        object[ key ] = [];
      }else{
        object[ key ] = {};
      }
    }
    object = object[ key ];
  }else{
    const oldValue = object[ key ];
    const newValue = typeof value === 'function' ? value( oldValue ) : value;
    object[ key ] = newValue;
    callbacks.forEach( callback => callback( oldValue, newValue ) );
  }
} );

// Deletes a property
export const deleteProperty = ( object, property, callbacks = [] ) => !!object && property.split( '.' ).every( ( key, i, path ) => {
  const currentObject = object;
  const changeListeners = object[ listenerWrapperName ];
  if ( typeof changeListeners === 'object' ) callbacks.splice( 0, 0, ( oldValue, newValue ) => Object.values( changeListeners ).forEach( listener => typeof listener === 'function' && listener( currentObject, path.slice( i ).join( '.' ), oldValue, newValue, path.slice( 0, i ).join( '.' ) ) ) );
  if ( i < path.length - 1 ){
    if ( object[ key ] == null || typeof object[ key ] !== 'object' ){
      return false;
    }
    object = object[ key ];
  }else{
    const oldValue = object[ key ];
    delete object[ key ];
    callbacks.forEach( callback => callback( oldValue, undefined ) );
  }
} );