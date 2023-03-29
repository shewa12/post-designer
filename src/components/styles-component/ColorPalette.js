
import { ColorPalette } from '@wordpress/components';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { __ } from "@wordpress/i18n";

const PDColorPalette = ({titleColor, setAttributes}) => {
  const [ color, setColor ] = useState ( titleColor )


  useEffect(() => {
    setAttributes({titleColor: color});
    var r = document.querySelector(':root');
    r.style.setProperty('--pd-title-color', color);
  }, color)

  return (
    <Fragment>
      <label className='pd-gb-label'>
        {__('Color', 'post-designer')}
      </label>
      <ColorPalette
        value={ color }
        onChange={ ( color ) => setColor( color ) }
      />
    </Fragment>
  );
}

export default PDColorPalette;