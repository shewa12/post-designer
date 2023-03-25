
import { ColorPalette } from '@wordpress/components';
import { useState } from '@wordpress/element';

const PDColorPalette = () => {
  const [ color, setColor ] = useState ( '#424242' )
  const colors = [
    { name: 'black', color: '#424242' }
  ];
  return (
    <ColorPalette
      colors={ colors }
      value={ color }
      onChange={ ( color ) => setColor( color ) }
    />
  );
}

export default PDColorPalette;