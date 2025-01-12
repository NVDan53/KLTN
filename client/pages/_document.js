import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  setGoogleTags() {
    if (process.env.PRODUCTION) {
      return {
        __html: `
          window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "UA-135790870-1");
        `,
      };
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* icon */}
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/images/favicon/LOGO.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon/LOGO.png"
          />
          <link rel="manifest" href="/images/favicon/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/images/favicon/LOGO.png"
          />
          <meta name="theme-color" content="#ffffff"></meta>
          {/* end icon */}

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-135790870-1"
          ></script>
          <script dangerouslySetInnerHTML={this.setGoogleTags()} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
