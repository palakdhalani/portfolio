export const lerp = (a, b, n) => (1 - n) * a + n * b;

export const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

export const getPointerPos = ev => {
    let posx = 0;
    let posy = 0;

    if (!ev) ev = window.event;

    if (ev.touches && ev.touches.length > 0) {
        posx = ev.touches[0].pageX;
        posy = ev.touches[0].pageY;
    } else if (ev.pageX || ev.pageY) {
        posx = ev.pageX;
        posy = ev.pageY;
    } else if (ev.clientX || ev.clientY) {
        posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { x: posx, y: posy };
};

export const getMouseDistance = (mousePos, lastMousePos) => {
    return distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);
};
