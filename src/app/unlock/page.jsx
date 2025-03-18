import React from 'react';

import AdblockDetector from '../Utils/AdblockDetector';

import Data from "../constants.json";

import Introduction from './Components/Introduction';
import GButton from './Components/GButton';




export const metadata = {
    title: 'Codigos de desbloqueo | Asoge Labs',
    description: "Genera un código de desbloqueo que te permite acceder a nuestros bots de Telegram de forma rápida, segura y gratuita.",
    keywords: ["rodolfocasan", "rodolfo casan", "asogelabs", "asoge labs", "asoge labs codigos de desbloqueo", "asogelabs unlock"],
    authors: [{ name: 'rodolfocasan', url: "https:://asogelabs.com" }, { name: 'rodolfocasan', url: 'https://asogelabs.github.io/' }],
    creator: 'asogelabs',
    publisher: 'asogelabs',
    icons: {
        icon: Data.favicon,
    },
};
export default function page() {
    return (
        <React.Fragment>
            {/* <AdblockDetector /> */}
            <Introduction />
            <GButton />
        </React.Fragment>
    )
}
