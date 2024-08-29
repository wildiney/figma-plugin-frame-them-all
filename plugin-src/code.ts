const windowWidth = 256
const windowHeight = 200

figma.showUI(__html__, {
  themeColors: true,
  width: windowWidth,
  height: windowHeight
})

function frameThis (group: SceneNode) {
  if (group.absoluteBoundingBox != null) {
    const x = group.absoluteBoundingBox.x
    const y = group.absoluteBoundingBox.y
    const width = group.absoluteBoundingBox.width
    const height = group.absoluteBoundingBox.height

    const frame = figma.createFrame()
    const groupName = group.name

    frame.name = groupName
    frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    frame.resize(width, height)
    frame.x = x
    frame.y = y
    frame.appendChild(group)

    group.x = 0
    group.y = 0

    figma.currentPage.selection = []
  }
}

function frameGroup (group: SceneNode) {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.notify("Please, select a group or a frame");
    return;
  }

  const parentFrame = figma.createFrame();
  parentFrame.name = "Frame Group";
  parentFrame.fills = [];
  parentFrame.x = Math.min(...selection.map(node => node.x));
  parentFrame.y = Math.min(...selection.map(node => node.y));
  parentFrame.resizeWithoutConstraints(
    Math.max(...selection.map(node => node.x + node.width)) - parentFrame.x,
    Math.max(...selection.map(node => node.y + node.height)) - parentFrame.y
  );

  selection.forEach(node => {
    node.x -= parentFrame.x;
    node.y -= parentFrame.y;
    parentFrame.appendChild(node);
  });

  figma.currentPage.selection = [parentFrame];
  figma.viewport.scrollAndZoomIntoView([parentFrame]);

}

figma.ui.onmessage = (msg) => {
  const selection = figma.currentPage.selection

  if (selection.length < 1) {
    figma.notify("Select a frame or group to frame them!")
  }
  selection.forEach(sel => {

  })

  switch (msg.type) {
    case 'frameThis':
      selection.forEach(frameThis)
      break
    case 'frameThisGroup':
      frameGroup(selection[0])
      break
    default:
      console.log("This type not exists")
  }
}