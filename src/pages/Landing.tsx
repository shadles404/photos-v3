import React from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, Camera, Shield, Zap } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <ImageIcon className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                PhotoVault
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 bg-opacity-20 border border-blue-400/30 text-blue-400 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              The Future of
            </span>
            <br />
            Photo Storage
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the next generation of secure photo management with advanced AI features and quantum-grade encryption
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25"
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Started Free
            </Link>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-black/40 backdrop-blur-xl p-8 rounded-xl border border-white/10">
              <Camera className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                AI-Powered Upload
              </h3>
              <p className="text-gray-300">
                Smart categorization and tagging with advanced AI recognition
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-black/40 backdrop-blur-xl p-8 rounded-xl border border-white/10">
              <Shield className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Quantum Security
              </h3>
              <p className="text-gray-300">
                Military-grade encryption with zero-knowledge privacy
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-black/40 backdrop-blur-xl p-8 rounded-xl border border-white/10">
              <ImageIcon className="h-12 w-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400">
                Neural Processing
              </h3>
              <p className="text-gray-300">
                Advanced image enhancement and restoration capabilities
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32 text-center">
          <p className="text-sm text-gray-400">
            Trusted by photographers worldwide
          </p>
          <div className="mt-4 flex justify-center gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-32 h-12 bg-white/5 rounded-lg backdrop-blur-sm"></div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}