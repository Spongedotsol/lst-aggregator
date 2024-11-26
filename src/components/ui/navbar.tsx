import Image from 'next/image';
import React, { useState } from 'react';
import icon from './icon.png';
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import useNetworkStore from '@/state/useNetworkStore';
import { ChevronDown } from 'lucide-react'; // Import the icon

// Navbar Component
const Navbar = () => {
    const { network, setNetwork } = useNetworkStore();
    const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

    const handleNetworkChange = (net: { name: string }) => {
        setNetwork(net.name);
        setIsOpen(false); // Close the dropdown
    }

    const networks = [
        { name: 'Solana Devnet' },
        { name: 'SOON Devnet' }, // Replace with actual Testnet URL
    ];


    
    return (
        <div className="flex items-center justify-between mb-8 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
                <Image src={icon} alt="Sponge Logo" className="w-16 h-16" width={50} height={50} />
                <span className="text-white text-xl font-bold">Sponge</span>
            </div>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between p-2 border rounded"
                >
                    {network} <ChevronDown />
                </button>
                {isOpen && (
                    <ul className="absolute z-10 mt-1 w-full bg-transparent border rounded shadow-lg">
                    {networks.map((net: { name: string }) => (
                        <li
                            key={net.name}
                            onClick={() => handleNetworkChange(net)}
                            className="p-2 hover:bg-gray-200 hover:text-black cursor-pointer"
                        >
                            {net.name}
                        </li>
                    ))}
                    </ul>
                )}
            </div>
            <UnifiedWalletButton />
        </div>
    )
};

export default Navbar;