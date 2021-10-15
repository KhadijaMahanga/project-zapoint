import { camelCase } from "lodash";

function formatName(name) {
  return camelCase(name.split("/")[1]?.trim()); // converts blocks with other naming conversion to camel case, eg media-text to mediaText
}

function formatLazyBlockIteratorContentWithImage(
  attributes,
  imgField = "image",
  itemField = "items"
) {
  const items =
    JSON.parse(decodeURIComponent(attributes[itemField])).map((item) => {
      return {
        ...item,
        [imgField]: item[imgField]?.url ?? null,
      };
    }) || null;
  return { ...attributes, [itemField]: items };
}

function format(block) {
  const { attributes, name } = block;
  switch (name) {
    case "lazyblock/hero":
      return {
        ...attributes,
        items: JSON.parse(decodeURIComponent(attributes?.items)),
      };
    case "lazyblock/kuwa-mkufunzi":
      return formatLazyBlockIteratorContentWithImage(attributes);
    default:
      return attributes;
  }
}

export default function formatBlocksForSections(blc) {
  // filter empty block {}
  const blocks = blc?.filter(
    (b) => Object.keys(b).length !== 0 && Object.hasOwnProperty.call(b, "name")
  );

  const texts = blocks?.filter(
    ({ name }) => name === "core/heading" || name === "core/paragraph"
  );
  blocks?.push({ name: "core/texts", attributes: texts });

  return blocks?.reduce((acc, cur) => {
    const attr = format(cur);
    if (attr) {
      acc[formatName(cur.name)] = format(cur);
    }
    return acc;
  }, {});
}
