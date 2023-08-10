/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
const { InspectorControls } = wp.blockEditor;
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Button } from '@wordpress/components';
import {PanelBody,ColorPallette,TextControl} from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
// import { RadioGroup, Radio } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';
import {
  __experimentalRadio as Radio,
  __experimentalRadioGroup as RadioGroup,
} from '@wordpress/components';
const {Fragment} = wp.element;
import {AlignmentToolbar } from '@wordpress/block-editor';

import { ColorPicker } from '@wordpress/components';
import { SelectControl,RangeControl } from '@wordpress/components';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */


export default function Edit({attributes,setAttributes}) {

  const {
	textSection,
	hoursOfOperation,
	backgroundImage,
	mobileBackgroundImage,
	ctaButtonText,
	ctaButtonAnchor,
	verticalAlignment,
  gradientColor,
  textSize,
  selectedFont,
  socialMediaButtons,
  buttonSize,
  hoursSize,
  hoursColor,
  textColor
  } = attributes;
  const textStyle = {
    fontSize: `${textSize}px`,
    fontFamily: selectedFont,
    color: textColor
  };
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  // Function to handle image selection for the background images
  const onSelectBackgroundImage = (media) => {
	setAttributes({ backgroundImage: media.url });
  };

  const onSelectMobileBackgroundImage = (media) => {
	setAttributes({ mobileBackgroundImage: media.url });
  };

  // Function to handle the CTA button anchor selection
  const onSelectButtonAnchor = (anchor) => {
	setAttributes({ ctaButtonAnchor: anchor });
  };

  // Function to handle social media link selection
  const onSelectSocialMediaLink = (index, link) => {
	const newLinks = [...socialMediaLinks];
	newLinks[index] = link;
	setSocialMediaLinks(newLinks);
  };
  const handleSocialMediaButtonChange = (index, key, value) => {
    const newButtons = [...attributes.socialMediaButtons];
    newButtons[index][key] = value;
    setAttributes({ socialMediaButtons: newButtons });
  };
  // Function to save the social media links
  const isMobile = window.innerWidth <= 800; // Adjust the breakpoint as needed
  return (
		<fragment>


<div className="hero-banner" style={{ backgroundImage: `url(${backgroundImage})`}}>
      {/* Desktop background image */}
  
      
      {/* Background overlay for fading effect */}
      <div
    className="hero-banner__background"
    style={{ backgroundImage: `url(${isMobile ? mobileBackgroundImage : backgroundImage})`}}
  ></div>
      <div className="hero-banner__overlay" style={{ backgroundColor: gradientColor }}></div>
      <div className="hero-banner__social" >
  {socialMediaButtons.map((button, index) => (
    <div >
    <a key={index} href={button.url} className="social-media-link" style={{paddingRight: "5px", height: `${buttonSize}px`,width: `${buttonSize}px` }}>
      {button.icon ? (
        <img
          src={button.icon}
          alt={button.label}
          style={{paddingRight: "5px", height: `${buttonSize}px`,width: `${buttonSize}px` }}
        />
      ) : (
        <span className="placeholder-icon">Image</span>
      )}
      <span>{button.label}</span>
    </a>
    </div>
  ))}
  <div>
  <a href="#bottom" className="scroll-button">
    Contact
  </a>
  </div>
</div>

      {/* Text content */}
      <div className="hero-banner__content" style={textStyle}>
        <div className="hero-banner__main-text">
     
          <RichText
            tagName="div"
            placeholder={__('Enter text...', 'your-plugin')}
            value={textSection}
            
            onChange={(value) => setAttributes({ textSection: value })}
            formattingControls={[]}
          />
      
        </div>

        {/* Hours of operation text section */}
        <div className="hero-banner__hours" style={{ fontSize: `${hoursSize}px`, color: hoursColor }}>
          <RichText
            tagName="div"
            value={hoursOfOperation}
            onChange={(value) => setAttributes({ hoursOfOperation: value })}
          />
        </div>

        {/* CTA Button */}
        {ctaButtonText && ctaButtonAnchor && (
          <Button href={`#${ctaButtonAnchor}`}>{ctaButtonText}</Button>
        )}
      </div>
      
      {/* Social Media Links */}
      <div className="hero-banner__social">
        {/* Replace the social icons and links accordingly */}
        {/* ... */}
      </div>
    </div>
<div>
        {/* Editor controls */}

        <div>
		<InspectorControls>
    <PanelBody title={__('Text Settings', 'your-plugin')}>
  <RangeControl
    label={__('Text Size', 'your-plugin')}
    value={textSize}
    onChange={(value) => setAttributes({ textSize: value })}
    min={10}
    max={100}
  />
  <SelectControl
    label={__('Font Family', 'your-plugin')}
    value={selectedFont}
    options={[
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },
      { label: 'Times New Roman', value: 'Times New Roman' },
      // Add more fonts here
    ]}
    onChange={(value) => setAttributes({ selectedFont: value })}
  />
</PanelBody>
		  {/* ... (your other inspector controls) */}
		  <MediaUpload
			onSelect={(media) => {
			  setBackgroundImage(media.url);
			  setAttributes({ backgroundImage: media.url });
			}}
			type="image"
			value={backgroundImage}
			render={({ open }) => (
			  <Button onClick={open}>
				{backgroundImage ? 'Change Image' : 'Upload Image'}
			  </Button>
			)}
		  />
  
  <PanelBody title={__('Social Media Buttons', 'your-plugin')}>
  <RangeControl
  label={__('Button Size', 'your-plugin')}
  value={buttonSize}
  onChange={(value) => setAttributes({ buttonSize: value })}
  min={10}
  max={100}
/>
  {socialMediaButtons.map((button, index) => (
    <div key={index} className="social-media-button">
      <TextControl
        label={__('Button URL', 'your-plugin')}
        value={button.url}
        onChange={(value) => handleSocialMediaButtonChange(index, 'url', value)}
      />
      <MediaUpload
        onSelect={(media) => handleSocialMediaButtonChange(index, 'icon', media.url)}
        allowedTypes={['image']}
        render={({ open }) => (
          <Button onClick={open}>
            {button.icon ? (
              <span>click to change image</span>
            ) : (
              __('Select Thumbnail', 'your-plugin')
            )}
          </Button>
        )}
      />
      <TextControl
        label={__('Button Label', 'your-plugin')}
        value={button.label}
        onChange={(value) => handleSocialMediaButtonChange(index, 'label', value)}
      />
    </div>
  ))}
</PanelBody>
		</InspectorControls>
	
	  </div>
        <InspectorControls>
        <PanelBody title={__('Fading Gradient Color', 'your-plugin')}>
  <ColorPicker
    color={gradientColor}
    onChangeComplete={(value) => setAttributes({ gradientColor: value.hex })}
  />
</PanelBody>
		<PanelBody title={__('Vertical Alignment', 'your-plugin')}>
  <SelectControl
    value={verticalAlignment}
    options={[
      { label: __('Top', 'your-plugin'), value: 'top' },
      { label: __('Center', 'your-plugin'), value: 'center' },
      { label: __('Bottom', 'your-plugin'), value: 'bottom' },
    ]}
    onChange={(value) => setAttributes({ verticalAlignment: value })}
  />
</PanelBody>
          <PanelBody title={__('Text Section', 'your-plugin')}>
            <TextControl
              value={textSection}
              onChange={(value) => setAttributes({ textSection: value })}
            />
              <ColorPicker
    label={__('Text Color', 'your-plugin')}
    color={textColor}
    onChangeComplete={(color) => setAttributes({ textColor: color.hex })}
  />
          </PanelBody>

          <PanelBody title={__('Hours of Operation', 'your-plugin')}>
            <TextControl
              value={hoursOfOperation}
              onChange={(value) => setAttributes({ hoursOfOperation: value })}
            />
          </PanelBody>
          <PanelBody title={__('Hours of Operation', 'your-plugin')}>
  <RangeControl
    label={__('Text Size', 'your-plugin')}
    value={hoursSize}
    onChange={(value) => setAttributes({ hoursSize: value })}
    min={10}
    max={50}
  />
  <ColorPicker
    label={__('Text Color', 'your-plugin')}
    color={hoursColor}
    onChangeComplete={(color) => setAttributes({ hoursColor: color.hex })}
  />
</PanelBody>
          <PanelBody title={__('Background Image', 'your-plugin')}>
            <MediaUpload
              onSelect={onSelectBackgroundImage}
              type="image"
              value={backgroundImage}
              render={({ open }) => (
                <Button onClick={open} isDefault>
                  {__('Select Background Image', 'your-plugin')}
                </Button>
              )}
            />
          </PanelBody>

          <PanelBody title={__('Mobile Background Image', 'your-plugin')}>
            <MediaUpload
              onSelect={onSelectMobileBackgroundImage}
              type="image"
              value={mobileBackgroundImage}
              render={({ open }) => (
                <Button onClick={open} isDefault>
                  {__('Select Mobile Background Image', 'your-plugin')}
                </Button>
              )}
            />
          </PanelBody>

          <PanelBody title={__('CTA Button', 'your-plugin')}>
            <TextControl
              value={ctaButtonText}
              onChange={(value) => setAttributes({ ctaButtonText: value })}
            />
            <TextControl
              value={ctaButtonAnchor}
              onChange={(value) => setAttributes({ ctaButtonAnchor: value })}
            />
          </PanelBody>

          {/* Social Media Links */}

        </InspectorControls>

        {/* Frontend display */}
        <div className="hero-banner">
          {/* Your frontend code here */}
        </div>
      </div>
		</fragment>

	);
}
