export const closeMenu = () => {
  const elem = document.activeElement;
  if (elem) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    elem?.blur();
  }
};
