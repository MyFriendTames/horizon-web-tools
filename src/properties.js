const changeListenersPropertyName = '__change-listeners__';

export const setChangeListener = ( object, id, callback ) => {
  /*
    callback: ( object, property, oldValue, newValue, root ) => ...
    Parameters:
      object: object being changed
      property: relative property path
      oldValue: previous property value
      newValue: new property value
      root: root property path
  */
  if ( object[ changeListenersPropertyName ] == null || object.propertyIsEnumerable( changeListenersPropertyName ) || ( typeof object[ changeListenersPropertyName ] !== 'object' && !Array.isArray( object[ changeListenersPropertyName ] ) ) ){
    Object.defineProperty( object, changeListenersPropertyName, {
      value: {},
      writable: false,
      enumerable: false,
      configurable: false
    } );
  }
  if ( typeof callback === 'function' ) object[ changeListenersPropertyName ][ id ] = callback;
};

export const deleteChangeListener = ( object, id ) => delete object?.[ changeListenersPropertyName ]?.[ id ];

//const merge = ( source, target ) => {
//  Object.keys( source ).forEach( key => {
//    if ( source[ key ] != null && typeof source[ key ] === 'object' ) merge( source[ key ], target[ key ] );
//    else target[ key ] = source[ key ];
//  } );
//  return target;
//};

export const merge = ( source, target ) => {
  const mergeCallback = ( source, path ) => {
    Object.keys( source ).forEach( key => {
      if ( source[ key ] != null && typeof source[ key ] === 'object' ){
        target[ key ] = Array.isArray( source[ key ] ) ? [] : {};
        mergeCallback( source[ key ], [ ...path, key ] );
      } else setProperty( target, [ ...path, key ].join( '.' ), source[ key ] );
    } );
  };
  mergeCallback( source, '' );
  return target;
};

export const getProperty = ( object, property ) => property.split( '.' ).reduce( ( obj, key ) => obj?.[ key ], object );

export const setProperty = ( object, property, value, callbacks = [] ) => !!object && property.split( '.' ).forEach( ( key, i, path ) => {
  const currentObject = object;
  const changeListeners = object[ changeListenersPropertyName ];
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

export const deleteProperty = ( object, property, callbacks = [] ) => !!object && property.split( '.' ).every( ( key, i, path ) => {
  const currentObject = object;
  const changeListeners = object[ changeListenersPropertyName ];
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