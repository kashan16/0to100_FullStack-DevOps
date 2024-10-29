//Add a backend to make this functional

import AddPostForm from "./components/AddPostForm";
import HomePage from "./pages/HomePage";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <AddPostForm/>
        <HomePage/>
      </div>
    </div>
  );
}
