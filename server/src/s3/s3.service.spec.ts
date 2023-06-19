import { Test, TestingModule } from "@nestjs/testing";
import { S3Service } from "./s3.service";
import { ConfigService } from "@nestjs/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";



jest.mock("@aws-sdk/client-s3", () => ({
  S3Client: jest.fn().mockReturnValue({
    send: jest.fn()
  }),
  PutObjectCommand: jest.fn(),
}));

describe("S3Service", () => {
  let service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3Service],
    }).useMocker((token) => {
      if (token === ConfigService) {
        return {
          get: jest.fn().mockReturnValue("bucket name"),
        };
      }
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("uploadFile", () => {
    const file = {
      originalname: "original name",
      buffer: {} as Buffer,
    } as Express.Multer.File;

    beforeEach(async () => {
      await service.uploadFile(file);
    });

    it("creates PutObjectCommand", () => {
      const params = (PutObjectCommand as any).mock.calls[0][0];
      expect(PutObjectCommand).toHaveBeenCalled();
      expect(params.Bucket).toBe("bucket name");
      expect(params.Key).toBe(file.originalname);
      expect(params.Body).toBe(file.buffer);
    });

    it("calls send on s3 client", () => {
      const client = service['s3client']
      expect(client.send).toHaveBeenCalled();
    });
  });
});
