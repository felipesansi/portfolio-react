import React from 'react';
import Projectos from '@/components/projetos/projetos';
export default function Projetos() {
    const limit = 10;
    return (
        <Projectos limit={limit} />
    );
}