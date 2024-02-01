// Import the necessary modules
import { joinURL } from "ufo";
import type { ProviderGetImage } from "@nuxt/image-edge";
import { createOperationsGenerator } from "#image";

// Define the getImage function
export const getImage: ProviderGetImage = (
  // The source image URL
  src,
  // An object containing modifier options
  { modifiers, baseURL = `${process.env.STRAPI_SITE_URL}/uploads` } = {}
) => {
  // Create an operations generator using the modifiers
  const operationsGenerator = createOperationsGenerator({
    // Modifiers
    keyMap: {
      width: "width",
      height: "height",
      resize: "resize",
      fit: "fit",
      position: "position",
      trim: "trim",
      format: "format",
      quality: "quality",
      rotate: "rotate",
      enlarge: "enlarge",
      flip: "flip",
      flop: "flop",
      sharpen: "sharpen",
      median: "median",
      gamma: "gamma",
      negate: "negate",
      normalize: "normalize",
      threshold: "threshold",
      grayscale: "grayscale",
      animated: "animated",
    },
    // Join the operation strings together with commas
    joinWith: ",",
    // Format the operation strings with the modifier values
    formatter: (key: string, value: string) => `${key}_${value}`,
  });

  // Generate the operations list
  const operations = operationsGenerator(modifiers);

  // Join the base URL and operations to create the final image URL
  const url = joinURL(baseURL, operations, src);

  return { url };
};
