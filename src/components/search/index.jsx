import React from 'react'
import s from "./search.module.css"



function Search({value, change, submit}) {
    return (
        <>
            <form className={s.search__container} onSubmit={submit} >
                <input type="text" value={value} onChange={change} placeholder="e.g Minsk.." className={s.search__input} />
            </form>
        </>
    )
}

export default Search

