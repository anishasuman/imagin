import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LayoutGrid } from "./ui/layout-grid";
import { Skeleton } from "./ui/skeleton";

const cards = [
  {
    id: 1,
    content: "Image 1",
    className: "md:col-span-2 md:row-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    content: "Image 2",
    className: "md:col-span-1 md:row-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    content: "Image 3",
    className: "md:col-span-1 md:row-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    content: "Image 4",
    className: "md:col-span-1 md:row-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    content: "Image 5",
    className: "md:col-span-2 md:row-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
  },
];

const GenerateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);

  const handleGenerate = async () => {
    if (!prompt || typeof prompt !== "string" || !(prompt.length > 2)) {
      setError("Please provide a valid prompt.");
      return;
    }

    setIsGenerating(true);

    const modifiedPrompt = `Create an Image for the this prompt: ${prompt}`;
    const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        prompt
      )}&per_page=12&client_id=${key}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch images from Unsplash");
      }

      const data = await response.json();

      for (const part of data.results) {
        const imageUrl = part?.urls?.regular || part?.urls?.small;
        if (!imageUrl) continue;

        
        const newImage = {
          id: part.id,
          content: <Content prompt={prompt} imageUrl={imageUrl} />,
          className: "md:col-span-1 md:row-span-10",
          thumbnail: imageUrl,
        };

        setImages((prevImages) => [newImage, ...prevImages]);
      }

      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="flex flex-col gap-4 w-full max-w-4xl min-h-screen">
      <h1 className="text-4xl font-bold text-muted-foreground">
        Generate Image with AI
      </h1>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Generate realistic images using AI technology.
      </p>

      <div className="flex flex-col items-center gap-4">
        <Textarea
          placeholder="Write a prompt to generate image"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <Button
          disabled={isGenerating || !prompt || !(prompt.length > 2)}
          onClick={handleGenerate}
          className="cursor-pointer"
        >
          {isGenerating ? "Generating..." : "Generate Image"}
        </Button>
      </div>

      {error && (
        <p className="text-sm font-light px-4 py-3 border border-red-600/60 bg-red-400/5 rounded-lg w-full max-w-2xl">
          {error}
        </p>
      )}

      <div className="w-full h-full p-10">
        {isGenerating ? (
          <ImageSkeleton />
        ) : (
          images.length > 0 && <LayoutGrid cards={images} />
        )}
      </div>
    </section>
  );
};

export default GenerateImage;

const ImageSkeleton = () => {
  return <Skeleton className="h-40 w-40 rounded-md" />;
};

const Content = ({ prompt, imageUrl }) => {
  const downloadImage = async (imageUrl, filename = "downloaded_image.jpg") => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <p>{prompt.trim().slice(0, 20)}</p>
      <Button onClick={() => downloadImage(imageUrl)}>Download Image</Button>
    </div>
  );
};
