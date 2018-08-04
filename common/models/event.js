'use strict';
const slug = require('slug');
var generate = require('nanoid/generate')

module.exports = function(Event) {
  Event.observe('before save', (ctx, next) => {
    if (ctx.instance) {
      const randomId = generate('abcdefghijklmnopqrstuvwxyz', 3);
      ctx.instance.slug = slug(`${ctx.instance.title}-${randomId}`);
    }
    next();
  });
};
