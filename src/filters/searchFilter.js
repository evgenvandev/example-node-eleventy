const elasticlunr = require("elasticlunr");
require('/workspaces/example-node-eleventy/src/static/js/lunr.stemmer.support.js')(elasticlunr);
require('/workspaces/example-node-eleventy/src/static/js/lunr.ru.js')(elasticlunr);
require('/workspaces/example-node-eleventy/src/static/js/lunr.multi.js')(elasticlunr);

module.exports = function(collection) {
  var index = elasticlunr(function() {
    this.use(elasticlunr.ru);
    this.addField("title");
    this.addField("url");
    this.addField("tags");
    this.addField("authors");
    this.addField("description");
    this.addField("content");
    this.setRef("id");
  });

  collection.forEach(post => {
    index.addDoc({
      id: post.url,
      title: post.template.frontMatter.data.title,
      url: post.template.frontMatter.data.url,
      tags: post.template.frontMatter.data.tags,
      authors: post.template.frontMatter.data.authors,
      description: post.template.frontMatter.data.description,
      content: post.content
    });
  });

  return index.toJSON();
};
