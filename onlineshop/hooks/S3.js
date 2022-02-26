import S3 from "react-aws-s3";

const config = {
  bucketName: "onlineshop45",
  dirName: "products" /* optional */,
  region: "ap-south-1",
  accessKeyId: "AKIAQTYSYULKI7EKKNVS",
  secretAccessKey: "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",
};

const ReactS3Client = new S3(config);

function uploadToS3(file) {
  return ReactS3Client.uploadFile(file);
}

export function deleteFileInS3(fileName) {
  return ReactS3Client.deleteFile(fileName);
}

export default uploadToS3;
