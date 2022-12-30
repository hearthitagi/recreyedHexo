/**
 * Butterfly
 * for categories card
 */
'use strict'
hexo.extend.helper.register('categories_card', function (categories, options) {
  // console.log(this.site.categories.data)
  // console.log(hexo.theme.config.categoryBar.message)
  const emojiList = ['🍁','🍀','🍂','🌸']
  const generateList = () => {
    let categoriesList = ''
    this.site.categories.data.forEach((item,index) => {
      for (const themeCategory of hexo.theme.config.categoryBar.message) {
        if (item.name == themeCategory.title) {
          item.cover = themeCategory.cover
          item.descr = themeCategory.descr
        }
      }
      categoriesList +=
        `<div class="category-wrap" style="background: url(${item.cover}) center / cover">
          <a class="category-link" href="${item.path}" data-pjax-state="">
            <div class="category-title">| ${item.name} </div>
            <div class="category-num">${emojiList[index]} ${item.length} </div>
            <div class="category-descr">${item.descr} </div>
          </a>
        </div>`
    });
    return categoriesList
  }
  const list = generateList()
  return `${list}`
})
