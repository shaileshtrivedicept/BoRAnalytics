import React from 'react';
const Header = ({ stats }: { stats?: string }) => (
    <header className="bg-bor-tx p-3 px-6 flex items-center justify-between flex-wrap gap-2 text-white">
      <div className="flex items-center gap-4">
        <div className="bg-white p-1 rounded"><img src="https://uptown-files.s3.amazonaws.com/uploads/635/original/CEPT_Logo.png" alt="CEPT" className="h-9" /></div>
        <div className="w-[1px] h-8 bg-white/20"></div>
        <div><h1 className="text-sm font-semibold tracking-wide">Board of Reviews — Faculty of Architecture — Postgraduate Programmes</h1><p className="text-[11px] text-white/80">{stats || 'Analytics Dashboard'}</p></div>
      </div>
    </header>
);
export default Header;
