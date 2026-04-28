import sanitizeHtml from 'sanitize-html';

export const excludeImageTag = (content: string) =>
  sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.filter(tag => tag !== 'img'),
  });

export const exclideTags = (content: string) =>
  sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.filter(tag => !tag),
  });
