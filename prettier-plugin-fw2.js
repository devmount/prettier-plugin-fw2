import {
  parsers as prettierHtmlParsers,
  printers as prettierHtmlPrinters,
} from "prettier/plugins/html";
import { doc } from "prettier";

const { indent, concat, hardline } = doc.builders;

export const languages = [
  {
    name: "HTML5",
    extensions: [".html"],
    parsers: ["html"],
    vscodeLanguageIds: ["html"],
  },
];

const htmlParser = {
  ...prettierHtmlParsers.html,
  astFormat: "html",
};

export const parsers = {
  html: htmlParser,
};

const htmlPrinter = {
  ...prettierHtmlPrinters.html,
  print(path, options, print) {
    const node = path.node;

    // Handle conditional markers directly following each other without space
    if (node.type === 'text' && node.value.includes('!}{!')) {
      node.value = node.value.replace('!}{!', '!} {!');
    }

    // Pass element along to the default printer
    const printed = prettierHtmlPrinters.html.print(path, options, print);

    if (node.type === 'text' && (node.value.includes('{!') || node.value.includes('!}'))) {
      console.log(printed);
      // return node.value;
    }

    // Move an opening conditional marker from the end of a line to a new line
    // Example AST: { type: 'fill', parts: [ '!}', { type: 'line' }, '{!' ] }
    if (typeof printed === 'object' && printed.parts && printed.parts.at(-2).type === 'line' && printed.parts.at(-1) === '{!') {
      printed.parts.splice(-2, 2, hardline, printed.parts[printed.parts.length-1]);
    }

    return printed;
  },
};

export const printers = { html: htmlPrinter };
