import { isElement } from './elements.js';
import { getProperty } from '../objects';

export const graphIDAttributeName = 'data-hwt-graph-index';

export function ElementGraph( root ){
  if ( isElement( root ) ){
    this.root = root;
    this.graph = [];
    const buildGraph = ( graph, elements, rootPath ) => {
      for ( const element of elements ){
        element.setAttribute( graphIDAttributeName, `${ rootPath?.concat( '.' ) || '' }${ graph.length }` );
        const pseudoElement = {
          graph: this,
          element: element,
          children: []
        };
        graph.push( pseudoElement );
        pseudoElement.children = buildGraph( pseudoElement.children, element.children, `${ rootPath?.concat( '.' ) || '' }${ graph.length }` );
      }
    };
    this.appendTo = function( parent, ...elements ){
      const ID = parent.getAttribute( graphIDAttributeName );
      const graph = getProperty( ID )?.children;
      buildGraph( graph, elements, ID.replace( /\.?\d+$/ ) );
    }
    buildGraph( this.graph, root.children );
  }else throw new Error( 'Not an HTMLElement' );
}