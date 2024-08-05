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

function isGroup(doc) {
  return typeof doc === "object" && "type" in doc && doc.type === "group";
}

const htmlPrinter = {
  ...prettierHtmlPrinters.html,
  print(path, options, print) {
    const node = path.node;

    // Pass element along to the default printer
    const printed = prettierHtmlPrinters.html.print(path, options, print);

    if (node.type === 'text' && (node.value.includes('{!') || node.value.includes('!}'))) {
      console.log(printed);
      // return node.value;
    }

    // If both conditional markers were formatted to the same line, divide them again
    if (typeof printed === 'object' && printed.parts?.includes('!}') && printed.parts?.includes('{!')) {
      printed.parts = ['!}', hardline, '{!'];
    }

    return printed;
  },
};

export const printers = { html: htmlPrinter };
