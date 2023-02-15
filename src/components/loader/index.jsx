import React from 'react'
import s from './loader.module.css'

function Loader() {
    return (
        <div className={s.loader}>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loader