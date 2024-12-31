const elasticlunr = require("elasticlunr");
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.multi.js')(elasticlunr);
require('./lunr.ru.js')(elasticlunr);

module.exports = function(collection) {
  var index = elasticlunr(function() {
    //this.use(elasticlunr.ru);
    this.use(elasticlunr.multiLanguage('en', 'ru'));
    this.addField("title");
    this.addField("url");
    this.addField("tags");
    this.addField("authors");
    this.addField("description");
    // Добавляем поле content для поиска в теле сообщения:
    this.addField("content");
    this.setRef("id");
  });

  collection.forEach(post => {
    index.addDoc({
      id: "/example-node-eleventy" + post.url,
      title: post.template.frontMatter.data.title,
      url: post.template.frontMatter.data.url,
      tags: post.template.frontMatter.data.tags,
      authors: post.template.frontMatter.data.authors,
      description: post.template.frontMatter.data.description,
      // Определение поля content, как тело сообшения,
      // post - это сообщение, 
      // content - это тело сообщения:
      content: post.content
    });
  });

  return index.toJSON();
};
