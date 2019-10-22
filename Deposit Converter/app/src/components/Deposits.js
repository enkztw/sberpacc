import React from 'react';
import Bank from './Bank';

import banks from '../data/banks';


export default function Deposits() {
    return (
        <section className="deposits">
            {banks.map((bank) => <Bank key={bank.name} info={bank} />)}
        </section>
    )
}
