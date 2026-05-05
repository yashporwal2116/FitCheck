import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Wand2, RefreshCcw } from 'lucide-react';
import { Product } from '../types';

interface TryOnModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const TryOnModal: React.FC<TryOnModalProps> = ({ product, isOpen, onClose }) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!userImage) {
      alert("Please upload an image first");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: userImage,
          prompt: `A realistic photo of a person wearing ${product.name}, same face, same pose, high quality, fashion photography`
        })
      });

      const data = await response.json();

      if (!response.ok || !data.id) {
        console.error("Invalid backend response:", data);
        alert("AI failed. Check backend/API key.");
        setIsGenerating(false);
        return;
      }

      let result;
      let attempts = 0;

      while (attempts < 20) {
        const res = await fetch(`/.netlify/functions/generate?id=${encodeURIComponent(data.id)}`);
        result = await res.json();

        console.log("Status:", result.status);

        if (result.status === "succeeded") break;
        if (result.status === "failed") {
          throw new Error("AI generation failed");
        }

        await new Promise((r) => setTimeout(r, 2000));
        attempts++;
      }

      // ❗ Final safety
      if (!result || !result.output) {
        throw new Error("No output received");
      }

      setResultImage(result.output[0]);

    } catch (err) {
      console.error("AI Error:", err);
      alert("Something went wrong while generating image.");
    }

    setIsGenerating(false);
  };

  const resetState = () => {
    setUserImage(null);
    setResultImage(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl bg-[#111] border border-gray-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-xl text-white">Virtual Try-On</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col md:flex-row flex-1 p-6 gap-6">
            
            {/* Product */}
            <div className="w-full md:w-1/3">
              <img src={product.image} className="rounded-lg mb-4" />
              <h3 className="text-white">{product.name}</h3>
              <p className="text-gray-400">₹{product.price}</p>
            </div>

            {/* Try On */}
            <div className="flex-1 flex flex-col items-center justify-center">

              {!userImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-700 p-10 rounded-lg cursor-pointer text-center"
                >
                  <Upload className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400">Upload your photo</p>
                </div>
              ) : (
                <div className="flex gap-6 items-center">

                  {/* Original */}
                  <div>
                    <p className="text-white text-sm mb-2">Original</p>
                    <img src={userImage} className="w-48 rounded-lg" />
                  </div>

                  {/* Loading */}
                  <div>
                    {isGenerating ? (
                      <RefreshCcw className="animate-spin text-gray-400" />
                    ) : (
                      <Wand2 className="text-gray-500" />
                    )}
                  </div>

                  {/* Result */}
                  <div>
                    <p className="text-white text-sm mb-2">Result</p>
                    {resultImage ? (
                      <img src={resultImage} className="w-48 rounded-lg" />
                    ) : (
                      <div className="w-48 h-64 bg-black border border-gray-700 flex items-center justify-center text-gray-600">
                        Awaiting
                      </div>
                    )}
                  </div>

                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/png"
                className="hidden"
              />

              <div className="mt-6 flex gap-4">
                {userImage && (
                  <button
                    onClick={resetState}
                    className="text-gray-400 hover:text-white"
                  >
                    Reset
                  </button>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={!userImage || isGenerating}
                  className="bg-white text-black px-6 py-2 rounded-lg"
                >
                  {isGenerating ? "Generating..." : "Generate Try-On"}
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
