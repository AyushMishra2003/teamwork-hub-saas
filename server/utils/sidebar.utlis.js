// utils/sidebar.util.js
export const buildUrls = (node, parentUrl = "") => {
  const currentUrl = `${parentUrl}/${node.slug}`;
  node.url = currentUrl;

  if (Array.isArray(node.children)) {
    node.children = node.children.map(child => buildUrls(child, currentUrl));
  }

  return node;
};
