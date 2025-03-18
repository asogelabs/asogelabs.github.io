// src/app/donate/Components/DonateBoard.jsx
"use client";
import React, { useState } from 'react';
import { FaServer, FaLock, FaUsers, FaBookOpen, FaLanguage, FaHandHoldingHeart, FaRegCopy, FaCheck } from 'react-icons/fa';
import copy from 'copy-text-to-clipboard';





export default function DonateBoard() {
    // Estado para manejar la copia del enlace
    const [copied, setCopied] = useState(false);

    // Estado para la cantidad seleccionada
    const [selectedAmount, setSelectedAmount] = useState(null);

    // Opciones de donación con incrementos de $3
    const donationOptions = [
        { amount: 3, label: "Básico" },
        { amount: 6, label: "Amigo" },
        { amount: 9, label: "Colaborador" },
        { amount: 12, label: "Entusiasta" },
        { amount: 15, label: "Impulsor" },
    ];

    // Motivos de donación con su respectivo icono
    const donationReasons = [
        {
            icon: <FaServer className="text-xl md:text-2xl" />,
            title: "Costos computacionales",
            description: "Para mantener los servidores activos y que todo funcione rápido y sin interrupciones."
        },
        {
            icon: <FaLock className="text-xl md:text-2xl" />,
            title: "Fortalecer la seguridad",
            description: "Para proteger los datos de los usuarios y mantener la plataforma segura contra ataques."
        },
        {
            icon: <FaUsers className="text-xl md:text-2xl" />,
            title: "Expandir el alcance",
            description: "Para promocionar la comunidad y llegar a más personas que puedan beneficiarse de ella."
        },
        {
            icon: <FaBookOpen className="text-xl md:text-2xl" />,
            title: "Recursos educativos",
            description: "Para desarrollar guías o tutoriales que ayuden a los usuarios a sacarle provecho a la plataforma."
        },
        {
            icon: <FaLanguage className="text-xl md:text-2xl" />,
            title: "Traducir contenido",
            description: "Para hacer la plataforma más accesible a usuarios de diferentes idiomas o regiones."
        }
    ];

    // Función para copiar el enlace de donación usando copy-text-to-clipboard
    const copyDonationLink = () => {
        const donationUrl = "https://www.paypal.com/donate/?hosted_button_id=3U6XJSREBR72G";
        const success = copy(donationUrl);

        if (success) {
            // Mostrar feedback visual
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 md:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Encabezado principal con efecto de gradiente */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 relative inline-block">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 animate-pulse">
                            Apoyo a Asoge Labs
                        </span>
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 rounded-full"></div>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-4">
                        Tu contribución hace posible que sigamos innovando y haciendo la IA accesible para todos los salvadoreños
                    </p>
                </div>

                {/* Mensaje importante sobre las donaciones */}
                <div className="bg-purple-900 bg-opacity-30 backdrop-blur-sm rounded-lg p-4 border-l-4 border-purple-500 mb-12 shadow-lg shadow-purple-900/20">
                    <div className="flex items-center">
                        <FaHandHoldingHeart className="text-purple-400 text-xl mr-3 flex-shrink-0" />
                        <p className="text-gray-200">
                            <span className="font-semibold text-purple-400">Importante:</span> Aunque en PayPal aparezca el nombre del fundador, <span className="font-bold text-white">TODAS las donaciones se destinan íntegramente a Asoge Labs</span> para impulsar nuestra comunidad.
                        </p>
                    </div>
                </div>

                {/* Contenedor principal con grid responsivo */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Sección: Por qué donar (3 columnas en desktop) */}
                    <div className="lg:col-span-3 order-2 lg:order-1">
                        <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-purple-500 inline-block">
                            <span className="text-purple-400">¿</span>Por qué donar<span className="text-purple-400">?</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {donationReasons.map((reason, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20"
                                >
                                    <div className="flex items-start">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4 flex-shrink-0">
                                            {reason.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2 text-white">{reason.title}</h3>
                                            <p className="text-gray-300 text-sm leading-relaxed">{reason.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sección: Donación (2 columnas en desktop) */}
                    <div className="lg:col-span-2 order-1 lg:order-2">
                        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 shadow-xl relative overflow-hidden">
                            {/* Efecto de brillo en la esquina */}
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500 rounded-full opacity-30 blur-xl"></div>

                            <h2 className="text-2xl font-bold mb-6 text-center text-white">
                                Haz tu donación
                            </h2>

                            {/* Cantidades sugeridas */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-3 text-center text-gray-200">Elige una cantidad</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {donationOptions.map((option) => (
                                        <button
                                            key={option.amount}
                                            className={`p-3 rounded-lg transition-all duration-200 ${selectedAmount === option.amount
                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                                }`}
                                            onClick={() => setSelectedAmount(option.amount)}
                                        >
                                            <div className="font-bold text-lg">${option.amount}</div>
                                            <div className="text-xs opacity-80">{option.label}</div>
                                        </button>
                                    ))}
                                </div>
                                <div className="text-center mt-2">
                                    <button
                                        className={`text-sm underline transition-colors duration-200 ${selectedAmount === 'custom' ? 'text-purple-400' : 'text-gray-400 hover:text-gray-300'
                                            }`}
                                        onClick={() => setSelectedAmount('custom')}
                                    >
                                        Cantidad personalizada
                                    </button>
                                </div>
                            </div>

                            {/* Botón de PayPal */}
                            <div className="flex flex-col items-center mb-6">
                                <form action="https://www.paypal.com/donate" method="post" target="_top" className="mb-3">
                                    <input type="hidden" name="hosted_button_id" value="3U6XJSREBR72G" />
                                    <input
                                        type="image"
                                        src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                                        border="0"
                                        name="submit"
                                        title="PayPal - The safer, easier way to pay online!"
                                        alt="Donate with PayPal button"
                                        className="transform hover:scale-105 transition-transform duration-200"
                                    />
                                    <img alt="" border="0" src="https://www.paypal.com/en_SV/i/scr/pixel.gif" width="1" height="1" />
                                </form>
                                <span className="text-sm text-gray-400">Donaciones seguras vía PayPal</span>
                            </div>

                            {/* QR Code */}
                            <div className="mb-6">
                                <h3 className="text-center text-gray-200 font-medium mb-3">O escanea este código</h3>
                                <div className="flex justify-center">
                                    <div className="bg-white p-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                                        <img
                                            src="/Donations/paypal_qr_code.png"
                                            alt="QR Code para donación"
                                            className="w-32 h-32 object-contain"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Enlace compartible con copy-text-to-clipboard */}
                            <div>
                                <h3 className="text-center text-gray-200 font-medium mb-2">Compartir enlace</h3>
                                <div className="flex items-center bg-gray-700 rounded-lg p-2 relative">
                                    <input
                                        type="text"
                                        value="https://www.paypal.com/donate/?hosted_button_id=3U6XJSREBR72G"
                                        className="bg-transparent text-gray-300 text-sm flex-grow outline-none truncate pr-10"
                                        readOnly
                                    />
                                    <button
                                        onClick={copyDonationLink}
                                        className="absolute right-2 text-gray-400 hover:text-white transition-colors duration-200"
                                        title="Copiar enlace"
                                    >
                                        {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mensaje de agradecimiento */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 mt-12 text-center shadow-lg relative overflow-hidden">
                    {/* Efectos de brillo */}
                    <div className="absolute -left-10 top-0 w-40 h-40 bg-white rounded-full opacity-10 blur-xl"></div>
                    <div className="absolute -right-10 bottom-0 w-40 h-40 bg-white rounded-full opacity-10 blur-xl"></div>

                    <h2 className="text-2xl font-bold mb-2 relative z-10">¡Gracias por tu apoyo!</h2>
                    <p className="text-lg relative z-10 max-w-2xl mx-auto">
                        Cada contribución nos acerca más a nuestra misión de hacer la IA accesible para todos los salvadoreños.
                    </p>
                </div>
            </div>
        </section>
    );
}