"use strict";
function FrameThis(group) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const x = (_b = (_a = group.absoluteBoundingBox) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0;
    const y = (_d = (_c = group.absoluteBoundingBox) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0;
    const width = (_f = (_e = group.absoluteBoundingBox) === null || _e === void 0 ? void 0 : _e.width) !== null && _f !== void 0 ? _f : 0;
    const height = (_h = (_g = group.absoluteBoundingBox) === null || _g === void 0 ? void 0 : _g.height) !== null && _h !== void 0 ? _h : 0;
    const frame = figma.createFrame();
    const groupName = group.name;
    group.x = 0;
    group.y = 0;
    frame.name = groupName;
    frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    frame.x = x;
    frame.y = y;
    frame.resize(width, height);
    frame.appendChild(group);
}
function main() {
    const selection = figma.currentPage.selection;
    if (selection.length < 1) {
        figma.notify('Select the elements to frame them!');
    }
    for (const child of selection) {
        FrameThis(child);
    }
    figma.closePlugin();
}
main();
