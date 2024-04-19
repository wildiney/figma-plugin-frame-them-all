function FrameThis (group: SceneNode): void {
  const x = group.absoluteBoundingBox?.x ?? 0
  const y = group.absoluteBoundingBox?.y ?? 0
  const width = group.absoluteBoundingBox?.width ?? 0
  const height = group.absoluteBoundingBox?.height ?? 0

  const frame = figma.createFrame()
  const groupName = group.name

  group.x = 0
  group.y = 0

  frame.name = groupName
  frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  frame.x = x
  frame.y = y
  frame.resize(width, height)
  frame.appendChild(group)
}

function main (): void {
  const selection = figma.currentPage.selection

  if (selection.length < 1) {
    figma.notify('Select the elements to frame them!')
  }

  for (const child of selection) {
    FrameThis(child)
  }

  figma.closePlugin()
}

main()
