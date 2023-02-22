import { isObject } from './objects.js';

// This name will be used (property name) to wrap the change listeners within an object
export const listenerWrapperName = '__HWT__change-listeners__';

// Registers a change-listener
/*
  Parameters:
    object: object to set the change-listener
    id: change-listener id-name
    callback: ( object, property, oldValue, newValue, root ) => ...
      object: object being changed
      property: relative property path
      oldValue: previous property value (will only be correct in non destructive operations for object properties)
      newValue: new property value
      root: root property path (bubbling)
*/
export const setChangeListener = ( object, id, callback ) => {
  // Creates the change-listener wrapper if it doesn't exist
  if (
    isObject( object )
    && (
      object[ listenerWrapperName ] == null
      || object.propertyIsEnumerable( listenerWrapperName )
      || (
        typeof object[ listenerWrapperName ] !== 'object'
        && !Array.isArray( object[ listenerWrapperName ] )
      )
    )
  ) Object.defineProperty( object, listenerWrapperName, { value: {} } );
  // Registers the change-listener
  if ( typeof callback === 'function' ) object[ listenerWrapperName ][ id ] = callback;
};

// Deletes a change-listener
export const deleteChangeListener = ( object, id ) => delete object?.[ listenerWrapperName ]?.[ id ];