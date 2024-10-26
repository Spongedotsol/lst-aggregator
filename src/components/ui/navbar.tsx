import Image from 'next/image';
import icon from './icon.png';
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

// Navbar Component
const Navbar = () => (
    <div className="flex items-center justify-between mb-8 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
            <Image src={icon} alt="Sponge Logo" className="w-16 h-16" width={50} height={50} />
            <span className="text-white text-xl font-bold">Sponge</span>
        </div>
        <UnifiedWalletButton />
    </div>
);

export default Navbar;