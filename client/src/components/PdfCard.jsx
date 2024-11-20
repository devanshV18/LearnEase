import { IoDocumentOutline } from "react-icons/io5";

export default function PdfCard({ 
  title = "Introduction to React Hooks", 
  description = "A comprehensive guide to understanding and implementing React Hooks in your projects. This PDF covers useState, useEffect, useContext, and custom hooks.", 
  public_url = "https://example.com/react-hooks-guide.pdf" 
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center max-w-sm cursor-pointer transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03]">
      <IoDocumentOutline className="h-16 w-16 text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-center mb-2 text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">{description}</p>
      <a
        href={public_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-black hover:text-gray-600 truncate max-w-full"
      >
        View PDF
      </a>
    </div>
  )
}