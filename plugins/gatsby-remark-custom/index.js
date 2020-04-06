const remark = require("remark");
const visit = require("unist-util-visit");
const path = require(`path`);
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');

module.exports = (test , pluginOptions) => {
  const { markdownAST, markdownNode, getNode } = test; 
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

  // replace image nodes with 'mp4' ending with video node
  visit(markdownAST, "image", async node => {
    if (node.url.endsWith("mp4")) {


      let parentDirectory = getNode(markdownNode.parent).dir;
      let videoPath = path.join(__dirname, "../../static", node.url);
      console.log("video: " + node.url);

      node.type = "html";
      let aspectRatio = 1;
      node.value = `
        <video autoplay loop muted playsinline style="flex:${aspectRatio}">
          <source src="${node.url}" type="video/mp4">
        </video>`;

      try {
        let probe = await ffprobe(videoPath, { path: ffprobeStatic.path });
        let stream = probe.streams[0];
        aspectRatio = stream.width / stream.height;
        node.value = `
          <video autoplay loop muted playsinline style="flex:${aspectRatio}">
            <source src="${node.url}" type="video/mp4">
          </video>`;

      } catch(err) {
        console.error("could not find video file: " + node.url);
      } 
    } else {
      console.log("image: " + node.url);
    }
  })

  return markdownAST
}
