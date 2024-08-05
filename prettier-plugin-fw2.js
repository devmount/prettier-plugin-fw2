import {
  parsers as prettierHtmlParsers,
  printers as prettierHtmlPrinters,
} from "prettier/plugins/html";
import { doc } from "prettier";

const { indent, concat } = doc.builders;

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

    if (node.type === 'text' && (node.value.includes('{!') || node.value.includes('!}'))) {
      console.log(node.value);
      return node.value;
    }

    // // Self-closing syntax is allowed in SVG and MathML.
    // if (!["svg", "math"].includes(node.namespace)) {
    //   node.isSelfClosing = false;
    // }

    // // Prevent forward slash in void tag borrowed end marker
    // if (path.previous?.tagDefinition?.isVoid) {
    //   path.previous.isSelfClosing = false;
    // }

    // // Element is not void - use default printer
    // if (!node.tagDefinition?.isVoid) {
    //   return prettierHtmlPrinters.html.print(path, options, print);
    // }

    // Pass element along to the default printer. Since it is no
    // longer marked as self-closing, the printer will give it a
    // closing tag. For example, `<input>` will become `<input></input>`.
    return prettierHtmlPrinters.html.print(path, options, print);

    // The last item in the contents is the new closing tag.
    // Remove it.
    // if (isGroup(printed) && Array.isArray(printed.contents)) {
    //   printed.contents.pop();

    //   // If the next element has borrowed the end marker from the new (removed) closing tag
    //   // Remove the opening tag end marker
    //   if (
    //     path.next?.isLeadingSpaceSensitive &&
    //     !path.next?.hasLeadingSpaces &&
    //     isGroup(printed.contents[0]) &&
    //     Array.isArray(printed.contents[0].contents)
    //   ) {
    //     printed.contents[0].contents.pop();
    //   }
    // }

    // Prevent unwanted linebreaks
    // node.isSelfClosing = true;
    // return printed;
  },
};

export const printers = { html: htmlPrinter };
