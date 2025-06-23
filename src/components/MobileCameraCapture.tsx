
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MobileCameraCaptureProps {
  onPhotoCapture: (imageData: string) => void;
}

const MobileCameraCapture: React.FC<MobileCameraCaptureProps> = ({ onPhotoCapture }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please try uploading a photo instead.",
        variant: "destructive"
      });
      setIsCapturing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Flip the image horizontally for front camera
    if (facingMode === 'user') {
      context.scale(-1, 1);
      context.drawImage(video, -canvas.width, 0);
    } else {
      context.drawImage(video, 0, 0);
    }

    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    onPhotoCapture(imageData);
    stopCamera();
    
    toast({
      title: "Photo Captured!",
      description: "Starting makeup analysis..."
    });
  };

  const switchCamera = () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    
    if (stream) {
      stopCamera();
      setTimeout(() => startCamera(), 100);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      onPhotoCapture(imageData);
      toast({
        title: "Photo Uploaded!",
        description: "Starting makeup analysis..."
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Capture Your Look</h2>
          <p className="text-gray-600">Take a selfie or upload a photo for AI makeup analysis</p>
        </div>

        {isCapturing ? (
          <div className="space-y-4">
            <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={switchCamera}
                variant="outline"
                size="lg"
                className="rounded-full w-12 h-12 p-0"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={capturePhoto}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full w-16 h-16 p-0"
              >
                <Camera className="w-8 h-8" />
              </Button>
              
              <Button
                onClick={stopCamera}
                variant="outline"
                size="lg"
                className="rounded-full w-12 h-12 p-0"
              >
                ×
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Button
                onClick={startCamera}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 w-full h-14"
              >
                <Camera className="w-6 h-6 mr-3" />
                Open Camera
              </Button>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="lg"
                className="border-pink-300 text-pink-600 hover:bg-pink-50 w-full h-14"
              >
                <Upload className="w-6 h-6 mr-3" />
                Upload Photo
              </Button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </Card>
  );
};

export default MobileCameraCapture;
