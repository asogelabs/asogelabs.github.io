// src/app/Utils/AdblockDetector.jsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';





function AdblockDetector() {
    // Estado para rastrear si se detectó un bloqueador de anuncios
    const [adblockDetected, setAdblockDetected] = useState(false);
    // Estado para controlar si estamos en proceso de verificación
    const [isVerifying, setIsVerifying] = useState(true);
    // Referencia al contenedor modal para ajustes de tamaño
    const modalRef = useRef(null);
    // Estado para controlar si el contenido es scrollable
    const [isScrollable, setIsScrollable] = useState(false);
    // Referencia para controlar el intervalo de comprobación anti-bypass
    const antiBypassIntervalRef = useRef(null);

    useEffect(() => {
        // Conjunto mejorado de técnicas para detectar bloqueadores de anuncios con menos falsos positivos
        const detectAdblock = async () => {
            try {
                // Contador para técnicas positivas de detección
                let detectionCount = 0;
                const detectionThreshold = 2; // Necesitamos al menos 2 detecciones positivas para confirmar

                // Método 1: Inyectar un elemento con clase "ads" y verificar si es removido o alterado
                const testAd = document.createElement('div');
                testAd.innerHTML = '&nbsp;';
                testAd.className = 'adsbox ad-placement adsbygoogle';
                testAd.style.cssText = 'position: absolute; top: -999px; left: -999px; width: 1px; height: 1px;';
                document.body.appendChild(testAd);

                // Esperar un poco para que los adblockers tengan tiempo de actuar
                await new Promise(resolve => setTimeout(resolve, 100));

                // Verificar si el elemento fue alterado o eliminado
                if (testAd.offsetParent === null ||
                    testAd.offsetHeight === 0 ||
                    getComputedStyle(testAd).display === 'none') {
                    detectionCount++;
                    //console.log('Método 1 detectó adblock');
                }

                // Limpiar el elemento de prueba
                if (testAd.parentNode) {
                    testAd.parentNode.removeChild(testAd);
                }

                // Método 2: Crear un elemento falso de anuncio con URL
                const baitElement = document.createElement('div');
                baitElement.id = 'ad-container-test';
                baitElement.innerHTML = `
                    <img src="/ad_banner.gif" style="display:none;" 
                    onerror="this.setAttribute('data-adblock-load-failed', 'true');" />
                `;
                baitElement.style.cssText = 'position: absolute; top: -999px; left: -999px;';
                document.body.appendChild(baitElement);

                // Esperar para ver si los bloqueadores actúan sobre este elemento
                await new Promise(resolve => setTimeout(resolve, 100));

                const baitImg = baitElement.querySelector('img');
                if (!baitImg ||
                    baitImg.offsetParent === null ||
                    baitImg.getAttribute('data-adblock-load-failed') === 'true') {
                    detectionCount++;
                    //console.log('Método 2 detectó adblock');
                }

                // Limpiar el elemento
                if (baitElement.parentNode) {
                    baitElement.parentNode.removeChild(baitElement);
                }

                // Método 3: Intentar cargar un script "bait" común
                const scriptTest = new Promise(resolve => {
                    const script = document.createElement('script');
                    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
                    script.async = true;

                    // Si el script falla al cargar (bloqueado)
                    script.onerror = () => {
                        detectionCount++;
                        //console.log('Método 3 detectó adblock');
                        resolve();
                    };

                    // Si el script carga correctamente
                    script.onload = () => {
                        resolve();
                    };

                    // Establecer un tiempo límite para la prueba
                    setTimeout(() => {
                        resolve();
                    }, 500);

                    document.body.appendChild(script);

                    // Limpiar después
                    setTimeout(() => {
                        if (script.parentNode) {
                            script.parentNode.removeChild(script);
                        }
                    }, 600);
                });

                await scriptTest;

                // Método 4: Verificar si el navegador tiene un bloqueador instalado a través de propiedades específicas
                // Este método es más específico para ciertos bloqueadores
                /* if (typeof window.canRunAds === 'undefined' ||
                    typeof window.canShowAds === 'undefined' ||
                    window.document.documentElement.classList.contains('adblock')) {
                    detectionCount++;
                    console.log('Método 4 detectó adblock');
                } */

                // Método 5: Verificar bloqueadores usando propiedades del navegador más avanzadas
                // Específico para uBlock Origin y AdBlock Plus
                /* const uBlockDetected = window.document.getElementById('ublock0') ||
                    window.document.getElementById('uBlock0') ||
                    window.document.querySelector('[id*="uBlock"]');

                const adblockPlusDetected = window.document.getElementById('abp-anchor') ||
                    window.document.getElementById('abp-notification') ||
                    window.document.querySelector('[id*="AdblockPlus"]');

                if (uBlockDetected || adblockPlusDetected) {
                    detectionCount++;
                    console.log('Método 5 detectó adblock');
                } */

                setAdblockDetected(detectionCount >= detectionThreshold);
                setIsVerifying(false);

            } catch (error) {
                console.error("Error en detección de adblock:", error);
                // En caso de error, asumimos que no hay adblock para evitar falsos positivos
                setAdblockDetected(false);
                setIsVerifying(false);
            }
        };

        // Retraso inicial para permitir que la página se cargue completamente
        const initialTimer = setTimeout(() => {
            detectAdblock();
        }, 1000);

        // Verificar periódicamente si el adblock está activo (cada 5 minutos)
        const intervalCheck = setInterval(detectAdblock, 300000); // 5 minutos

        // Limpiar efecto cuando el componente se desmonta
        return () => {
            clearTimeout(initialTimer);
            clearInterval(intervalCheck);
            if (antiBypassIntervalRef.current) {
                clearInterval(antiBypassIntervalRef.current);
            }
        };
    }, []);

    // Efecto para implementar el sistema anti-bypass y garantizar que el modal siempre esté presente
    useEffect(() => {
        if (adblockDetected) {
            // Función para verificar y restaurar el modal si fue eliminado
            const checkAndRestoreModal = () => {
                // Verificar si el modal existe
                if (!document.getElementById('adblock-modal-container')) {
                    // Forzar actualización del estado para recrear el componente
                    setAdblockDetected(false);
                    setTimeout(() => setAdblockDetected(true), 10);

                    // Asegurar que el scroll siga bloqueado
                    document.body.style.overflow = 'hidden';
                }
            };

            // Crear intervalo para verificar continuamente (cada 2 segundos)
            antiBypassIntervalRef.current = setInterval(checkAndRestoreModal, 2000);

            // Limpiar intervalo cuando el componente se desmonte
            return () => {
                if (antiBypassIntervalRef.current) {
                    clearInterval(antiBypassIntervalRef.current);
                }
            };
        }
    }, [adblockDetected]);

    // Efecto para deshabilitar el scroll y clicks cuando se detecta adblock
    useEffect(() => {
        if (adblockDetected) {
            // Deshabilitar scroll
            document.body.style.overflow = 'hidden';

            // Crear una capa invisible para prevenir clics en elementos subyacentes
            const preventClickLayer = document.createElement('div');
            preventClickLayer.id = 'prevent-click-layer';
            preventClickLayer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998;';
            document.body.appendChild(preventClickLayer);

            return () => {
                document.body.style.overflow = 'auto';
                const layer = document.getElementById('prevent-click-layer');
                if (layer) layer.remove();
            };
        }
    }, [adblockDetected]);

    // Efecto para comprobar si el modal necesita scroll y ajustar su tamaño
    useEffect(() => {
        if (adblockDetected && modalRef.current) {
            const checkModalSize = () => {
                const modalElement = modalRef.current;
                if (modalElement) {
                    // Obtener la altura de la ventana
                    const windowHeight = window.innerHeight;
                    // Obtener la altura del contenido del modal
                    const modalContentHeight = modalElement.scrollHeight;

                    // Si el contenido es más alto que la ventana, activar scrolling
                    if (modalContentHeight > windowHeight - 40) { // 40px de margen
                        setIsScrollable(true);
                    } else {
                        setIsScrollable(false);
                    }
                }
            };

            // Comprobar tamaño inicial
            checkModalSize();

            // Comprobar tamaño cuando cambie el tamaño de la ventana
            window.addEventListener('resize', checkModalSize);

            // Limpiar eventListener
            return () => {
                window.removeEventListener('resize', checkModalSize);
            };
        }
    }, [adblockDetected]);

    // Si todavía estamos verificando o no hay adblock, no mostramos nada
    if (isVerifying || !adblockDetected) {
        return null;
    }

    return (
        // El modal debe tener un ID para poder ser detectado si es eliminado
        <div id="adblock-modal-container" className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
            {/* Fondo con blur y oscurecimiento */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* Modal con animación usando framer-motion */}
            <AnimatePresence>
                <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`relative w-full mx-auto rounded-xl overflow-hidden shadow-2xl max-w-md sm:max-w-lg md:max-w-2xl
                              ${isScrollable ? 'max-h-full overflow-y-auto' : ''}`}
                    style={{
                        maxHeight: isScrollable ? 'calc(100vh - 24px)' : 'auto',
                        transform: 'translateZ(0)', // Forzar composición de capa para mejorar rendimiento de scroll
                    }}
                >
                    {/* Fondo con degradado */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 opacity-90"></div>

                    {/* Contenido del modal */}
                    <div className="relative p-4 sm:p-6 text-white">
                        {/* Encabezado */}
                        <div className="flex items-center justify-center mb-4 sm:mb-6">
                            <FaExclamationTriangle className="text-2xl sm:text-4xl text-yellow-300 mr-3 sm:mr-4" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Bloqueador de anuncios detectado</h2>
                        </div>

                        {/* Mensaje principal */}
                        <div className="mb-4 sm:mb-6 text-center sm:text-left">
                            <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                                Hemos detectado que estás utilizando un bloqueador de anuncios en tu navegador.
                            </p>
                            <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                                Este proyecto se sostiene gracias a los anuncios que ven los usuarios con cada interacción.
                                Te aseguramos que nuestros anuncios no son abusivos ni excesivos, solo lo necesario para
                                generar ingresos justos que nos permiten:
                            </p>

                            {/* Lista de razones */}
                            <ul className="mb-3 sm:mb-4 text-left space-y-1 sm:space-y-2 bg-white/10 p-3 sm:p-4 rounded-lg text-xs sm:text-sm">
                                <li className="flex items-start">
                                    <FaCheckCircle className="text-green-300 mt-1 mr-2 flex-shrink-0" />
                                    <span>Pagar la computación en la nube para nuestros modelos de inteligencia artificial</span>
                                </li>
                                <li className="flex items-start">
                                    <FaCheckCircle className="text-green-300 mt-1 mr-2 flex-shrink-0" />
                                    <span>Mantener el hosting y la infraestructura del sitio</span>
                                </li>
                                <li className="flex items-start">
                                    <FaCheckCircle className="text-green-300 mt-1 mr-2 flex-shrink-0" />
                                    <span>Continuar desarrollando nuevas funcionalidades</span>
                                </li>
                                <li className="flex items-start">
                                    <FaCheckCircle className="text-green-300 mt-1 mr-2 flex-shrink-0" />
                                    <span>Ofrecer contenido y servicios de calidad de forma sostenible</span>
                                </li>
                            </ul>

                            <p className="font-bold text-yellow-200 mb-3 sm:mb-4 text-sm sm:text-base">
                                Para continuar navegando sin problemas, por favor desactiva tu bloqueador de anuncios.
                            </p>
                        </div>

                        {/* Instrucciones adicionales */}
                        <div className="text-center text-xs sm:text-sm opacity-80">
                            <p>Si utilizas un DNS que bloquea anuncios (como Pi-hole o AdGuard DNS), por favor configúralo para permitir anuncios en nuestro dominio.</p>
                            <p className="mt-2">
                                Una vez que hayas desactivado tu bloqueador, <button
                                    onClick={() => window.location.reload()}
                                    className="underline font-semibold hover:text-yellow-200"
                                >
                                    actualiza la página
                                </button>.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}





// Código anti-bypass a nivel global
// Este script se ejecuta una vez cuando el componente se carga
if (typeof window !== 'undefined' && !window._adblockBypassProtectionScript) {
    window._adblockBypassProtectionScript = true;

    // Lista de GIFs para mostrar aleatoriamente
    const adblockGifs = [
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzFuMWNsM3FqemFyc241MmZ2bnk2c21uczVsazZwNW92Z3NqMjZvbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QZyBvNVaMbIZ9yadec/giphy.gif",
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjlkeGlhNnNtc3Z1N2doOHlpbTdnbXgwZm9lem9qdmhzdTM3NGh0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lSZCmfg8STSBa/200.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnk1eWo2cGpvODNjZmR4bWZranR6ZmYyOWJmemk5MWluNTI4ZnBzYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o85xscgnCWS8Xxqik/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXNzbzJuZmhuemNhYXN4dTlxcnB6MDN1czR3eW55b3U5d2I4bmRzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VtUrqIbEU2tuo/giphy.gif",
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWYzaTZpd3o3Z2Vzb21mMnFmbWIxeXN0enY3ZTBwYm83YTZlbG1rMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRuo6sLetdllPAQ/giphy.gif",
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExam9raXc3MTV0dXgzc25jZG5kbDRoaXJud29lMzhhNnJpMTdsbzBuNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IcoMfdWwY26mBcX008/200.gif",
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXhmZ3dmbzhmMjdwM3h5NHVneHYwdzhua3NpMzF3cW1pbzJqamppbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MEF1VadKbQBdmd8LCn/giphy.gif",
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWt6NDUwb2pwdGU4dmtoY3h1M2FmcWo0dG5qMG5neWk0bjY5ZjQ2NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QUmpqPoJ886Iw/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3dpNzhydXJ1NzMycHJhM3l6a3JvN2pwNXZicDFrd3ZmODd0ZGdidiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3V0Brmdx3M7xqFiw/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2Eyc2x5MXV6ZGRhaDVkOTJlN3hleW5vcWcwMXUyOWcwaXg5bWZzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2NsJfJxVuOv3by/giphy.gif",
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm43bHhhaHh0MHNrMTdtcXE1NTJ6OW1xOXp1MWJhdDJlYWZyM3Q0MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10THtJ9zWzPDQQ/giphy.gif",
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWwwZ2dxZ2g5YjU5NG1xbXoyaGtnbzU1YjZ0eWRiNHJqa25xZXNwcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPGcKnowgAiNDKA0g/giphy.gif",
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnRqM3ppZDRjOThoYnhpbnN3bm10bWFqdmxwbGRrdDQwbnB2bXc3bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/If0RcGvpfwf7UilprG/giphy.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXB3c3R3MTRmejIxajM2bjVlbWlhMmZpN3RnZ3dmMWlucHNxdnVlbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bQCWmEgKHasZG/200.gif",
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFzOWY3MzNyM3FnYnJuMjBoZGxpaThjY2o3czZiMTV3MGMxcmN0cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kpzfYwBT7nUVW/giphy.gif",
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjVrdHdremZvY3FreWY1enM5aXJ5NjkycGdhbjh4dnF6a3VtMjBycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14c0YMK7oEVs0o/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHBremV1bHltMnIyaTJodTVsc3h4OWZmampyNjRyczBrYWIyM3g4cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1iSYP5ugSYkTzzrH3r/giphy.gif",
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3dlbHd5eDdtcTZudml5bHExaWtzeW9sOXhxeDFkYmxjZm1vdXZiaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YSdrNUJQraXvpV4u97/giphy.gif"
    ];

    // Función para crear un modal temporal más estético
    const createTempAdblockModal = () => {
        // Seleccionar un GIF aleatorio
        const randomGif = adblockGifs[Math.floor(Math.random() * adblockGifs.length)];

        // Crear el contenedor del modal
        const tempModal = document.createElement('div');
        tempModal.id = 'adblock-modal-container';
        tempModal.style.cssText = 'position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.6); backdrop-filter: blur(4px);';

        // Crear el contenido del modal con estilos mejorados
        const tempContent = document.createElement('div');
        tempContent.style.cssText = 'background: linear-gradient(to bottom right, #9333ea, #3b82f6, #2dd4bf); border-radius: 12px; padding: 24px; color: white; text-align: center; max-width: 90%; width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); display: flex; flex-direction: column; align-items: center;';

        // Crear el contenedor para el GIF
        const gifContainer = document.createElement('div');
        gifContainer.style.cssText = 'width: 200px; height: 150px; display: flex; justify-content: center; align-items: center; margin-bottom: 16px; border-radius: 8px; overflow: hidden; background-color: rgba(255,255,255,0.1);';

        // Crear un contenedor para los puntos de carga
        const loadingContainer = document.createElement('div');
        loadingContainer.style.cssText = 'font-size: 24px; font-weight: bold;';
        loadingContainer.id = 'loading-dots';
        loadingContainer.innerText = '...';

        // Añadir el contenedor de carga al contenedor del GIF
        gifContainer.appendChild(loadingContainer);

        // Crear la imagen del GIF
        const gifImage = document.createElement('img');
        gifImage.src = randomGif;
        gifImage.alt = 'Adblock Detected';
        gifImage.style.cssText = 'max-width: 100%; max-height: 100%; display: none;';

        // Agregar evento para cuando la imagen termine de cargar
        gifImage.onload = () => {
            // Ocultar puntos de carga y mostrar GIF
            loadingContainer.style.display = 'none';
            gifImage.style.display = 'block';
        };

        // Añadir la imagen al contenedor
        gifContainer.appendChild(gifImage);

        // Crear título
        const title = document.createElement('h3');
        title.innerText = '¡Bloqueador de anuncios detectado!';
        title.style.cssText = 'font-size: 18px; font-weight: bold; margin-bottom: 12px; color: white;';

        // Crear mensaje
        const message = document.createElement('p');
        message.innerText = 'Por favor, desactiva tu bloqueador de anuncios para continuar navegando en nuestro sitio.';
        message.style.cssText = 'margin-bottom: 16px; font-size: 14px;';

        // Crear botón de recarga
        const reloadButton = document.createElement('button');
        reloadButton.innerText = 'Recargar página';
        reloadButton.style.cssText = 'background-color: rgba(255,255,255,0.2); border: none; border-radius: 4px; padding: 8px 16px; color: white; font-weight: bold; cursor: pointer; transition: background-color 0.3s;';
        reloadButton.onclick = () => window.location.reload();

        // Efecto hover para el botón
        reloadButton.onmouseover = () => {
            reloadButton.style.backgroundColor = 'rgba(255,255,255,0.3)';
        };
        reloadButton.onmouseout = () => {
            reloadButton.style.backgroundColor = 'rgba(255,255,255,0.2)';
        };

        // Agregar elementos al contenido
        tempContent.appendChild(gifContainer);
        tempContent.appendChild(title);
        tempContent.appendChild(message);
        tempContent.appendChild(reloadButton);

        // Agregar contenido al modal
        tempModal.appendChild(tempContent);

        // Agregar modal al body
        document.body.appendChild(tempModal);

        // Mantener el scroll bloqueado
        document.body.style.overflow = 'hidden';

        // Crear animación para los puntos de carga
        let dotsCount = 0;
        const dotsInterval = setInterval(() => {
            if (loadingContainer.style.display !== 'none') {
                const dots = '.'.repeat(dotsCount + 1);
                loadingContainer.innerText = dots;
                dotsCount = (dotsCount + 1) % 3;
            } else {
                clearInterval(dotsInterval);
            }
        }, 500);

        return tempModal;
    };

    // Observador de mutaciones para detectar cualquier intento de eliminar el modal
    const setupObserver = () => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.removedNodes && mutation.removedNodes.length) {
                    for (let i = 0; i < mutation.removedNodes.length; i++) {
                        const node = mutation.removedNodes[i];
                        // Verificar si el nodo eliminado es el modal o contiene el modal
                        if (node.id === 'adblock-modal-container' ||
                            (node.querySelector && node.querySelector('#adblock-modal-container'))) {
                            // Recrear inmediatamente
                            createTempAdblockModal();

                            // Disparar un evento personalizado para notificar que el modal fue eliminado
                            const event = new CustomEvent('adblockModalRemoved');
                            window.dispatchEvent(event);
                        }
                    }
                }
            });
        });

        // Observar todo el DOM
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        return observer;
    };

    // Configurar el observador inmediatamente
    let domObserver = setupObserver();

    // Restaurar el observador si se desconecta
    setInterval(() => {
        if (!domObserver) {
            domObserver = setupObserver();
        }
    }, 500);

    // Prevenir intentos de eliminar el modal mediante scripts
    const originalRemoveChild = Element.prototype.removeChild;
    Element.prototype.removeChild = function (child) {
        if (child.id === 'adblock-modal-container' ||
            (child.querySelector && child.querySelector('#adblock-modal-container'))) {
            // Disparar evento de eliminación
            const event = new CustomEvent('adblockModalRemoved');
            window.dispatchEvent(event);

            // Crear un reemplazo temporal
            setTimeout(() => {
                createTempAdblockModal();
            }, 10);
        }
        return originalRemoveChild.call(this, child);
    };
}

export default AdblockDetector;