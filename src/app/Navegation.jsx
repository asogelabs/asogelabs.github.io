// src/app/Navegation.jsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { FaHandsHelping } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { GrTools } from "react-icons/gr";
import { SiRetool } from "react-icons/si";
import { BsRobot } from "react-icons/bs";

import Data from "./constants.json";





function Navegacion() {
    // Estado para controlar si el menú móvil está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);

    // Estado para controlar los submenús desplegables
    const [activeMenu, setActiveMenu] = useState(null);

    // Referencias para detectar clics fuera de los menús
    const navRef = useRef(null);

    // Manejador para clics fuera de los menús
    useEffect(() => {
        function handleClickOutside(event) {
            // Si hay un menú activo y el clic ocurrió fuera del área del menú
            if (activeMenu && navRef.current && !navRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        }

        // Agregar el evento al documento
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Limpiar el evento al desmontar
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeMenu]);

    // Cerrar el menú al cambiar el tamaño de la ventana o al navegar
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };

        // Cerrar menús al navegar
        const handleRouteChange = () => {
            setIsOpen(false);
            setActiveMenu(null);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Función para manejar la apertura de menús
    const toggleMenu = (menuName) => {
        setActiveMenu(activeMenu === menuName ? null : menuName);
    };

    // Bloquear scroll cuando el menú móvil está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg" ref={navRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo con animación de hover */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center group">
                            <Image
                                src={Data.favicon}
                                alt="Logo"
                                width={40}
                                height={40}
                                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Navegación Desktop */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-6">
                            {/* Menú Apoyo */}
                            <div className="relative group">
                                {/* Botón con área clickeable mejorada y efectos de hover */}
                                <button
                                    className="flex items-center px-4 py-2 rounded-md hover:bg-gradient-to-r from-gray-800 to-gray-700 transition-all duration-300 hover:shadow-lg w-full h-full text-gray-200 hover:text-white"
                                    onClick={() => toggleMenu('apoyo')}
                                    aria-expanded={activeMenu === 'apoyo'}
                                    aria-haspopup="true"
                                >
                                    <FaHandsHelping className="mr-2 text-yellow-400" />
                                    <span>Apoyo</span>
                                    <IoIosArrowDown className={`ml-2 transition-transform duration-300 ${activeMenu === 'apoyo' ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Menú desplegable con animación */}
                                <div
                                    className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gradient-to-b from-gray-800 to-gray-900 z-10 transform transition-all duration-300 origin-top-left ${activeMenu === 'apoyo'
                                        ? 'opacity-100 scale-100'
                                        : 'opacity-0 scale-95 pointer-events-none'
                                        }`}
                                >
                                    <div className="py-1 rounded-md bg-opacity-90 backdrop-blur-sm">
                                        <Link
                                            href="/donate"
                                            className="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200 flex items-center rounded-md m-1"
                                            onClick={() => setActiveMenu(null)}
                                        >
                                            <MdAttachMoney className="mr-2 text-yellow-400" />
                                            <span>Realizar una donación</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Menú Utilidades */}
                            <div className="relative group">
                                {/* Botón con área clickeable mejorada y efectos de hover */}
                                <button
                                    className="flex items-center px-4 py-2 rounded-md hover:bg-gradient-to-r from-gray-800 to-gray-700 transition-all duration-300 hover:shadow-lg w-full h-full text-gray-200 hover:text-white"
                                    onClick={() => toggleMenu('utilidades')}
                                    aria-expanded={activeMenu === 'utilidades'}
                                    aria-haspopup="true"
                                >
                                    <GrTools className="mr-2 text-blue-400" />
                                    <span>Utilidades</span>
                                    <IoIosArrowDown className={`ml-2 transition-transform duration-300 ${activeMenu === 'utilidades' ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Menú desplegable con animación */}
                                <div
                                    className={`absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-gradient-to-b from-gray-800 to-gray-900 z-10 transform transition-all duration-300 origin-top-left ${activeMenu === 'utilidades'
                                        ? 'opacity-100 scale-100'
                                        : 'opacity-0 scale-95 pointer-events-none'
                                        }`}
                                >
                                    <div className="py-1 rounded-md bg-opacity-90 backdrop-blur-sm">
                                        <Link
                                            href="/unlock"
                                            className="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200 flex items-center rounded-md m-1"
                                            onClick={() => setActiveMenu(null)}
                                        >
                                            <SiRetool className="mr-2 text-blue-400" />
                                            <span>Solicitar código de desbloqueo</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Botón Modelos de IA con efectos visuales */}
                            <Link
                                href="/models"
                                className="flex items-center px-4 py-2 rounded-md hover:bg-gradient-to-r from-gray-800 to-gray-700 transition-all duration-300 hover:shadow-lg text-gray-200 hover:text-white"
                            >
                                <BsRobot className="mr-2 text-purple-400" />
                                <span>Modelos de IA</span>
                            </Link>
                        </div>
                    </div>

                    {/* Botón Menú Móvil con animación */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-800 focus:outline-none transition-colors duration-300"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Móvil con animación mejorada */}
            <div
                className={`md:hidden fixed inset-0 bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-sm z-40 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                style={{ top: '64px' }}
            >
                <div className={`bg-gray-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-10'
                    }`}>
                    <div className="px-2 pt-2 pb-3 space-y-2">
                        {/* Menú Apoyo Móvil */}
                        <div className="rounded-md overflow-hidden">
                            {/* Botón con efectos mejorados para móvil */}
                            <button
                                className="w-full flex items-center justify-between px-4 py-3 rounded-t-md text-white hover:bg-gray-700 focus:outline-none transition-colors duration-200"
                                onClick={() => toggleMenu('apoyo-mobile')}
                                aria-expanded={activeMenu === 'apoyo-mobile'}
                            >
                                <div className="flex items-center">
                                    <FaHandsHelping className="mr-3 text-yellow-400" />
                                    <span className="font-medium">Apoyo</span>
                                </div>
                                <IoIosArrowDown className={`transition-transform duration-300 ${activeMenu === 'apoyo-mobile' ? 'rotate-180' : ''}`} />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-700 ${activeMenu === 'apoyo-mobile' ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <Link
                                    href="/donate"
                                    className="block px-4 py-3 text-sm text-gray-200 hover:bg-gray-600 rounded-md mx-2 my-1 transition-colors duration-200 flex items-center"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setActiveMenu(null);
                                    }}
                                >
                                    <MdAttachMoney className="mr-2 text-yellow-400" />
                                    <span>Realizar una donación</span>
                                </Link>
                            </div>
                        </div>

                        {/* Menú Utilidades Móvil */}
                        <div className="rounded-md overflow-hidden">
                            {/* Botón con efectos mejorados para móvil */}
                            <button
                                className="w-full flex items-center justify-between px-4 py-3 rounded-t-md text-white hover:bg-gray-700 focus:outline-none transition-colors duration-200"
                                onClick={() => toggleMenu('utilidades-mobile')}
                                aria-expanded={activeMenu === 'utilidades-mobile'}
                            >
                                <div className="flex items-center">
                                    <GrTools className="mr-3 text-blue-400" />
                                    <span className="font-medium">Utilidades</span>
                                </div>
                                <IoIosArrowDown className={`transition-transform duration-300 ${activeMenu === 'utilidades-mobile' ? 'rotate-180' : ''}`} />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-700 ${activeMenu === 'utilidades-mobile' ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <Link
                                    href="/unlock"
                                    className="block px-4 py-3 text-sm text-gray-200 hover:bg-gray-600 rounded-md mx-2 my-1 transition-colors duration-200 flex items-center"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setActiveMenu(null);
                                    }}
                                >
                                    <SiRetool className="mr-2 text-blue-400" />
                                    <span>Solicitar código de desbloqueo</span>
                                </Link>
                            </div>
                        </div>

                        {/* Botón Modelos de IA Móvil */}
                        <Link
                            href="/models"
                            className="flex items-center px-4 py-3 rounded-md text-white hover:bg-gray-700 transition-colors duration-200"
                            onClick={() => {
                                setIsOpen(false);
                                setActiveMenu(null);
                            }}
                        >
                            <BsRobot className="mr-3 text-purple-400" />
                            <span className="font-medium">Modelos de IA</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navegacion;