/*
Задание 1

Реализовать класс, описывающий окружность. В классе должны быть следующие компоненты:

- поле, хранящее радиус окружности;
- get-свойство, возвращающее радиус окружности;
- set-свойство, устанавливающее радиус окружности;
- get-свойство, возвращающее диаметр окружности;
- метод, вычисляющий площадь окружности;
- метод, вычисляющий длину окружности.

Продемонстрировать работу свойств и методов.
*/
class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        if (value > 0) {
            this._radius = value;
        }
    }

    get diameter() {
        return this._radius * 2;
    }

    getArea() {
        return Math.PI * this._radius * this._radius;
    }

    getLength() {
        return 2 * Math.PI * this._radius;
    }
}

/*
Задание 2

Реализовать класс, описывающий html элемент. Класс HtmlElement должен содержать внутри себя:

- название тега;
- самозакрывающийся тег или нет;
- текстовое содержимое;
- массив атрибутов;
- массив стилей;
- массив вложенных таких же тегов;
- метод для установки атрибута;
- метод для установки стиля;
- метод для добавления вложенного элемента в конец текущего элемента;
- метод для добавления вложенного элемента в начало текущего элемента;
- метод getHtml(), который возвращает html код в виде строки, включая html код вложенных элементов.

С помощью написанного класса реализовать следующий блок и добавить его на страницу с помощью document.write().

[Рисунок 1](https://fsx1.itstep.org/api/v1/files/4gbLcp2laFcz5tx1oMC3cbCKue0dy7vT)

Рисунок 1

Обратите внимание. Чтоб получить весь этот html в виде строки должно быть достаточно вызвать метод getHtml только у тега с идентификатором wrapper.
*/
class HtmlElement {
    constructor(tagName, isSelfClosing, textContent) {
        this.tagName = tagName;
        this.isSelfClosing = isSelfClosing;
        this.textContent = textContent || "";
        this.attributes = [];
        this.styles = [];
        this.children = [];
    }

    setAttribute(name, value) {
        this.attributes.push({ name: name, value: value });
    }

    setStyle(name, value) {
        this.styles.push({ name: name, value: value });
    }

    appendChild(element) {
        this.children.push(element);
    }

    prependChild(element) {
        this.children.unshift(element);
    }

    getHtml() {
        var attributesText = "";
        var stylesText = "";
        var childrenText = "";
        var i;

        for (i = 0; i < this.attributes.length; i++) {
            attributesText += " " + this.attributes[i].name + '=\"' + this.attributes[i].value + '\"';
        }

        for (i = 0; i < this.styles.length; i++) {
            stylesText += this.styles[i].name + ": " + this.styles[i].value + "; ";
        }

        if (stylesText !== "") {
            attributesText += ' style="' + stylesText + '"';
        }

        if (this.isSelfClosing) {
            return "<" + this.tagName + attributesText + ">";
        }

        for (i = 0; i < this.children.length; i++) {
            childrenText += this.children[i].getHtml();
        }

        return "<" + this.tagName + attributesText + ">" + this.textContent + childrenText + "</" + this.tagName + ">";
    }
}

/*
Задание 3

Реализовать класс, который описывает css класс. Класс CssClass должен содержать внутри себя:

- название css класса;
- массив стилей;
- метод для установки стиля;
- метод для удаления стиля;
- метод getCss(), который возвращает css код в виде строки.
*/
class CssClass {
    constructor(name) {
        this.name = name;
        this.styles = [];
    }

    setStyle(name, value) {
        var i;

        for (i = 0; i < this.styles.length; i++) {
            if (this.styles[i].name === name) {
                this.styles[i].value = value;
                return;
            }
        }

        this.styles.push({ name: name, value: value });
    }

    removeStyle(name) {
        var i;

        for (i = 0; i < this.styles.length; i++) {
            if (this.styles[i].name === name) {
                this.styles.splice(i, 1);
                return;
            }
        }
    }

    getCss() {
        var result = "." + this.name + " { ";
        var i;

        for (i = 0; i < this.styles.length; i++) {
            result += this.styles[i].name + ": " + this.styles[i].value + "; ";
        }

        return result + "}";
    }
}

/*
Задание 4

Реализовать класс, описывающий блок html документ. Класс HtmlBlock должен содержать внутри себя:

- коллекцию стилей, описанных с помощью класса CssClass;
- корневой элемент, описанный с помощью класса HtmlElement;
- метод getCode(), который возвращает строку с html кодом (сначала теги style с описанием всех классов, а потом все html содержимое из корневого тега и его вложенных элементов).

С помощью написанных классов реализовать следующий блок и добавить его на страницу с помощью document.write().

[Рисунок 2](https://fsx1.itstep.org/api/v1/files/wDUpAW_82qP8IiHmkmlZ3l4BA7T5EDlr)

Рисунок 2
*/
class HtmlBlock {
    constructor(rootElement) {
        this.styles = [];
        this.rootElement = rootElement;
    }

    addStyle(cssClass) {
        this.styles.push(cssClass);
    }

    getCode() {
        var styleCode = "<style>";
        var i;

        for (i = 0; i < this.styles.length; i++) {
            styleCode += this.styles[i].getCss();
        }

        return styleCode + "</style>" + this.rootElement.getHtml();
    }
}

function addLoremCards(wrapper, useCssClasses) {
    var i;
    var block;
    var title;
    var image;
    var paragraph;
    var link;

    for (i = 0; i < 2; i++) {
        block = new HtmlElement("div", false);
        title = new HtmlElement("h3", false, "What is Lorem Ipsum?");
        image = new HtmlElement("img", true);
        paragraph = new HtmlElement("p", false, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ");
        link = new HtmlElement("a", false, "More...");

        if (useCssClasses) {
            block.setAttribute("class", "block");
            image.setAttribute("class", "image");
            paragraph.setAttribute("class", "text");
        } else {
            block.setStyle("width", "300px");
            block.setStyle("margin", "10px");
            image.setStyle("width", "100%");
            paragraph.setStyle("text-align", "justify");
        }

        image.setAttribute("src", "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80");
        image.setAttribute("alt", "Lorem Ipsum");
        link.setAttribute("href", "https://www.lipsum.com/");
        link.setAttribute("target", "_blank");

        paragraph.appendChild(link);
        block.appendChild(title);
        block.appendChild(image);
        block.appendChild(paragraph);
        wrapper.appendChild(block);
    }
}

function createArticleExample() {
    var wrapper = new HtmlElement("div", false);

    wrapper.setAttribute("id", "wrapper");
    wrapper.setStyle("display", "flex");
    addLoremCards(wrapper, false);

    return wrapper;
}

function createHtmlBlock() {
    var wrapClass = new CssClass("wrap");
    var blockClass = new CssClass("block");
    var imageClass = new CssClass("image");
    var textClass = new CssClass("text");
    var wrapper = new HtmlElement("div", false);
    var htmlBlock = new HtmlBlock(wrapper);

    wrapClass.setStyle("display", "flex");
    blockClass.setStyle("width", "300px");
    blockClass.setStyle("margin", "10px");
    imageClass.setStyle("width", "100%");
    textClass.setStyle("text-align", "justify");

    wrapper.setAttribute("id", "wrapper");
    wrapper.setAttribute("class", "wrap");
    addLoremCards(wrapper, true);

    htmlBlock.addStyle(wrapClass);
    htmlBlock.addStyle(blockClass);
    htmlBlock.addStyle(imageClass);
    htmlBlock.addStyle(textClass);

    return htmlBlock;
}

var circle = new Circle(5);
var circleSection = new HtmlElement("div", false);
var circleInfo;
var articleExample = createArticleExample();
var htmlBlock = createHtmlBlock();

circle.radius = 7;
circleInfo = new HtmlElement(
    "p",
    false,
    "Radius: " + circle.radius + "; diameter: " + circle.diameter + "; area: " + circle.getArea().toFixed(2) + "; circumference: " + circle.getLength().toFixed(2) + "."
);
circleSection.appendChild(circleInfo);

document.write(circleSection.getHtml());
document.write(articleExample.getHtml());
document.write(htmlBlock.getCode());

