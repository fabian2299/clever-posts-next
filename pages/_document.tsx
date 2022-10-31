import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initalProps = await Document.getInitialProps(ctx);

    return initalProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        </Head>

        <body>
          <Main />
          <NextScript />
          <div id="modalContainer"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
