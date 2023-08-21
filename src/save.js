/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';
import './editor.scss';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {
	const scrollToBottom = () => {
		document.querySelector('#bottom').scrollIntoView({ behavior: 'smooth' });
	  };
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
    <a key={index} href={button.url} className="social-media-link" style={{paddingTop: "27px" ,paddingRight: "13px", height: `${buttonSize}px`,width: `${buttonSize}px` }}>
      {button.icon ? (
        <img
          src={button.icon}
          alt={button.label}
          style={{paddingTop: "27px" ,paddingRight: "13px", height: `${buttonSize}px`,width: `${buttonSize}px` }}
        />
      ) : (
        <span className="placeholder-icon">Image</span>
      )}
      <span>{button.label}</span>
    </a>
    </div>
  ))}

</div>

      {/* Text content */}
      <div className="hero-banner__content" style={textStyle}>
        <div className="hero-banner__main-text" style={{paddingLeft: "0px",paddingRight: "0px"}}>
     
		<RichText.Content tagName="div" value={textSection} style={{paddingLeft: "0px",paddingRight: "0px"}} />
      
        </div>

        {/* Hours of operation text section */}
        <div className="hero-banner__hours" style={{paddingLeft: "0px",paddingRight: "0px",fontSize: `${hoursSize}px`, color: hoursColor }}>
		<RichText.Content tagName="div"  value={hoursOfOperation} />
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
</fragment>
	);
}
