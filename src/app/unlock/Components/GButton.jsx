"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { IoLockOpenOutline } from "react-icons/io5";
import { FaVoteYea } from "react-icons/fa";
import { TbClockHour3 } from "react-icons/tb";
import copy from 'copy-text-to-clipboard';
import Script from 'next/script';





function GButton() {
    // Estados para manejo general
    const [generatedCode, setGeneratedCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    // Estados para el captcha
    const [captchaCode, setCaptchaCode] = useState('');
    const [userInput, setUserInput] = useState('');
    const [captchaSolved, setCaptchaSolved] = useState(false);
    const [captchaVerificationMode, setCaptchaVerificationMode] = useState(true);
    const [captchaVerificationResult, setCaptchaVerificationResult] = useState(null);

    // Estados para manejar el límite de tiempo
    const [waitTime, setWaitTime] = useState(0);
    const [isWaiting, setIsWaiting] = useState(false);
    const [countdown, setCountdown] = useState(0);

    // Estado para controlar la visibilidad de los anuncios
    const [showVerifyAd, setShowVerifyAd] = useState(false);
    const [showGenerateAd, setShowGenerateAd] = useState(false);

    // Estado para detectar si estamos en escritorio
    const [isDesktop, setIsDesktop] = useState(false);

    // Estado para controlar si AdSense ya está cargado
    const [adsenseLoaded, setAdsenseLoaded] = useState(false);

    // Configuración de API
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

    // Configuración de AdSense
    const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    const adSlotSquare = '3697773671';
    const adSlotHorizontal = '4819283655';
    const adSlotVertical = '1656233573';

    // Generar código de captcha
    const generateCaptcha = () => {
        // Caracteres alfanuméricos en mayúsculas
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        // Generar un código de 4 caracteres
        return Array.from(
            { length: 4 },
            () => characters[Math.floor(Math.random() * characters.length)]
        ).join('');
    };

    // Detectar si estamos en escritorio al cargar
    useEffect(() => {
        // Importante: Asegurarse de que este código solo se ejecute en el cliente
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsDesktop(window.innerWidth >= 768); // 768px es el breakpoint 'md' en Tailwind
            };

            // Comprobar tamaño inicial
            handleResize();

            // Agregar listener para cambios de tamaño
            window.addEventListener('resize', handleResize);

            // Limpiar listener
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Inicializar captcha al montar componente
    useEffect(() => {
        setCaptchaCode(generateCaptcha());
    }, []);

    // Efecto para manejar el contador de espera
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0 && isWaiting) {
            setIsWaiting(false);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [countdown, isWaiting]);

    // Manejo de inicialización de AdSense
    const initializeAdsense = () => {
        try {
            if (typeof window !== 'undefined' &&
                window.adsbygoogle &&
                typeof window.adsbygoogle.push === 'function') {

                // Inicializar todos los anuncios que existan en el DOM
                document.querySelectorAll('.adsbygoogle').forEach(ad => {
                    // Verificar si el anuncio ya fue inicializado
                    if (!ad.dataset.adsbygoogleStatus) {
                        try {
                            // Inicializar solo si no está ya inicializado
                            (window.adsbygoogle = window.adsbygoogle || []).push({});
                        } catch (error) {
                            console.error('Error al inicializar anuncio:', error);
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error general al inicializar AdSense:', error);
        }
    };

    // Efecto para inicializar anuncios cuando se muestran
    useEffect(() => {
        // Solo ejecutar si AdSense está cargado
        if (adsenseLoaded) {
            // Pequeño retraso para asegurar que el DOM está actualizado
            const timer = setTimeout(() => {
                initializeAdsense();
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [adsenseLoaded, showVerifyAd, showGenerateAd, isDesktop]);

    // Efecto para manejar los anuncios después de la verificación
    useEffect(() => {
        if (showVerifyAd) {
            // Temporizador para ocultar
            const timer = setTimeout(() => {
                setShowVerifyAd(false);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [showVerifyAd]);

    // Efecto similar para anuncio después de la generación
    useEffect(() => {
        if (showGenerateAd) {
            const timer = setTimeout(() => {
                setShowGenerateAd(false);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [showGenerateAd]);

    // Inicializar AdSense cuando se cargue el script
    const handleAdsenseLoad = () => {
        setAdsenseLoaded(true);
    };

    // Verificar captcha
    const verifyCaptcha = () => {
        // Mostrar anuncio al hacer clic en verificar
        setShowVerifyAd(true);

        const match = userInput.toUpperCase() === captchaCode;

        if (match) {
            // Captcha correcto
            setCaptchaSolved(true);
            setCaptchaVerificationMode(false);
            setCaptchaVerificationResult('success');

            // Limpiar resultado después de 2 segundos
            setTimeout(() => {
                setCaptchaVerificationResult(null);
            }, 2000);
        } else {
            // Captcha incorrecto
            setCaptchaSolved(false);
            setCaptchaVerificationResult('error');

            // Regenerar captcha
            setCaptchaCode(generateCaptcha());
            setUserInput('');

            // Limpiar resultado después de 2 segundos
            setTimeout(() => {
                setCaptchaVerificationResult(null);
            }, 2000);
        }
    };

    // Generar código
    const generateCode = async () => {
        // Mostrar anuncio al hacer clic en generar código
        setShowGenerateAd(true);

        if (!captchaSolved) {
            setError('Por favor, completa la verificación');
            return;
        }

        // Verificar si estamos en periodo de espera
        if (isWaiting) {
            setError(`Debes esperar ${countdown} segundos antes de generar otro código`);
            return;
        }

        setGeneratedCode('');
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post(API_URL, {
                password: API_PASSWORD
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Si la respuesta es exitosa, establecer el código
            if (response.data && response.data.code) {
                setGeneratedCode(response.data.code);
            }
        } catch (err) {
            // Manejar el error de límite de tasa (429)
            if (err.response && err.response.status === 429) {
                const waitTimeSeconds = err.response.data.wait_time || 7; // Usar el tiempo proporcionado o 7 segundos por defecto
                setWaitTime(waitTimeSeconds);
                setCountdown(waitTimeSeconds);
                setIsWaiting(true);
                setError(`Debes esperar ${waitTimeSeconds} segundos antes de generar otro código`);
            } else {
                setError('Error al generar el código. Por favor, inténtalo de nuevo.');
            }
            console.error('Error en la generación de código:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Copiar al portapapeles usando copy-text-to-clipboard
    const copyToClipboard = () => {
        // Intentar copiar el código generado
        const copiedSuccessfully = copy(generatedCode);

        if (copiedSuccessfully) {
            // Mostrar efecto de copiado
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } else {
            // Manejar error de copiado si es necesario
            console.error('Error al copiar el código');
        }
    };

    // Componente de anuncio horizontal
    const HorizontalAd = ({ id }) => (
        <div className="w-full my-4">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', height: '90px' }}
                data-ad-client={adClientId}
                data-ad-slot={adSlotHorizontal}
                data-ad-format="horizontal"
                data-full-width-responsive="true"
                id={id}
            />
        </div>
    );

    // Componente de anuncio vertical
    const VerticalAd = ({ id }) => (
        <div className="w-full h-[600px]">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '160px', height: '600px' }}
                data-ad-client={adClientId}
                data-ad-slot={adSlotVertical}
                data-ad-format="vertical"
                id={id}
            />
        </div>
    );

    // Componente de anuncio cuadrado
    const SquareAd = ({ id }) => (
        <div className="w-full my-4">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', height: '250px' }}
                data-ad-client={adClientId}
                data-ad-slot={adSlotSquare}
                data-ad-format="rectangle"
                id={id}
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
            {/* Script de AdSense utilizando next/script */}
            <Script
                id="adsbygoogle-init"
                strategy="afterInteractive"
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`}
                crossOrigin="anonymous"
                onLoad={handleAdsenseLoad}
            />

            {/* Layout principal con espacio para anuncios laterales en escritorio */}
            <div className="w-full max-w-7xl flex flex-col md:flex-row justify-center items-start gap-4">
                {/* Anuncio vertical izquierdo (solo en desktop) */}
                {isDesktop && adsenseLoaded && (
                    <div className="w-[160px] sticky top-4">
                        <VerticalAd id="vertical-left-ad" />
                    </div>
                )}

                {/* Contenido principal */}
                <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-6 space-y-4">
                        {/* Sección de Captcha - Solo se muestra la primera vez */}
                        {captchaVerificationMode && (
                            <div className="space-y-4">
                                {/* Información del Captcha */}
                                <div className="bg-[#1a1a1a] p-4 rounded-xl text-center">
                                    <div className="text-white/80 mb-2">
                                        Código de verificación:
                                    </div>
                                    <div className="text-2xl font-bold text-blue-400 tracking-widest select-none">
                                        {captchaCode}
                                    </div>
                                </div>

                                {/* Input de Verificación */}
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                                    maxLength={4}
                                    placeholder="Ingresa el código"
                                    className="w-full bg-[#1a1a1a] text-white/80 
                                    py-3 px-4 rounded-xl text-center 
                                    uppercase tracking-widest
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />

                                {/* Indicador de Verificación */}
                                {captchaVerificationResult === 'success' && (
                                    <div className="text-center font-semibold text-green-500">
                                        Verificación exitosa
                                    </div>
                                )}
                                {captchaVerificationResult === 'error' && (
                                    <div className="text-center font-semibold text-red-500">
                                        Código incorrecto. Inténtalo de nuevo.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Anuncio después de verificar */}
                        {showVerifyAd && adsenseLoaded && (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <HorizontalAd id="verify-ad" />
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {/* Área de resultado (código generado) */}
                        {generatedCode && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                }}
                                className="relative group"
                            >
                                <pre
                                    onClick={copyToClipboard}
                                    className="relative bg-[#1a1a1a] border border-white/10 
                                    text-white/80 p-4 rounded-xl 
                                    max-h-72 overflow-auto 
                                    whitespace-pre-wrap break-words
                                    text-sm font-mono
                                    shadow-2xl cursor-pointer
                                    selection:bg-blue-500/30"
                                >
                                    {generatedCode}
                                </pre>

                                {/* Cambio para mostrar "Copiado al portapapeles" en verde cuando se copia */}
                                <div className={`text-center mt-2 mb-4 ${copied ? 'text-green-500' : 'text-white/70'}`}>
                                    {copied ? 'Copiado al portapapeles' : '...'}
                                </div>
                            </motion.div>
                        )}

                        {/* Anuncio después de generar código */}
                        {showGenerateAd && adsenseLoaded && (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <HorizontalAd id="generate-ad" />
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {/* Contador de espera - Solo se muestra cuando está esperando */}
                        {isWaiting && !captchaVerificationMode && !generatedCode && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-yellow-500/10 border border-yellow-500/20 
                                text-yellow-400 p-4 rounded-xl text-center flex flex-col items-center"
                            >
                                <TbClockHour3 className="text-3xl mb-2" />
                                <div className="font-semibold mb-1">Límite de velocidad activado</div>
                                <div>Podrás generar un nuevo código en:</div>
                                <div className="text-xl font-bold mt-2">{countdown} segundos</div>
                            </motion.div>
                        )}

                        {/* Botón de verificación captcha */}
                        {captchaVerificationMode && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={verifyCaptcha}
                                disabled={userInput.length !== 4}
                                className="w-full flex items-center justify-center space-x-2 
                                bg-blue-500/10 hover:bg-blue-500/20 
                                border border-white/10 hover:border-white/20
                                text-white/90 font-semibold py-3 px-4 
                                rounded-xl transition duration-300 ease-in-out 
                                disabled:opacity-50 disabled:cursor-not-allowed
                                focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <FaVoteYea className="mr-2 text-blue-400" />
                                Verificar
                            </motion.button>
                        )}

                        {/* Opción para recargar después de generar código */}
                        {generatedCode && !captchaVerificationMode && (
                            <div className="text-center text-white/80 mt-4">
                                ¿Necesitas otro código? {' '}
                                <span
                                    className="text-blue-400 cursor-pointer hover:underline"
                                    onClick={() => window.location.reload()}
                                >
                                    Recarga la página
                                </span>
                            </div>
                        )}

                        {/* Botón de generar código - Solo se muestra cuando no hay código generado y no estamos en verificación */}
                        {!captchaVerificationMode && !generatedCode && (
                            <motion.button
                                whileHover={{ scale: isWaiting ? 1 : 1.05 }}
                                whileTap={{ scale: isWaiting ? 1 : 0.95 }}
                                onClick={generateCode}
                                disabled={isLoading || isWaiting}
                                className={`w-full flex items-center justify-center space-x-2 
                                ${isWaiting ? 'bg-gray-500/10' : 'bg-blue-500/10 hover:bg-blue-500/20'}
                                border border-white/10 hover:border-white/20
                                text-white/90 font-semibold py-3 px-4 
                                rounded-xl transition duration-300 ease-in-out 
                                disabled:opacity-50 disabled:cursor-not-allowed
                                focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                            >
                                {isWaiting ? (
                                    <>
                                        <TbClockHour3 className="mr-2 text-yellow-400" />
                                        Espera {countdown}s
                                    </>
                                ) : (
                                    <>
                                        <IoLockOpenOutline className="mr-2 text-blue-400" />
                                        {isLoading ? 'Generando...' : 'Generar Código'}
                                    </>
                                )}
                            </motion.button>
                        )}

                        {/* Manejo de errores */}
                        <AnimatePresence>
                            {error && !isWaiting && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-center"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Anuncio cuadrado adicional en la parte inferior */}
                        {adsenseLoaded && (
                            <div className="mt-8">
                                <SquareAd id="square-ad" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Anuncio vertical derecho (solo en desktop) */}
                {isDesktop && adsenseLoaded && (
                    <div className="w-[160px] sticky top-4">
                        <VerticalAd id="vertical-right-ad" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default GButton;