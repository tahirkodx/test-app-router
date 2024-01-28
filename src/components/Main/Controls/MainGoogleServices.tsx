import React from "react";
import { Helmet } from "react-helmet";

const MainGoogleServices = () => {
  return (
    <>
      <Helmet>
        {/* Google Tag Manager */}
        <script>
          {` (function (w, d, s, l, i) {
                w[l] = w[l] || []; w[l].push({
                    'gtm.start':
                        new Date().getTime(), event: 'gtm.js'
                }); var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-5HBP5LH');`}
        </script>
        {/* End Google Tag Manager */}

        {/* Google Universal TAG */}
        <script>
          {` (function (i, s, o, g, r, a, m) {
              i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                  (i[r].q = i[r].q || []).push(arguments)
              }, i[r].l = 1 * new Date(); a = s.createElement(o),
                  m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
          })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

          ga('create', 'UA-4183648-1', 'auto');
          ga('send', 'pageview');`}
        </script>
        {/* End Google Universal TAG */}

        {/* Global site tag (gtag.js) - Google Ads: 948051367 */}
        <script
          /* async
          src="https://www.googletagmanager.com/gtag/js?id=AW-948051367" */
        ></script>
        <script>
          {`    window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());

          gtag('config', 'AW-948051367'); `}
        </script>
        {/* End Global site tag (gtag.js) - Google Ads: 948051367 */}

        {/* Facebook Pixel Code */}
        <script>
          {`  !function (f, b, e, v, n, t, s) {
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
            fbq('track', 'PageView'); `}
        </script>
        <noscript>
          {`<img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?id=612969498842082&ev=PageView&noscript=1" />`}
        </noscript>
        {/* Facebook Pixel Code */}

        {/* Global site tag (gtag.js) - Google Analytics */}
        <script /* src="https://www.googletagmanager.com/gtag/js?id=G-2TRV0BEV6K" */></script>
        <script>
          {`    window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());

            gtag('config', 'G-2TRV0BEV6K'); `}
        </script>
        {/* End Global site tag (gtag.js) - Google Analytics */}

        {/* Global site tag (gtag.js) - Google Marketing Platform */}
        <script
        /*   async
          src="https://www.googletagmanager.com/gtag/js?id=DC-9064218" */
        ></script>
        <script>
          {`    window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());

            gtag('config', 'DC-9064218'); `}
        </script>
        {/* End Global site tag (gtag.js) - Google Marketing Platform */}

        {/* Twitter conversion tracking base code */}
        <script
          /* async
          src="https://www.googletagmanager.com/gtag/js?id=G-2TRV0BEV6K" */
        ></script>
        <script>
          {`    !function (e, t, n, s, u, a) {
                e.twq || (s = e.twq = function () {
                    s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
                }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = 'https://static.ads-twitter.com/uwt.js',
                    a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
            }(window, document, 'script');
            twq('config', 'o9n8w'); `}
        </script>
        {/* End Twitter conversion tracking base code */}

        {/* Google AdSense Script */}
        <script
          /* async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9061810951744175"
          crossOrigin="anonymous" */
        ></script>
        {/* Google AdSense Script */}
      </Helmet>
    </>
  );
};

export default MainGoogleServices;
