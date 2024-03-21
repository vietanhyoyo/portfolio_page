export default function NotFound() {
 return (<main>
    <div className="dark:bg-slate-800 bg-slate-200 flex flex-col items-center justify-center h-screen">
         <div className="max-w-md">
         <h2 className="text-4xl mb-4 text-slate-700">404</h2>
            <h2 className="text-2xl font-semibold mb-4 text-slate-700">Page Not Found</h2>
            <p className="text-gray-700 mb-4">The page you're looking for doesn't exist or has been moved.</p>
            <a href="/" className="text-blue-600 hover:underline">Go back to home</a>
         </div>
      </div>
 </main>)   
}