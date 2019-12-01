var remark = require("remark")
var visit = require("unist-util-visit")

module.exports = ({ markdownAST }, pluginOptions) => {
    // make sure h1 and h2 are not being used for
    // accessibility reasons:
    // h1 is for the logo
    // h2 is for the article title
    visit(markdownAST, "heading", node => {
        if (node.depth < 4) {
            node.depth += 2;
        }
    })

    // add a custom class to paragraphs that contain
    // ONLY link elements with no other text
    visit(markdownAST, "paragraph", node => {
        var linkOnly = true;
        var linkCount = 0;
        node.children.forEach(element => {
            if (element.type == "text" && element.value != "\n") {
                linkOnly = false;
            }

            if (element.type == "link") {
                linkCount += 1;
            }
        });

        if (linkOnly && linkCount > 0) {
            if (!node.data) node.data = {};
            node.data.hProperties = {
                className: "linksOnly"
            }
        }
    })

    return markdownAST
}