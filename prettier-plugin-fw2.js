import {
  parsers as prettierHtmlParsers,
  printers as prettierHtmlPrinters,
} from "prettier/plugins/html";
import { doc } from "prettier";

const { hardline } = doc.builders;

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

/**
 * Check if a conditional opening tag `{!` was printed inline
 * Returns the position of the first match or -1
 */
const inlineOpeningConditional = (printed) => {
  if (typeof printed === 'object' && printed.parts && Array.isArray(printed.parts)) {
    const matchIndex = printed.parts.findIndex((v) => v === '{!');
    if (matchIndex > -1 && printed.parts[matchIndex-1]?.type === 'line') {
      return matchIndex;
    }
  }
  return -1;
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

    // For DEBUGGING
    // if (node.type === 'text' && (node.value.includes('{!') || node.value.includes('!}'))) {
    //   console.log(printed, node.type);
    // }

    // Move an inline conditional marker to a new line
    // Example print: { type: 'fill', parts: [ '!}', { type: 'line' }, '{!' ] }
    const pos = inlineOpeningConditional(printed);
    if (pos > -1) {
      printed.parts.splice(pos-1, 2, hardline, printed.parts[pos]);
    }

    return printed;
  },
};

export const printers = { html: htmlPrinter };
