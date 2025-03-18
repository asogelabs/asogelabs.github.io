// src/app/Home/Introduction.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaDonate, FaLightbulb } from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';

import Data from "../constants.json";





export default function Introduction() {
    // Estado para controlar la carga del logo
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [logoError, setLogoError] = useState(false);

    // Asegurarse de que los textos aparezcan inmediatamente
    useEffect(() => {
        // Precarga de la imagen del logo
        const preloadImage = new Image();
        preloadImage.src = Data.favicon;
        preloadImage.onload = () => setLogoLoaded(true);
        preloadImage.onerror = () => setLogoError(true);
    }, []);

    // Características principales de Asoge Labs
    const features = [
        {
            icon: <FaUsers className="text-2xl md:text-3xl" />,
            title: "Comunidad",
            description: "Conectamos salvadoreños apasionados por la IA"
        },
        {
            icon: <FaLightbulb className="text-2xl md:text-3xl" />,
            title: "Educación",
            description: "Hacemos la IA accesible para todos"
        },
        {
            icon: <FaDonate className="text-2xl md:text-3xl" />,
            title: "Autosostenible",
            description: "Financiados por nuestros propios usuarios"
        }
    ];

    return (
        <section className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-32 px-4 md:px-8 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Encabezado con logo y título - sin animación para carga inmediata */}
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8 md:mb-12">
                    <div className="relative w-32 h-32 md:w-44 md:h-44 mb-4 md:mb-0 flex items-center justify-center">
                        {/* Círculo blanco para el logo */}
                        <div className="absolute inset-0 rounded-full bg-white"></div>

                        {!logoLoaded && !logoError ? (
                            // Loader mientras se carga el logo
                            <div className="w-full h-full flex items-center justify-center relative z-10">
                                <ImSpinner9 className="text-4xl md:text-5xl text-purple-500 animate-spin" />
                            </div>
                        ) : logoError ? (
                            // En caso de error, mostrar texto alternativo
                            <div className="w-full h-full flex items-center justify-center relative z-10">
                                <span className="text-xl text-gray-700">Asoge Labs</span>
                            </div>
                        ) : (
                            // Mostrar logo cuando está cargado - ahora con padding para que quede dentro del círculo
                            <div className="relative z-10 w-3/4 h-3/4 flex items-center justify-center">
                                <img
                                    src={Data.favicon}
                                    alt="Asoge Labs Logo"
                                    className="w-full h-full object-contain"
                                    onLoad={() => setLogoLoaded(true)}
                                    onError={() => setLogoError(true)}
                                />
                            </div>
                        )}
                    </div>

                    <div className="text-center md:text-left md:ml-8">
                        {/* Título sin animación para carga inmediata */}
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-2 whitespace-nowrap">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                Asoge Labs
                            </span>
                        </h1>
                        {/* Subtítulo sin animación para carga inmediata */}
                        <p className="text-xl md:text-2xl text-gray-300 mt-2">
                            El futuro de la IA en El Salvador
                        </p>
                    </div>
                </div>

                {/* Descripción de la comunidad - sin animación para carga inmediata */}
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-xl md:text-3xl font-semibold mb-4 md:mb-6">
                        Comunidad salvadoreña que impulsa el acceso a la IA para todos
                    </h2>
                    <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
                    Una comunidad autosostenida que se mantiene viva gracias al apoyo de los usuarios con donaciones, publicidad y otras aportaciones voluntarias, sin depender de empresas o gobiernos directamente.
                    </p>
                </div>

                {/* Características de la comunidad - sin animación para carga inmediata */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-gray-700 hover:border-purple-500 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-3 md:mb-4 mx-auto md:mx-0">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-center md:text-left">
                                {feature.title}
                            </h3>
                            <p className="text-sm md:text-base text-gray-300 text-center md:text-left">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}