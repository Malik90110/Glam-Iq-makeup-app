
import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Camera, RotateCcw, Download, Palette, Sparkles } from 'lucide-react';
import * as faceapi from 'face-api.js';
import MakeupSelector from './MakeupSelector';

interface Product {
  id: string;
  brand: string;
  name: string;
  shade: string;
  category: string;
  swatchColor?: string;
}

interface MakeupColors {
  eyeshadow: string;
  lipstick: string;
  blush: string;
}

interface VirtualTryOnProps {
  imageData: string;
  selectedProducts: Product[];
  onClose: () => void;
}

const DEFAULT_COLORS = {
  foundation: '#D4A574',
  contour: '#A0825B',
  blush: '#E8B4B8',
  eyeshadow: '#B8860B',
  lipstick: '#C19A6B',
  'lip gloss': '#E8B4B8'
};

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ imageData, selectedProducts, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [intensity, setIntensity] = useState([70]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [detectedLandmarks, setDetectedLandmarks] = useState<faceapi.FaceLandmarks68 | null>(null);
  const [faceBox, setFaceBox] = useState<faceapi.Box | null>(null);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [currentMakeupColors, setCurrentMakeupColors] = useState<MakeupColors>({
    eyeshadow: DEFAULT_COLORS.eyeshadow,
    lipstick: DEFAULT_COLORS.lipstick,
    blush: DEFAULT_COLORS.blush
  });

  console.log('VirtualTryOn: Component mounted with products:', selectedProducts);

  // Load face-api.js models
  useEffect(() => {
    loadModels();
  }, []);

  // Process image when models are loaded and canvas is ready
  useEffect(() => {
    if (isModelsLoaded && imageData && canvasRef.current) {
      processImage();
    }
  }, [isModelsLoaded, imageData]);

  // Apply makeup when colors or intensity change
  useEffect(() => {
    if (!isProcessing && detectedLandmarks && originalImage && faceBox) {
      applyMakeupToCanvas();
    }
  }, [currentMakeupColors, intensity]);

  const loadModels = async () => {
    try {
      console.log('VirtualTryOn: Loading face-api.js models...');
      
      const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights';
      
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
      ]);
      
      console.log('VirtualTryOn: Models loaded successfully');
      setIsModelsLoaded(true);
    } catch (error) {
      console.error('VirtualTryOn: Error loading models:', error);
      setHasError(true);
      setErrorMessage('Failed to load AI models. Please check your internet connection.');
      setIsProcessing(false);
    }
  };

  const processImage = async () => {
    console.log('VirtualTryOn: Starting image processing...');
    setIsProcessing(true);
    setHasError(false);
    
    try {
      // Ensure canvas is available
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('VirtualTryOn: Canvas ref is null');
        throw new Error('Canvas element not available');
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('VirtualTryOn: Canvas context is null');
        throw new Error('Canvas context not available');
      }

      // Create and load the image
      const img = new Image();
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          console.log('VirtualTryOn: Image loaded successfully');
          resolve();
        };
        img.onerror = () => {
          console.error('VirtualTryOn: Failed to load image');
          reject(new Error('Failed to load image'));
        };
        img.src = imageData;
      });

      setOriginalImage(img);

      // Set canvas dimensions and draw image
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      console.log('VirtualTryOn: Canvas initialized, detecting face...');

      // Detect face landmarks
      const detections = await faceapi
        .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (detections) {
        console.log('VirtualTryOn: Face detected successfully');
        const landmarks = detections.landmarks;
        const box = detections.detection.box;
        setDetectedLandmarks(landmarks);
        setFaceBox(box);
        
        // Apply initial makeup
        applyMakeupToCanvas(ctx, img, landmarks, box);
      } else {
        console.warn('VirtualTryOn: No face detected');
        setDetectedLandmarks(null);
        setFaceBox(null);
      }

      setIsProcessing(false);
      console.log('VirtualTryOn: Processing complete');

    } catch (error) {
      console.error('VirtualTryOn: Error processing image:', error);
      setHasError(true);
      setErrorMessage(`Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsProcessing(false);
    }
  };

  const handleMakeupChange = (colors: MakeupColors) => {
    console.log('VirtualTryOn: Makeup colors changed:', colors);
    setCurrentMakeupColors(colors);
  };

  const applyMakeupToCanvas = (ctx?: CanvasRenderingContext2D, img?: HTMLImageElement, faceLandmarks?: faceapi.FaceLandmarks68, faceBoxParam?: faceapi.Box) => {
    const canvas = canvasRef.current;
    const context = ctx || canvas?.getContext('2d');
    const image = img || originalImage;
    const landmarks = faceLandmarks || detectedLandmarks;
    const box = faceBoxParam || faceBox;

    if (!canvas || !context || !image || !landmarks || !box) {
      console.warn('VirtualTryOn: Missing requirements for makeup application');
      return;
    }

    console.log('VirtualTryOn: Applying makeup with colors:', currentMakeupColors);

    // Redraw original image first
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);
    
    // Apply makeup overlays with realistic blending
    const alpha = intensity[0] / 100;
    
    // Apply makeup from MakeupSelector with enhanced realism
    applyRealisticBlush(context, landmarks, currentMakeupColors.blush, alpha * 0.4);
    applyRealisticEyeshadow(context, landmarks, currentMakeupColors.eyeshadow, alpha * 0.5);
    applyRealisticLipstick(context, landmarks, currentMakeupColors.lipstick, alpha * 0.6);
    
    // Apply additional products if any
    selectedProducts.forEach(product => {
      const color = getProductColor(product);
      const category = product.category.toLowerCase();
      
      switch (category) {
        case 'foundation':
          applyFoundation(context, box, color, alpha * 0.2);
          break;
        case 'contour':
          applyContour(context, landmarks, color, alpha * 0.3);
          break;
      }
    });
  };

  const getProductColor = (product: Product): string => {
    if (product.swatchColor) {
      return product.swatchColor;
    }
    
    const category = product.category.toLowerCase();
    const defaultColor = DEFAULT_COLORS[category as keyof typeof DEFAULT_COLORS];
    
    console.log(`VirtualTryOn: Using default color ${defaultColor} for ${product.name} (${category})`);
    return defaultColor || '#FF69B4';
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 105, b: 180 };
  };

  const applyRealisticBlush = (ctx: CanvasRenderingContext2D, landmarks: faceapi.FaceLandmarks68, color: string, alpha: number) => {
    const jawOutline = landmarks.getJawOutline();
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    
    // Calculate cheek positions more accurately
    const leftCheekX = (jawOutline[2].x + leftEye[0].x) / 2;
    const leftCheekY = (jawOutline[2].y + leftEye[3].y) / 2 - 10;
    const rightCheekX = (jawOutline[14].x + rightEye[3].x) / 2;
    const rightCheekY = (jawOutline[14].y + rightEye[3].y) / 2 - 10;
    
    const rgb = hexToRgb(color);
    
    ctx.save();
    
    // Apply blush to both cheeks with natural blending
    [
      { x: leftCheekX, y: leftCheekY },
      { x: rightCheekX, y: rightCheekY }
    ].forEach(cheek => {
      // Create multiple layers for realistic blending
      for (let layer = 0; layer < 3; layer++) {
        const layerAlpha = alpha * (0.8 - layer * 0.2);
        const radius = 30 - layer * 5;
        
        ctx.globalAlpha = layerAlpha;
        ctx.globalCompositeOperation = layer === 0 ? 'multiply' : 'source-over';
        
        const gradient = ctx.createRadialGradient(
          cheek.x, cheek.y, 0,
          cheek.x, cheek.y, radius
        );
        
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layerAlpha})`);
        gradient.addColorStop(0.6, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layerAlpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(cheek.x, cheek.y, radius, radius * 0.8, 0, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
    
    ctx.restore();
  };

  const applyRealisticEyeshadow = (ctx: CanvasRenderingContext2D, landmarks: faceapi.FaceLandmarks68, color: string, alpha: number) => {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const leftEyebrow = landmarks.getLeftEyeBrow();
    const rightEyebrow = landmarks.getRightEyeBrow();
    
    const rgb = hexToRgb(color);
    
    ctx.save();
    
    [
      { eye: leftEye, eyebrow: leftEyebrow },
      { eye: rightEye, eyebrow: rightEyebrow }
    ].forEach(({ eye, eyebrow }) => {
      if (eye.length > 0 && eyebrow.length > 0) {
        const eyeLeftX = Math.min(...eye.map(p => p.x));
        const eyeRightX = Math.max(...eye.map(p => p.x));
        const eyeTopY = Math.min(...eye.map(p => p.y));
        const eyebrowTopY = Math.min(...eyebrow.map(p => p.y));
        
        const eyelidCenterX = (eyeLeftX + eyeRightX) / 2;
        const eyelidWidth = (eyeRightX - eyeLeftX) * 0.9;
        const eyelidHeight = Math.abs(eyeTopY - eyebrowTopY) + 15;
        
        // Apply multiple layers for depth and realism
        for (let layer = 0; layer < 4; layer++) {
          const layerAlpha = alpha * (0.9 - layer * 0.15);
          const layerY = eyeTopY - (layer * 3) - 5;
          const layerWidth = eyelidWidth * (1 - layer * 0.1);
          const layerHeight = eyelidHeight * (0.8 - layer * 0.1);
          
          ctx.globalAlpha = layerAlpha;
          ctx.globalCompositeOperation = layer < 2 ? 'multiply' : 'overlay';
          
          // Create sophisticated gradient for natural eye shadow
          const gradient = ctx.createRadialGradient(
            eyelidCenterX, layerY, 0,
            eyelidCenterX, layerY, layerWidth * 0.7
          );
          
          if (layer === 0) {
            // Base shadow layer
            gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layerAlpha})`);
            gradient.addColorStop(0.4, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layerAlpha * 0.8})`);
            gradient.addColorStop(0.8, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layerAlpha * 0.3})`);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
          } else if (layer === 1) {
            // Blending layer
            gradient.addColorStop(0, `rgba(${Math.min(rgb.r + 20, 255)}, ${Math.min(rgb.g + 15, 255)}, ${Math.min(rgb.b + 10, 255)}, ${layerAlpha * 0.6})`);
            gradient.addColorStop(0.6, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layerAlpha * 0.4})`);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
          } else {
            // Highlight layers
            const lightRgb = {
              r: Math.min(rgb.r + 40, 255),
              g: Math.min(rgb.g + 30, 255),
              b: Math.min(rgb.b + 20, 255)
            };
            gradient.addColorStop(0, `rgba(${lightRgb.r}, ${lightRgb.g}, ${lightRgb.b}, ${layerAlpha * 0.3})`);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
          }
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.ellipse(eyelidCenterX, layerY, layerWidth, layerHeight, 0, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    });
    
    ctx.restore();
  };

  const applyRealisticLipstick = (ctx: CanvasRenderingContext2D, landmarks: faceapi.FaceLandmarks68, color: string, alpha: number) => {
    const mouth = landmarks.getMouth();
    
    if (mouth.length > 0) {
      const rgb = hexToRgb(color);
      
      ctx.save();
      
      // Create lip mask path
      ctx.beginPath();
      mouth.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      
      // Clip to lip area
      ctx.clip();
      
      // Apply multiple layers for realistic lip color
      for (let layer = 0; layer < 3; layer++) {
        const layerAlpha = alpha * (0.9 - layer * 0.2);
        
        if (layer === 0) {
          // Base color layer
          ctx.globalAlpha = layerAlpha;
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layerAlpha})`;
        } else if (layer === 1) {
          // Depth layer
          ctx.globalAlpha = layerAlpha * 0.6;
          ctx.globalCompositeOperation = 'overlay';
          const darkerRgb = {
            r: Math.max(rgb.r - 30, 0),
            g: Math.max(rgb.g - 20, 0),
            b: Math.max(rgb.b - 15, 0)
          };
          ctx.fillStyle = `rgba(${darkerRgb.r}, ${darkerRgb.g}, ${darkerRgb.b}, ${layerAlpha * 0.6})`;
        } else {
          // Highlight layer
          ctx.globalAlpha = layerAlpha * 0.4;
          ctx.globalCompositeOperation = 'screen';
          const lighterRgb = {
            r: Math.min(rgb.r + 50, 255),
            g: Math.min(rgb.g + 30, 255),
            b: Math.min(rgb.b + 20, 255)
          };
          ctx.fillStyle = `rgba(${lighterRgb.r}, ${lighterRgb.g}, ${lighterRgb.b}, ${layerAlpha * 0.4})`;
        }
        
        ctx.fill();
      }
      
      ctx.restore();
      
      // Add subtle lip shine effect
      ctx.save();
      ctx.globalAlpha = alpha * 0.3;
      ctx.globalCompositeOperation = 'screen';
      
      // Create shine gradient on upper lip
      const upperLipPoints = mouth.slice(12, 16); // Upper lip curve
      if (upperLipPoints.length > 0) {
        const centerX = upperLipPoints.reduce((sum, p) => sum + p.x, 0) / upperLipPoints.length;
        const centerY = upperLipPoints.reduce((sum, p) => sum + p.y, 0) / upperLipPoints.length;
        
        const shineGradient = ctx.createRadialGradient(
          centerX, centerY - 2, 0,
          centerX, centerY - 2, 15
        );
        shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = shineGradient;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 2, 12, 4, 0, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      ctx.restore();
    }
  };

  const applyFoundation = (ctx: CanvasRenderingContext2D, faceBox: faceapi.Box, color: string, alpha: number) => {
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    
    // Create an elliptical face mask instead of rectangular
    const centerX = faceBox.x + faceBox.width / 2;
    const centerY = faceBox.y + faceBox.height / 2;
    const radiusX = faceBox.width * 0.45; // Slightly smaller than full width
    const radiusY = faceBox.height * 0.5; // Slightly smaller than full height
    
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.restore();
  };

  const applyContour = (ctx: CanvasRenderingContext2D, landmarks: faceapi.FaceLandmarks68, color: string, alpha: number) => {
    const jawline = landmarks.getJawOutline();
    
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (jawline.length > 0) {
      // Apply contour to cheekbones and jawline
      const leftCheekbone = jawline.slice(1, 4);
      const rightCheekbone = jawline.slice(13, 16);
      
      [leftCheekbone, rightCheekbone].forEach(cheekbone => {
        if (cheekbone.length >= 3) {
          ctx.beginPath();
          cheekbone.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point.x, point.y - 10);
            } else {
              ctx.lineTo(point.x, point.y - 10);
            }
          });
          ctx.stroke();
        }
      });
    }
    
    ctx.restore();
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `virtual-makeup-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const resetToOriginal = () => {
    if (!canvasRef.current || !originalImage) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(originalImage, 0, 0);
  };

  const handleRetry = () => {
    console.log('VirtualTryOn: Retrying...');
    setHasError(false);
    setErrorMessage('');
    setIsProcessing(true);
    setDetectedLandmarks(null);
    setFaceBox(null);
    setOriginalImage(null);
    
    // Small delay to ensure canvas is ready
    setTimeout(() => {
      if (isModelsLoaded && canvasRef.current) {
        processImage();
      } else if (!isModelsLoaded) {
        loadModels();
      }
    }, 100);
  };

  const handleIntensityChange = (newIntensity: number[]) => {
    console.log('VirtualTryOn: Intensity changed to:', newIntensity[0]);
    setIntensity(newIntensity);
  };

  return (
    <Card className="p-6 bg-white border-pink-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Palette className="w-5 h-5 text-pink-500" />
          AI Virtual Try-On
        </h3>
        <Button onClick={onClose} variant="outline" size="sm">
          Close
        </Button>
      </div>

      {/* Always render canvas for proper ref initialization */}
      <canvas
        ref={canvasRef}
        className={hasError || isProcessing ? "hidden" : "w-full max-w-md mx-auto rounded-lg shadow-md border"}
        style={{ maxHeight: '500px', objectFit: 'contain' }}
      />

      {hasError ? (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600 mb-4">{errorMessage}</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleRetry} variant="outline">
                Try Again
              </Button>
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : isProcessing ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin mx-auto w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full mb-4"></div>
            <p className="text-gray-600">
              {!isModelsLoaded ? 'Loading AI models...' : 'Processing image...'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-2 justify-center">
              <Button onClick={resetToOriginal} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={downloadImage} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Makeup Intensity
              </label>
              <Slider
                value={intensity}
                onValueChange={handleIntensityChange}
                max={100}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">{intensity[0]}%</div>
            </div>

            <MakeupSelector
              onMakeupChange={handleMakeupChange}
              currentColors={currentMakeupColors}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Applied Products</h4>
              
              <div className="space-y-2">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: getProductColor(product) }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                ))}
                {selectedProducts.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No products selected</p>
                )}
              </div>
            </div>
            
            {detectedLandmarks && (
              <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✓ Face detected successfully - 68 landmarks found
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default VirtualTryOn;
