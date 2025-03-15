// src/app/team/Components/Team.jsx
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

import Data from "../../constants.json";





export default function Team() {
    // Estado para el miembro activo en móvil
    const [activeIndex, setActiveIndex] = useState(0);

    // Datos de los miembros del equipo
    const teamMembers = [
        {
            id: 1,
            name: '@rodolfocasan',
            role: 'Desarrollador Full Stack',
            image: `${Data.rodolfocasan}`,
            description: 'Desarrollador y mantenedor de varios bots de telegram y aplicaciones móviles, especializado en Linux y Machine Learning. Apasionado por la automatización y la inteligencia artificial con experiencia en desarrollo de software y proyectos open source.',
            social: {
                linkedin: 'https://linkedin.com/in/christcastr',
                github: 'https://github.com/rodolfocasan',
                twitter: 'https://twitter.com/rodolfocasan'
            }
        }
    ];

    // Cambia al siguiente miembro en vista móvil
    const nextMember = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    };

    // Cambia al miembro anterior en vista móvil
    const prevMember = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
    };

    // Animaciones
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 60 }
    };

    return (
        <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                {/* Efectos de luz para dar profundidad visual al fondo */}
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-700/10 blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl"></div>
                <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-indigo-500/10 blur-2xl"></div>
            </div>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 relative z-10">
                {/* Encabezado de la sección */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    {/* Título con subrayado para destacar */}
                    <h2 className="inline-block text-4xl md:text-5xl font-bold mb-6 text-white border-b-4 border-purple-500 pb-3">
                        Miembros
                    </h2>
                    {/* Descripción breve del equipo */}
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        Asoge Labs.
                    </p>
                </motion.div>

                {/* Vista para dispositivos móviles - Slider */}
                <div className="md:hidden">
                    {/* Tarjeta del miembro activo con animación */}
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700"
                    >
                        {/* Imagen con superposición de degradado */}
                        <div className="relative h-72 w-full">
                            <Image
                                src={teamMembers[activeIndex].image}
                                alt={teamMembers[activeIndex].name}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="opacity-90"
                                sizes="100vw"
                            />
                            {/* Degradado sobre la imagen para mejorar visibilidad del texto */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

                            {/* Información sobre la imagen */}
                            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                                <h3 className="text-2xl font-bold mb-1">{teamMembers[activeIndex].name}</h3>
                                <p className="text-purple-400 font-medium">{teamMembers[activeIndex].role}</p>
                            </div>
                        </div>

                        {/* Contenido del miembro */}
                        <div className="p-6">
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                {teamMembers[activeIndex].description}
                            </p>

                            {/* Redes sociales y navegación */}
                            <div className="flex justify-between items-center">
                                {/* Iconos de redes sociales - Solo mostrar los que tienen enlace */}
                                <div className="flex space-x-4">
                                    {teamMembers[activeIndex].social.linkedin && (
                                        <a href={teamMembers[activeIndex].social.linkedin} className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-blue-600 transition-colors duration-300">
                                            <FaLinkedin size={18} />
                                        </a>
                                    )}
                                    {teamMembers[activeIndex].social.github && (
                                        <a href={teamMembers[activeIndex].social.github} className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300">
                                            <FaGithub size={18} />
                                        </a>
                                    )}
                                    {teamMembers[activeIndex].social.twitter && (
                                        <a href={teamMembers[activeIndex].social.twitter} className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-300">
                                            <FaTwitter size={18} />
                                        </a>
                                    )}
                                </div>

                                {/* Botones de navegación del slider */}
                                <div className="flex space-x-2">
                                    <button
                                        onClick={prevMember}
                                        className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-300"
                                    >
                                        <FaArrowRight className="rotate-180" size={16} />
                                    </button>
                                    <button
                                        onClick={nextMember}
                                        className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition-colors duration-300"
                                    >
                                        <FaArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Indicadores de página para ver qué miembro está activo */}
                    <div className="flex justify-center space-x-2 mt-6">
                        {teamMembers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-purple-500" : "bg-gray-600"
                                    }`}
                                aria-label={`Ir al miembro ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Vista para tablets y desktop - Diseño horizontal mejorado */}
                <div className="hidden md:block">
                    {/* Contenedor para la vista de escritorio */}
                    <div className="grid grid-cols-1 gap-16">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                variants={fadeInUp}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col lg:flex-row gap-8 items-center bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/30 shadow-xl hover:shadow-purple-500/5 transition-all duration-500 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Contenedor de la imagen - Sin overlay coloreado */}
                                <div className="relative w-full lg:w-1/3 aspect-square rounded-xl overflow-hidden shadow-lg">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-700 hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    {/* Eliminado el overlay coloreado */}
                                </div>

                                {/* Contenido e información del miembro */}
                                <div className="w-full lg:w-2/3 flex flex-col justify-center">
                                    {/* Encabezado con nombre y rol */}
                                    <div className="mb-4">
                                        <h3 className="text-3xl font-bold text-white mb-2">{member.name}</h3>
                                        <div className="flex items-center">
                                            <div className="h-1 w-10 bg-purple-500 mr-3"></div>
                                            <p className="text-purple-400 font-medium text-lg">{member.role}</p>
                                        </div>
                                    </div>

                                    {/* Descripción del miembro */}
                                    <p className="text-gray-300 text-lg leading-relaxed mb-6">{member.description}</p>

                                    {/* Redes sociales - Solo mostrar las que tienen enlace */}
                                    <div className="flex space-x-4">
                                        {member.social.linkedin && (
                                            <a href={member.social.linkedin} className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center text-white hover:bg-blue-600 transform hover:scale-110 transition-all duration-300">
                                                <FaLinkedin size={20} />
                                            </a>
                                        )}
                                        {member.social.github && (
                                            <a href={member.social.github} className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center text-white hover:bg-gray-800 transform hover:scale-110 transition-all duration-300">
                                                <FaGithub size={20} />
                                            </a>
                                        )}
                                        {member.social.twitter && (
                                            <a href={member.social.twitter} className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center text-white hover:bg-blue-500 transform hover:scale-110 transition-all duration-300">
                                                <FaTwitter size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}