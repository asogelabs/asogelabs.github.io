// src/app/Footer.jsx
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';





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
        <footer className="bg-gray-900 text-white py-10">
            {/* Contenido principal del footer */}
            <div className="container mx-auto px-4">
                {/* Sección superior con logo y enlaces */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    {/* Logo y eslogan */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2">Asoge Labs</h2>
                        <p className="text-gray-400 max-w-md">
                            Impulsando la innovación a través de la inteligencia artificial
                        </p>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="flex flex-col space-y-2">
                        <Link href="/team" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">
                            Team
                        </Link>
                    </div>
                </div>

                {/* Sección de frase inspiradora */}
                <div className="border-t border-gray-800 pt-8 mb-8">
                    <p className="text-center text-lg italic">
                        "La inteligencia artificial debe ser un derecho para todos, no un privilegio para pocos"
                    </p>
                </div>
            </div>

            {/* Botón para regresar arriba - con z-index elevado */}
            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-300 z-50"
                    aria-label="Regresar arriba"
                >
                    <FaArrowUp />
                </button>
            )}
        </footer>
    );
}