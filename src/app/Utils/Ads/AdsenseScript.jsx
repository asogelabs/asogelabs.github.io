// src/app/Utils/Ads/AdsenseScript.jsx
"use client";
import React, { useEffect } from 'react';
import Script from 'next/script';



export default function AdsenseScript({ clientId = "pub-6072835343724077" }) {
    useEffect(() => {
        try {
            // Cargar el script de AdSense solo en el cliente y cuando el script ya esté cargado
            if (window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('Error al cargar AdSense:', err);
        }
    }, []);

    return (
        <Script
            id="adsbygoogle-script"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
        />
    );
}