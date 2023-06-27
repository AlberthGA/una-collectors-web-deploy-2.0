This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

<p>&nbsp;</p>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

<p>&nbsp;</p>

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<p>&nbsp;</p>
<p>&nbsp;</p>

# TemplateViewer Component

This component uses [HandlebarsJS](http://handlebarsjs.com/) underneath to achive the goal of passing data dynamically, hidratate a custo HTML template ad print it.

## Props

| Prop     | Type                   | Default   | Description                                                          |
| -------- | ---------------------- | --------- | -------------------------------------------------------------------- |
| document | TDocument or undefined | undefined | Contains the info for creating and populating the template as needed |

## TDocument

```ts
type TDocument<CustomType> = {
	templateHTML: string;
	documentData: CustomType;
};
```

## Usage

1. Pass the an obejct with the correct structure to the component
2. The document should contain valid html.
3. To populate the template, ensure that you are using [Handlebars Simple expressions](https://handlebarsjs.com/guide/#simple-expressions)
4. The component will do the rest for you, providing a preview for your document an a button to print it

## Example

### data.ts

```ts
export const data = {
	templateHTML: `
  <div >
   {{text}}
  </div>
  `,
	documentData: {
		text: 'Hello World',
	},
};
```

### TemplateViewer.jsx

```jsx {2}
import Handlebars from 'handlebars';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { TDocument } from './data';

type TCustomDocumentData = {
	text: string,
};

interface ITemplateViewer {
	document: TDocument<TCustomDocumentData>;
}

const TemplateViewer = ({ document }: ITemplateViewer) => {
  const { templateHTML, documentData } = document;
  let canvasRef = useRef<HTMLDivElement> (null);

  // custom if expresion so you can use it within the template
  Handlebars.registerHelper('ifEquals', function (this: any, arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  const template = Handlebars.compile(templateHTML);
  const finalHTML = template(documentData);
  return (
    document
      ? <div>
       <div>
        <ReactToPrint
          trigger={() => (
            <button>
              Print!
            </button>
            )}
            content={() => canvasRef.current}
            pageStyle={`
                        @page {
                          size: auto;
                          margin: 11mm 17mm 17mm 17mm;
                          @top-right-corner {
                            content: "Page " counter(page);
                        }`
                      }
        />
      </div>
      <div>
        <div>
          <div id={'canvas'} ref={canvasRef}> dangerouslySetInnerHTML={{ __html: finalHTML }}/>
        </div>
      </div>
    </div>
    : <div>
    No Document found.
    </div>
  );
};

export default TemplateViewer;
```
