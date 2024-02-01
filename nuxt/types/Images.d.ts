export interface ImageType {
  data: ImageData;
}

export interface ImageData {
  id: string;
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: string;
  mime: string;
  width: string;
  height: string;
  size: string;
  url: string;
  formats: ImageFormats;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageFormats {
  thumbnail: FormatData;
  small: FormatData;
  medium: FormatData;
  large: FormatData;
}

export interface FormatData {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string;
  width: number;
  height: number;
  size: number;
  url: string;
}
