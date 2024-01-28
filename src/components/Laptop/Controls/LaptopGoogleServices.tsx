import Script from "next/script";
import React from "react";
import { Helmet } from "react-helmet";

const LaptopGoogleServices = () => {
  return (
    <>
      <Helmet>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2TRV0BEV6K"
        />
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());

            gtag('config', 'G-2TRV0BEV6K');`}
        </script>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}

        {/* Global site tag (gtag.js) - Google Ads: 948051367 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-948051367"
        />
        <script>
          {`    window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());

            gtag('config', 'AW-948051367'); `}
        </script>
        {/* End Global site tag (gtag.js) - Google Ads: 948051367 */}

        {/* <%-- GTAG Added On (14-02-22) --%> */}
        {/* <!-- Google Tag Manager --> */}
        <script>{`
            (function (w, d, s, l, i) {
                w[l] = w[l] || []; w[l].push({
                    'gtm.start':
                        new Date().getTime(), event: 'gtm.js'
                }); var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-5HBP5LH');
        `}</script>
        {/* End Google Tag Manager */}
        {/* GTAG Added On (14-02-22) */}

        {/* Google Tag Manager Script + Syndication Script */}
        <script>
          {`
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date(); a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    
            ga('create', 'UA-4183648-1', 'auto');
            ga('send', 'pageview');
          `}
        </script>

        {/* <!-- Facebook Pixel Code --> */}
        <script>
          {`
            !function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () {
                    n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                n.queue = []; t = b.createElement(e); t.async = !0;
                t.src = v; s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '612969498842082');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`
            <img
                height="1"
                width="1"
                style="display: none"
                src="https://www.facebook.com/tr?id=612969498842082&ev=PageView&noscript=1"
            />
            `}
        </noscript>
        {/* <!-- End Facebook Pixel Code --> */}

        {/* <%-- Google AdSense Script --%> */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9061810951744175"
          crossOrigin="anonymous"
        ></script>
        {/* <%-- Google AdSense Script --%> */}

        {/* <!-- Twitter conversion tracking base code --> */}
        <script>
          {`
                !function (e, t, n, s, u, a) {
                    e.twq || (s = e.twq = function () {
                        s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
                    }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = 'https://static.ads-twitter.com/uwt.js',
                        a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
                }(window, document, 'script');
                twq('config', 'o9n8w');
            `}
        </script>
        {/* <!-- End Twitter conversion tracking base code --> */}

        <body>
          {`
          <noscript>
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5HBP5LH" height="0" width="0" style="display:none;visibility:hidden"></iframe>
          </noscript> 
          <div id="fb-root"></div>
          <script type="text/javascript">
              (function (d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) return;
                  js = d.createElement(s); js.id = id;
                  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=233373090064355";
                  fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
          </script>
          <script type="text/javascript" >
               /* <![CDATA[ */
               var google_conversion_id = 948051367;
               var google_conversion_label = "2a4cCPKjyGYQp7uIxAM";
               var google_custom_params = window.google_tag_params;
               var google_remarketing_only = true;
               /* ]]> */
          </script>
          <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"></script>
          <noscript>
             <div style="display: inline;">
             <img height="1" width="1" style="border-style: none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/948051367/?value=1.00&amp;currency_code=ZAR&amp;label=2a4cCPKjyGYQp7uIxAM&amp;guid=ON&amp;script=0" />
             </div>
          </noscript>
        `}
        </body>
      </Helmet>
    </>
  );
};

export default LaptopGoogleServices;
