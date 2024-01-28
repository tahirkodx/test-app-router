import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { RWebShare } from "react-web-social-share";
// import {
//   LinkedinShareButton,
//   LinkedinIcon,
// } from 'next-share'
// import {
//   // EmailShareButton,
//   // FacebookShareButton,
//   // GabShareButton,
//   // HatenaShareButton,
//   // InstapaperShareButton,
//   // LineShareButton,
//   LinkedinIcon,
//   LinkedinShareButton,
//   // LivejournalShareButton,
//   // MailruShareButton,
//   // OKShareButton,
//   // PinterestShareButton,
//   // PocketShareButton,
//   // RedditShareButton,
//   // TelegramShareButton,
//   // TumblrShareButton,
//   // TwitterShareButton,
//   // ViberShareButton,
//   // VKShareButton,
//   // WorkplaceShareButton,
//   // WhatsappShareButton,
// } from "react-share";
// import "./ShareLink.scss";

const ShareLink = (props: any) => {
  const [showShare, setShowShare] = useState(false);

  let btn = props.btn;
  
  return (
    <>
      <span className={`${props.class} position-relative`} style={props.style}>
        <div className="position-relative">
          {/* <LinkedinShareButton
            url={props.currentURL}
            className="Demo__some-network__share-button"
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton> */}
          {/* <LinkedinShareButton url={'https://github.com/next-share'}>
  <LinkedinIcon size={32} round />
</LinkedinShareButton> */}
          {/* <RWebShare 
            data={{
              text: props.textToShare,
              url: props.currentURL,
              title: props.title,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button
                variant={btn.variant}
                className={btn.class}
                size={btn.size}
                onClick={() => {
                  !showShare ? setShowShare(true) : setShowShare(false);
                  btn.click();
                }}
              >
                {btn.icon}
                {props.textBtn ? <span className={`fw-2`}>Share</span> : null}
              </Button>
          </RWebShare> */}
        </div>
      </span>

      {/* <span className={`${props.class} position-relative`} style={props.style}>
          <div className="position-relative">
            <ShareOnSocial
              textToShare={props.textToShare}
              link={props.currentURL}
              linkTitle={props.title}
              linkMetaDesc={props.description}
              linkFavicon={props.favicon}
              noReferer
            >
              <Button
                variant={btn.variant}
                className={btn.class}
                size={btn.size}
                onClick={() => {
                  !showShare ? setShowShare(true) : setShowShare(false);
                  btn.click();
                }}
              >
                {btn.icon}
                {props.textBtn ? <span className={`fw-2`}>Share</span> : null}
              </Button>
            </ShareOnSocial>
          </div>
        </span> */}
    </>
  );
};



export default ShareLink;
