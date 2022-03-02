import jsYaml from 'https://cdn.skypack.dev/js-yaml?dts';
import doctrine from 'https://cdn.skypack.dev/doctrine?dts';

/**
 * Parse the provided API file content.
 *
 * @function
 * @param {string} fileContent - Content of the file
 * @param {string} ext - File format ('.yaml', '.yml', '.js', etc.)
 * @returns {{jsdoc: array, yaml: array}} JSDoc comments and Yaml files
 * @requires doctrine
 */
export function parseApiFileContent(fileContent: any, ext: any) {
  const jsDocRegex = /\/\*\*([\s\S]*?)\*\//gm;
  const yaml = [];
  const jsDocComments = [];

  if (ext === '.yaml' || ext === '.yml') {
    yaml.push(jsYaml.load(fileContent));
  } else {
    const regexResults = fileContent.match(jsDocRegex);
    if (regexResults) {
      for (let i = 0; i < regexResults.length; i += 1) {
        const jsDocComment = doctrine.parse(regexResults[i], { unwrap: true });
        jsDocComments.push(jsDocComment);
      }
    }
  }

  return {
    yaml,
    jsdoc: jsDocComments,
  };
}