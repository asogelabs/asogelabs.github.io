// src/app/Footer.jsx
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowUp, FaGithub } from 'react-icons/fa';





export default function Footer() {
    // Estado para controlar la visibilidad del botón "Regresar arriba"
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Función para manejar el scroll hacia arriba
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Efecto para mostrar/ocultar el botón basado en la posición del scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        // Agregar event listener para el scroll
        window.addEventListener('scroll', handleScroll);

        // Limpiar event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 relative">
            {/* Línea decorativa superior con gradiente */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>

            {/* Contenido principal del footer */}
            <div className="container mx-auto px-4">
                {/* Sección superior con logo y enlaces */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    {/* Logo y eslogan */}
                    <div className="mb-8 md:mb-0">
                        <h2 className="text-3xl font-bold mb-3">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                Asoge Labs
                            </span>
                        </h2>
                        <p className="text-gray-300 max-w-md">
                            Impulsando la innovación a través de la inteligencia artificial
                        </p>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/team"
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-md transition duration-300 text-center"
                        >
                            Team
                        </Link>
                        <a
                            href="https://github.com/asogelabs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2 rounded-md transition duration-300 flex items-center justify-center gap-2"
                        >
                            <FaGithub className="text-lg" /> GitHub
                        </a>
                    </div>
                </div>

                {/* Sección de frase inspiradora */}
                <div className="border-t border-gray-700 pt-8 mb-8">
                    <p className="text-center text-lg italic bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        "La inteligencia artificial debe ser un derecho para todos, no un privilegio para pocos"
                    </p>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Asoge Labs. Todos los derechos reservados.</p>
                </div>
            </div>

            {/* Botón para regresar arriba - con animación mejorada */}
            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-purple-500/30 transition duration-300 z-50 animate-bounce"
                    aria-label="Regresar arriba"
                >
                    <FaArrowUp />
                </button>
            )}
        </footer>
    );
}