//handlebars helper for method select
const register = function (Handlebars) {
  const helpers = {
    select: function (selected, options) {
      return options.fn(this)
        .replace(new RegExp('value=\"' + selected + '\"'), '$& selected="selected"')
        .replace(new RegExp('>' + selected + '</option>'), ' selected="selected"$&')
    },
    getImage: function (category, category_image) {
      return category_image[category]
    },
  }

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    return helpers
  }
}
module.exports.register = register
module.exports.helpers = register(null)