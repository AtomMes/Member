export function getFileType(image: File) {
  if (image!.type === "image/jpeg") {
    return "jpg";
  } else if (image!.type === "image/png") {
    return "png";
  } else {
    return "other";
  }
}
