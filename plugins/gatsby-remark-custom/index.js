var remark = require("remark")
var visit = require("unist-util-visit")

module.exports = ({ markdownAST }, pluginOptions) => {
    // add data 
    markdownAST.children.forEach(node => {
        if (!node.data) node.data = {};
    });

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

        //check if only contains links
        node.children.forEach(element => {
            if (element.type == "text" && element.value != "\n") {
                linkOnly = false;
            }

            if (element.type == "link") {
                linkCount += 1;
            }
        });

        if (linkOnly && linkCount > 0) {
            node.data.hProperties = {
                ...node.data.hProperties,
                className: "linksOnly",
            }
        }

        if (node.children[0].type == "image") {
            node.data.hProperties = {
                ...node.data.hProperties,
                className: "imageWrapper",
            }
        }
    })

    return markdownAST
}
