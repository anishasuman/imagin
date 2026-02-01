import React from 'react';
import {Textarea} from "./ui/textarea";
import {Button} from "./ui/button";
import {LayoutGrid} from './ui/layout-grid';
import {useState} from "react";

const cards = [
{
    id : 1,
    content : "image 1",
    className : "md: col-span-1 md:row-span-1",
    thumbnail : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnavhRd5M4gzrQHEU5Fzp3oBY21kLTHl2tsQ&s"
},
{
    id : 2,
    content : "image 2",
    className : "md: col-span-1 md:row-span-1",
    thumbnail : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnavhRd5M4gzrQHEU5Fzp3oBY21kLTHl2tsQ&s"
},
{
    id : 3,
    content : "image 3",
    className : "md: col-span-1 md:row-span-1",
    thumbnail : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnavhRd5M4gzrQHEU5Fzp3oBY21kLTHl2tsQ&s"
},
{
    id: 4,
    content: "Image 4",
    className: "md:col-span-1 md:row-span-2", // Tall card
    thumbnail:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80",
},
{
    id: 5,
    content: "Image 5",
    className: "md:col-span-2 md:row-span-1", // Wide card
    thumbnail:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
},
];


// const handleGenerate = () => {
//         // logic to generate image based on prompt 
// };
const GenerateImage = () => {
  const [prompt, setPrompt]=useState("");
  const[isGenerating, setIsGenerating]=useState(false);
  const[error, setError]=useState("");
  const[images, setImages]=useState([]);
  const handleGenerate=()=>{

};
return (
    <section className="flex flex-col gap-4 max-w-7xl h-full">
        <h1 className="text-4xl font-bold text-muted-foreground"> Generate Image with AI</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
            This is a AI Image generating platform...
        </p>
        <div className="felx felx-col items-center gap-4">
            <Textarea 
            placeholder="Write a prompt to generate images..."
                value ={prompt}
                onChange = {(e)=> setPrompt(e.target.value)}
            ></Textarea>
            <Button 
            disable={isGenerating} 
            onClick={handleGenerate} 
            className="cursor-pointer"
            >
            {isGenerating ? "Generating..." : "Generate Image"}
            </Button>
        </div>

        {error && (
            <p className="text-sm font-light px-4 py-3 border border-red-500 rounded w-full max-w-2xl">
            {error}
            </p>
            )}
            <div className="w-full h-full p-10">
                {images?.map((image,index)=>(
                    <img key={index} src={image.url} alt={image.title} className="size-60"/>
                    ))}
            </div>
        <LayoutGrid cards={cards} />
    </section>
  )
}

export default  GenerateImage;