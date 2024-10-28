import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Sidebar } from './components/Sidebar';
import { ImageGrid } from './components/ImageGrid';
import { ImagePreview } from './components/ImagePreview';
import { PhotoUpload } from './components/PhotoUpload';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function Dashboard() {
  const [selectedPhoto, setSelectedPhoto] = React.useState<any>(null);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">My Photos</h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search photos..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <PhotoUpload />
          <div className="mt-8">
            <ImageGrid onImageClick={setSelectedPhoto} />
          </div>
        </div>
      </main>

      {selectedPhoto && (
        <ImagePreview
          url={selectedPhoto.url}
          title={selectedPhoto.title}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;