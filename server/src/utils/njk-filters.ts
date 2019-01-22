import nunjucks from 'nunjucks';

const safe = s => new nunjucks.runtime.SafeString(s);

export function setProp(obj, key, val) {
  if (!obj) obj = {};
  obj[key] = val;
  return obj;
}

export function json(data) {
  return safe(jsonForHtml(data));
}

// export default function addFilters(env) {
//   env.addFilter('setProp', (obj, key, val) => {
//     if (!obj) obj = {};
//     obj[key] = val;
//     return obj;
//   });

//   // THANKS apostrophecms.org/docs/nunjucks-filters.html
//   // github.com/apostrophecms/apostrophe@master/-/blob/lib/modules/apostrophe-templates/index.js

//   // Stringify the given data as JSON, with
//   // additional escaping for safe inclusion
//   // in a script tag.
//   env.addFilter('json', data => {
//     return safe(jsonForHtml(data));
//   });

//   // Convert newlines to <br /> tags.
//   env.addFilter('nlbr', data => {
//     if (!data) return '';
//     return safe((data.toString() as string).replace(/\\n/g, '<br/>\n'));
//   });

//   // Newlines to paragraphs, produces better spacing and semantics
//   env.addFilter('nlp', data => {
//     if (!data) return '';
//     const parts = data.toString().split(/\n/);
//     const output = (parts as string[]).map(p => `<p>${p}</p>\n`).join('');
//     return output;
//   });
// }

// Stringify the data as JSON, then escape any sequences
// that would cause a `script` tag to end prematurely if
// the JSON were embedded in it. Also make sure the JSON is
// JS-friendly by escaping unicode line and paragraph
// separators.
//
// If the argument is `undefined`, `"null"` is returned. This is
// better than the behavior of JSON.stringify (which returns
// `undefined`, not "undefined") while still being JSONic
// (`undefined` is not valid in JSON).

function jsonForHtml(data) {
  if (data === undefined) {
    return 'null';
  }
  data = JSON.stringify(data); // , null, '  ');
  data = data.replace(/<!--/g, '<\\!--');
  data = data.replace(/<\/script>/gi, '<\\/script>');
  // unicode line separator and paragraph separator break JavaScript parsing
  data = data.replace(/\u2028/g, '\\u2028');
  data = data.replace(/\u2029/g, '\\u2029');
  return data;
}
