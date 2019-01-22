export function afterLoad(fn: () => void) {
  window.addEventListener('DOMContentLoaded', fn);
}

export function flashCollapse(selector: string, seconds = 3) {
  afterLoad(() => {
    const panel = $(selector);
    panel.collapse('show');
    setTimeout(() => {
      panel.collapse('hide');
      panel.on('hidden.bs.collapse', () => {
        panel.remove();
      });
    }, seconds * 1000);
  });
}

export function wait(timeMs: number) {
  return new Promise(res => {
    setTimeout(res, timeMs);
  });
}
