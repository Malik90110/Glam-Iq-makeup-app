
import React, { useRef, useEffect } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';

interface FacialLandmark {
  x: number;
  y: number;
  z: number;
}

interface FaceDetectionResult {
  landmarks: FacialLandmark[];
  width: number;
  height: number;
}

interface FacialLandmarkDetectorProps {
  imageData: string;
  onLandmarksDetected: (result: FaceDetectionResult | null) => void;
}

const FacialLandmarkDetector: React.FC<FacialLandmarkDetectorProps> = ({
  imageData,
  onLandmarksDetected
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceMeshRef = useRef<FaceMesh | null>(null);

  useEffect(() => {
    initializeFaceMesh();
  }, []);

  useEffect(() => {
    if (faceMeshRef.current && imageData) {
      detectLandmarks();
    }
  }, [imageData]);

  const initializeFaceMesh = () => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      }
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        const canvas = canvasRef.current;
        if (canvas) {
          onLandmarksDetected({
            landmarks,
            width: canvas.width,
            height: canvas.height
          });
        }
      } else {
        onLandmarksDetected(null);
      }
    });

    faceMeshRef.current = faceMesh;
  };

  const detectLandmarks = async () => {
    if (!faceMeshRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      await faceMeshRef.current!.send({ image: canvas });
    };
    img.src = imageData;
  };

  return <canvas ref={canvasRef} className="hidden" />;
};

export default FacialLandmarkDetector;
