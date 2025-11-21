import { UploadCloud } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
};

export default function PhotoUploadWidget({ uploadPhoto, loading }: Props) {
  const [files, setFiles] = useState<object & { preview: string }[]>([]);
  const cropperRef = useRef<ReactCropperElement>(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file as Blob),
        })
      )
    );
  }, []);

  const onCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob((blob) => {
      uploadPhoto(blob as Blob);
    });
  }, [uploadPhoto]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <p className="text-sm font-semibold text-gray-600 mb-2">Step 1 - Add photo</p>
        <div
          {...getRootProps()}
          className={`border-4 border-dashed rounded-md pt-8 text-center h-72 flex flex-col items-center justify-center ${
            isDragActive ? "border-green-400" : "border-gray-200"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="text-gray-400" size={80} />
          <p className="text-lg mt-2">Drop image here</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600 mb-2">Step 2 - Resize image</p>
        {files[0]?.preview && (
          <div className="flex justify-center">
            <Cropper
              src={files[0]?.preview}
              style={{ height: 300, width: "90%" }}
              initialAspectRatio={1}
              aspectRatio={1}
              preview=".img-preview"
              guides={false}
              viewMode={1}
              background={false}
              ref={cropperRef}
            />
          </div>
        )}
      </div>

      <div>
        {files[0]?.preview && (
          <>
            <p className="text-sm font-semibold text-gray-600 mb-2">Step 3 - Preview & upload</p>
            <div className="img-preview mx-auto mb-3" style={{ width: 300, height: 300, overflow: "hidden" }} />
            <div className="flex justify-center">
              <button
                onClick={onCrop}
                disabled={loading}
                className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
