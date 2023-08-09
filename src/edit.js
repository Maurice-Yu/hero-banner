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
	const { RichText } = wp.editor;
  const {
	textSection,
	hoursOfOperation,
	backgroundImage,
	mobileBackgroundImage,
	ctaButtonText,
	ctaButtonAnchor,
	verticalAlignment,
  } = attributes;

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

  // Function to save the social media links
  const saveSocialMediaLinks = () => {
	apiFetch({
	  path: '/wp/v2/options',
	  method: 'POST',
	  data: {
		your_plugin_social_media_links: socialMediaLinks,
	  },
	});
  };
  return (
		<fragment>
		<div>
		<InspectorControls>
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
		</InspectorControls>
	
	  </div>

	  <div className="hero-banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Desktop background image */}
      <div className="hero-banner__background" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Text Section */}
		<div className={`hero-banner__content hero-banner__content--${verticalAlignment}`}>
  {/* Text Section */}
  <div className="hero-banner__text">
    <RichText.Content tagName="h1" value={textSection} />
    <RichText.Content tagName="p" value={hoursOfOperation} />
  </div>

  {/* CTA Button */}
  {ctaButtonText && ctaButtonAnchor && (
    <Button href={`#${ctaButtonAnchor}`}>{ctaButtonText}</Button>
  )}
</div>
      </div>

      {/* Social Media Links */}
      <div className="hero-banner__social">
        {/* Replace the social icons and links accordingly */}
        <a href="#" className="hero-banner__social-link">
          <img src="facebook-icon.png" alt="Facebook" />
        </a>
        <a href="#" className="hero-banner__social-link">
          <img src="twitter-icon.png" alt="Twitter" />
        </a>
        <a href="#" className="hero-banner__social-link">
          <img src="instagram-icon.png" alt="Instagram" />
        </a>
      </div>
    </div>
 
	<div>

        {/* Editor controls */}
        <InspectorControls>
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
          </PanelBody>

          <PanelBody title={__('Hours of Operation', 'your-plugin')}>
            <TextControl
              value={hoursOfOperation}
              onChange={(value) => setAttributes({ hoursOfOperation: value })}
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
          <PanelBody title={__('Social Media Links', 'your-plugin')}>
            {['Facebook', 'Twitter', 'Instagram'].map((platform, index) => (
              <TextControl
                key={platform}
                label={platform}
                value={socialMediaLinks[index] || ''}
                onChange={(value) => onSelectSocialMediaLink(index, value)}
              />
            ))}
            <Button onClick={saveSocialMediaLinks}>{__('Save Links', 'your-plugin')}</Button>
          </PanelBody>
        </InspectorControls>

        {/* Frontend display */}
        <div className="hero-banner">
          {/* Your frontend code here */}
        </div>
      </div>
		</fragment>

	);
}
