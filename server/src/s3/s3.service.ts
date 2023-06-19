import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}

  private AWS_S3_BUCKET = this.configService.get("s3.bucket");

  private s3client = new S3Client({ 
    credentials: {
      accessKeyId: this.configService.get('s3.acessKeyId'),
      secretAccessKey: this.configService.get('s3.secretAccessKey')
    }
  });

  async uploadFile(file: Express.Multer.File) {
    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      file.originalname,
      file.mimetype,
    );
  }

  private async s3_upload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: "public-read",
      ContentType: mimetype,
      ContentDisposition: "inline",
      CreateBucketConfiguration: {
        LocationConstraint: "ap-south-1",
      },
    };

    const command = new PutObjectCommand(params)

    try {
      return await this.s3client.send(command)
    } catch (e) {
      console.log("AWS s3 upload error", e);
    }
  }
}
